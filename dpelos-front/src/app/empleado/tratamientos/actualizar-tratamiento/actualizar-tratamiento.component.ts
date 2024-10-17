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
  styleUrls: ['./actualizar-tratamiento.component.css'],
})
export class ActualizarTratamientoComponent {
  sendTratamiento!: Tratamiento;
  tratamiento: Tratamiento = {
    recomendacionesGenerales: '',
    fechaAdministracion: new Date(),
    descripcionTratamiento: '',
    estado: false,
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
  
      this.tratamientoService
        .findById(id)
        .pipe(
          mergeMap((tratamientoInfo) => {
            this.tratamiento = tratamientoInfo;
            this.originalTratamiento = { ...this.tratamiento };
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
  
  finalizarTratamiento(): void {
    this.tratamiento.estado = false;
    
    this.tratamientoService.updateTratamiento(this.tratamiento).subscribe();
    this.toast.success('Tratamiento finalizado correctamente.', 'Éxito');
    this.router.navigate(['/tratamientos']); // Redirigir a la lista de tratamientos
  
  }

  calcularTotal(): number {
    return this.selectedMedicamentos.reduce((total, medicamento) => {
      return total + (medicamento.precioVenta || 0); // Suma el precio de cada medicamento, manejando el caso de precios nulos
    }, 0);
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
    this.isFormDirty =
      JSON.stringify(this.originalTratamiento) !==
      JSON.stringify(this.tratamiento);
  }

  navigateToAgregarMedicamento() {
    const tratamientoId = this.tratamiento.idTratamiento;
    console.log('Navegando a Medicamentos con ID:', tratamientoId);

    this.router.navigate([
      '/tratamiento/update',
      tratamientoId,
      'addMedicamento',
    ]);
  }
}
