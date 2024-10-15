import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mergeMap, of } from 'rxjs';
import { Droga } from 'src/app/entidades/Droga';
import { Tratamiento } from 'src/app/entidades/Tratamiento';
import { TratamientoService } from 'src/app/service/tratamiento/tratamiento.service';

@Component({
  selector: 'app-actualizar-tratamiento',
  templateUrl: './actualizar-tratamiento.component.html',
  styleUrls: ['./actualizar-tratamiento.component.css']
})
export class ActualizarTratamientoComponent {
  sendTratamiento!: Tratamiento;
  tratamiento: Tratamiento = {
    recomendacionesGenerales: '',
    fechaAdministracion: new Date(),
    descripcionTratamiento: '',
    estado: false
  };
  originalTratamiento!: Tratamiento;
  isFormDirty: boolean = false;
  mostrarTratamientoFlag: boolean = true;
  selectedMedicamentos: Droga[] = []; 
  isLoading: boolean = true;

  constructor(
    private tratamientoService: TratamientoService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.tratamientoService.findById(id).pipe(
        mergeMap((tratamientoInfo) => {
          this.tratamiento = tratamientoInfo;
          this.originalTratamiento = { ...this.tratamiento };
          this.isLoading = false;

          // Devolver un Observable vacío ya que no hay más operaciones
          return of(null); 
        })
      ).subscribe(
        () => {
          // Aquí podrías cargar más datos si es necesario.
        },
        (error) => {
          this.toast.error(error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.isLoading = false;
        }
      );
    });
  }
  removeMedicamento(medicamento: Droga): void {
    const index = this.selectedMedicamentos.indexOf(medicamento);
    if (index !== -1) {
      this.selectedMedicamentos.splice(index, 1);
    }
  }

  // Función para mostrar la vista de tratamiento a actualizar
  mostrarTratamiento(): void {
    this.mostrarTratamientoFlag = true;
  }

  //Función para msotrar la vista de resumen
  mostrarResumen(): void {
    this.mostrarTratamientoFlag = false; 
  }

  regresar(): void {
    this.router.navigate(['/tratamientos']); 
  }

  checkFormDirty(): void {
    this.isFormDirty = JSON.stringify(this.originalTratamiento) !== JSON.stringify(this.tratamiento);
  }

}
