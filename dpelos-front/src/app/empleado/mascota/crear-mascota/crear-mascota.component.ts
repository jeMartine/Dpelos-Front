import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { Enfermedad } from 'src/app/entidades/Enfermedad';
import { Mascota } from 'src/app/entidades/Mascota';
import { Raza } from 'src/app/entidades/Raza';
import { DuenoService } from 'src/app/service/dueno/dueno.service';
import { EnfermedadService } from 'src/app/service/enfermedad/enfermedad.service';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { RazaService } from 'src/app/service/raza/raza.service';
import { Location } from '@angular/common';
import { Dueno } from 'src/app/entidades/Dueno';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css'],
})
export class CrearMascotaComponent {

  cedulaDueno: string = '';
  nombreDueno: string = '';
  dueno?: Dueno;
  razas: Raza[] = [];
  enfermedades: Enfermedad[] = [];
  sendMascota!: Mascota;


  constructor(
    private router: Router, 
    private mascotaService: MascotaService,
    private razaService: RazaService,
    private enfermedadService: EnfermedadService, 
    private duenoService: DuenoService,
    private location: Location,
    private toast: ToastrService
  ) {}


  ngOnInit() {
   this.razas = this.razaService.findAll();
   this.enfermedades = this.enfermedadService.findAll();
    
  }
  
  mascota: Mascota = {
    idMascota: 0,
    nombreMascota: '',
    edadMascota: 0,
    urlFotoMascota: '',
    fechaCreacion: undefined,
    estado: true,
    raza: undefined,
    enfermedad: undefined, 
    tratamientos: []
  };

  addMascota() {
    
    this.sendMascota = Object.assign({}, this.mascota);
    if(this.dueno){
      this.sendMascota.dueno = this.dueno

      this.toast.success("Mascota Guardada con éxito", 'Ok', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });

      this.mascotaService.addMascota(this.sendMascota);
    }else{
      console.error("No existe el dueño")
    }

    this.location.back();
  }

  regresar() {
    this.location.back();
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

}
