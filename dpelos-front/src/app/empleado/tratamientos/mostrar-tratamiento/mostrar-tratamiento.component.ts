import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs';
import { Droga } from 'src/app/entidades/Droga';
import { Tratamiento } from 'src/app/entidades/Tratamiento';
import { TratamientoService } from 'src/app/service/tratamiento/tratamiento.service';

@Component({
  selector: 'app-mostrar-tratamiento',
  templateUrl: './mostrar-tratamiento.component.html',
  styleUrls: ['./mostrar-tratamiento.component.css']
})
export class MostrarTratamientoComponent {
  tratamiento: Tratamiento = {
    recomendacionesGenerales: '',
    fechaAdministracion: new Date(),
    descripcionTratamiento: '',
    estado: false,
  };
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
  
      this.tratamientoService
        .findById(id)
        .pipe(
          mergeMap((tratamientoInfo) => {
            this.tratamiento = tratamientoInfo;
            this.isLoading = false;
  
            // Cargar los medicamentos asociados al tratamiento
            return this.tratamientoService.getMedicamentosPorTratamiento(id);
          })
        )
        .subscribe(
          (medicamentos: Droga[]) => {
            this.selectedMedicamentos = medicamentos;
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

  regresar(): void {
    this.router.navigate(['/tratamientos']);
  }

}
