import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Raza } from 'src/app/entidades/Raza';
import { RazaService } from 'src/app/service/raza/raza.service';

@Component({
  selector: 'app-crear-raza',
  templateUrl: './crear-raza.component.html',
  styleUrls: ['./crear-raza.component.css']
})
export class CrearRazaComponent {
  constructor(
    private router: Router,
    private razaService: RazaService
  ){}
  //modelo
  raza: Raza = {
    idRazaMascota: 0,
    razaMascota: ''
  }
  sendRaza!: Raza;

  //agregar raza a partir del formulario
  addRaza(){
    this.sendRaza = Object.assign({}, this.raza);
    this.razaService.addRaza(this.sendRaza);
    this.router.navigate(['/mascota']);
  }

  regresar(){
    this.router.navigate(['/mascota']);
  }
}
