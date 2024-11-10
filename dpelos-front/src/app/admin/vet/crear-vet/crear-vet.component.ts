import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, mergeMap } from 'rxjs';
import { Especialidad } from 'src/app/entidades/Especialidad';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { EspecialidadService } from 'src/app/service/especialidad/especialidad.service';
import { VeterinarioService } from 'src/app/service/veterinario/veterinario.service';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-crear-vet',
  templateUrl: './crear-vet.component.html',
  styleUrls: ['./crear-vet.component.css'],
})
export class CrearVetComponent {
  @Input()
  sendVeterinario!: Veterinario;
  especialidad: Especialidad[] = [];

  originalVeterinario!: Veterinario;
  isFormDirty: boolean = false;

  veterinario: Veterinario = {
    nombreVeterinario: '',
    apellidoVeterinario: '',
    cedulaVeterinario: '',
    passwordVeterinario: '',
    fotoUrl: '',
    numeroAtenciones: 0,
    estadoVeterinario: true, // Add this line
  };

  locationStrategy: any;

  constructor(
    private veterinarioService: VeterinarioService,
    private especialidadService: EspecialidadService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.especialidadService.findAll().subscribe(
      (especialidadRest) => {
        this.especialidad = especialidadRest;
      },
      (error) => {
        this.toast.error(error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  veterinarioCreate() {
    this.sendVeterinario = Object.assign({}, this.veterinario);
  
    if (this.especialidad) {
      // Mensaje de éxito antes de enviar la solicitud
      this.toast.success('Veterinario guardado con éxito', 'Ok', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
  
      // Contraseña fija para todos los veterinarios
      this.sendVeterinario.passwordVeterinario = 'dpelos123';
  
      // Llamada al servicio con subscribe
      this.veterinarioService.addVeterinario(this.sendVeterinario).subscribe({
        next: (response) => {
          console.log('Veterinario agregado exitosamente:', response);
        },
        error: (error) => {
          console.error('Error al guardar el veterinario:', error);
          this.toast.error('Error al guardar el veterinario', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
        complete: () => {
          // Navegar hacia atrás cuando la operación ha sido completada exitosamente
          this.location.back();
        },
      });
    } else {
      console.error('No existe especialidad');
      this.toast.warning('Debe seleccionar una especialidad', 'Atención', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }
  }
  

  regresar() {
    this.location.back();
    setTimeout(() => {
      this.locationStrategy.onPopState(() => {
        window.location.reload();
      });
    }, 0);
  }

  checkFormDirty() {
    this.isFormDirty =
      JSON.stringify(this.originalVeterinario) !==
      JSON.stringify(this.veterinario);
  }
}
