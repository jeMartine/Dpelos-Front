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
  styleUrls: ['./crear-vet.component.css']
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
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.veterinarioService
        .findById(id)
        .pipe(
          mergeMap((veterinarioInfo) => {
            this.veterinario = veterinarioInfo;
            this.originalVeterinario = { ...this.veterinario };
            return forkJoin({
              especialidad: this.especialidadService.findAll(),
            });
          })
        )
        .subscribe(
          ({ especialidad }) => {
            //cargar datos de la especialidad y asignar seleccionada
            this.especialidad = especialidad;
            this.veterinario.especialidad = this.especialidad.find(
              (especialidad) =>
                especialidad.idEspecialidad ===
                this.veterinario.especialidad?.idEspecialidad
            );
          },
          (error) => {
            this.toast.error(error.message, 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            });
          }
        );
    });
  }

  veterinarioCreate(){

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
      JSON.stringify(this.originalVeterinario) !== JSON.stringify(this.veterinario);
  }
}
