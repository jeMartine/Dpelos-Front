import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, mergeMap } from 'rxjs';
import { Especialidad } from 'src/app/entidades/Especialidad';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { EspecialidadService } from 'src/app/service/especialidad/especialidad.service';
import { VeterinarioService } from 'src/app/service/veterinario/veterinario.service';
import { VetStateService } from 'src/app/service/vetState/vet-state.service';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-actualizar-vet',
  templateUrl: './actualizar-vet.component.html',
  styleUrls: ['./actualizar-vet.component.css'],
})
export class ActualizarVetComponent implements OnInit {
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

  /* Función ngOnInit que permite hacer peticiones recursivas
    1. Carga información de una especialidad
    2. usa forkJoin para hacer peticiones en paralelo
    3. con el mergeMap concatena las peticiones hechas en forkJoin
    4. Se cargan los datos y se ponen en el html
 */
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

  //FUnción para actualizar un veterinario
  veterinarioUpdate(): void {
    this.sendVeterinario = Object.assign({}, this.veterinario);
    this.toast.success('Veterinario actualizadoo con éxito', 'Ok', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
    this.veterinarioService.updateVeterinario(this.sendVeterinario);

    this.router.navigate(['/vet/list']);
  }

  //Función para regresar a la vista anterior
  regresar() {
    this.location.back();
    setTimeout(() => {
      this.locationStrategy.onPopState(() => {
        window.location.reload();
      });
    }, 0);
  }

  //Función para comprobar si hay cambios
  checkFormDirty() {
    this.isFormDirty =
      JSON.stringify(this.originalVeterinario) !==
      JSON.stringify(this.veterinario);
  }
}
