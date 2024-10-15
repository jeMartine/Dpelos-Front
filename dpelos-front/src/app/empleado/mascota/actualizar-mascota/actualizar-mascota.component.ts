import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, mergeMap } from 'rxjs';
import { Dueno } from 'src/app/entidades/Dueno';
import { Enfermedad } from 'src/app/entidades/Enfermedad';
import { Mascota } from 'src/app/entidades/Mascota';
import { Raza } from 'src/app/entidades/Raza';
import { DuenoService } from 'src/app/service/dueno/dueno.service';
import { EnfermedadService } from 'src/app/service/enfermedad/enfermedad.service';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { RazaService } from 'src/app/service/raza/raza.service';

@Component({
  selector: 'app-actualizar-mascota',
  templateUrl: './actualizar-mascota.component.html',
  styleUrls: ['./actualizar-mascota.component.css'],
})
export class ActualizarMascotaComponent {
  @Input()
  sendMascota!: Mascota;
  nombreDueno: string = ''
  cedulaDueno: string = ''
  dueno? : Dueno
  razas: Raza[] = [];
  enfermedades: Enfermedad[] = [];
  originalMascota!: Mascota;
  isFormDirty: boolean = false;

  mascota: Mascota = {
    nombreMascota: '',
    edadMascota: 0,
    urlFotoMascota: '',
    raza: undefined,
    enfermedad: undefined,
    estado: true,
    dueno: undefined,
    tratamientos: [],
  };

  constructor(
    private mascotaService: MascotaService,
    private razaService: RazaService,
    private duenoService: DuenoService,
    private enfermedadService: EnfermedadService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {}

 /* Función ngOnInit que permite hacer peticiones recursivas
    1. Carga información de la mascota
    2. usa forkJoin para hacer peticiones en paralelo
    3. con el mergeMap concatena las peticiones hechas en forkJoin
    4. Se cargan los datos y se ponen en el html
 */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
  
      this.mascotaService.findById(id).pipe(
        mergeMap(
          (mascotaInfo) =>{
            this.mascota = mascotaInfo;
            this.originalMascota = { ...this.mascota };
            return forkJoin({
              duenoMascota: this.duenoService.findById(this.mascota.dueno?.idDueno!),
              razas: this.razaService.findAll(),
              enfermedades: this.enfermedadService.findAll()
            });
          })
      ).subscribe(
        ({duenoMascota, razas, enfermedades}) =>{
          
          //Cargar datos del dueño 
          this.dueno = duenoMascota;
          this.cedulaDueno = duenoMascota.cedulaDueno;
          this.nombreDueno = `${duenoMascota.nombreDueno} ${duenoMascota.apellidoDueno}`;

          //cargar datos de la raza y asignar seleccionada
          this.razas = razas;
          this.mascota.raza = this.razas.find(
            (raza) => raza.idRazaMascota === this.mascota.raza?.idRazaMascota
          );

          // Cargar las enfermedades y asignar seleccionada
          this.enfermedades = enfermedades;
          this.mascota.enfermedad = this.enfermedades.find(
            (enfermedad) => enfermedad.idEnfermedad === this.mascota.enfermedad?.idEnfermedad
          );
        },
        (error) => {
          this.toast.error(error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      )
    });
  }
  

  mascotaUpdate(): void {
    this.sendMascota = Object.assign({}, this.mascota);

    if(this.dueno){
      this.sendMascota.dueno = this.dueno

      this.toast.success("Mascota actualizada con éxito", 'Ok', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });

      this.mascotaService.updateMascota(this.sendMascota);
    }
    this.router.navigate(['/mascota']);
  }

  verificarDueno(){
    // if (!this.cedulaDueno || this.cedulaDueno.trim() === '') {
    //   return; // No ejecutar la función si el campo está vacío
    // }

    this.duenoService.findByCedula(this.cedulaDueno).subscribe(
      (dueno) => {
        if(dueno){
          //Si existe el dueño mostramos su nombre
          this.dueno = dueno;
          this.nombreDueno = dueno.nombreDueno + ' ' + dueno.apellidoDueno;
        }else{
          //Si no existe ocutamos el nombre
          this.dueno = undefined;
          this.nombreDueno = '';
        }
      },
      (error) => {
        console.error("Error al mostrar el dueño"+ error)
        this.dueno=undefined;
        this.nombreDueno = '';
      }
    );
  }
  regresar() {
    this.router.navigate(['/mascota']);
  }

  checkFormDirty() {
    this.isFormDirty = JSON.stringify(this.originalMascota) !== JSON.stringify(this.mascota);
  }
}
