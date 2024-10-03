import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Enfermedad } from 'src/app/entidades/Enfermedad';
import { Mascota } from 'src/app/entidades/Mascota';
import { Raza } from 'src/app/entidades/Raza';
import { DuenoService } from 'src/app/service/dueno/dueno.service';
import { EnfermedadService } from 'src/app/service/enfermedad/enfermedad.service';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { RazaService } from 'src/app/service/raza/raza.service';
@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css'],
})
export class CrearMascotaComponent {

  cedulaDueno: string = '';
  nombreDueno: string = '';
  razas: Raza[] = [];
  enfermedades: Enfermedad[] = [];
  sendMascota!: Mascota;


  constructor(
    private router: Router, 
    private mascotaService: MascotaService,
    private razaService: RazaService,
    private enfermedadService: EnfermedadService, 
    private duenoService: DuenoService
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
    fechaCreacion: new Date(),
    estado: true,
    raza: undefined,
    enfermedad: undefined, 
    tratamientos: []
  };

  addMascota() {
    
    this.sendMascota = Object.assign({}, this.mascota);

    this.mascotaService.addMascota(this.sendMascota);
    console.log(this.sendMascota);

    this.router.navigate(['/mascota']);
  }

  regresar() {
    this.router.navigate(['/empleado']);
  }

  verificarDueno(){
    console.log("Estoy revisando el dueño"+this.cedulaDueno+"ess") 
    const dueno = this.duenoService.findByCedula(this.cedulaDueno)
    
    if(dueno){
      console.log("Existe")
      //this.nombreDueno = dueno.nombreDueno
    }else{
      console.log("no existe")
      this.nombreDueno = ''
    }
  }

}
