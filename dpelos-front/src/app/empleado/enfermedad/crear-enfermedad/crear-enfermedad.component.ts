import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Enfermedad } from 'src/app/entidades/Enfermedad';
import { Raza } from 'src/app/entidades/Raza';
import { EnfermedadService } from 'src/app/service/enfermedad/enfermedad.service';
import { RazaService } from 'src/app/service/raza/raza.service';

@Component({
  selector: 'app-crear-enfermedad',
  templateUrl: './crear-enfermedad.component.html',
  styleUrls: ['./crear-enfermedad.component.css']
})
export class CrearEnfermedadComponent {
  constructor(
    private router: Router,
    private enfermedadService: EnfermedadService
  ){}
  //modelo
  enfermedad: Enfermedad = {
    idEnfermedad: 0,
    nombreEnfermedad: ''
  }
  sendEnfermedad!: Enfermedad;

  //agregar enfermedad a partir del formulario
  addEnfermedad(){
    this.sendEnfermedad = Object.assign({}, this.enfermedad);
    this.enfermedadService.addEnfermedad(this.sendEnfermedad);
    this.router.navigate(['/mascota']);
  }

  regresar(){
    this.router.navigate(['/mascota']);
  }
}
