import { Component, EventEmitter, Output } from '@angular/core';
import { Dueno } from 'src/app/entidades/Dueno';
import { Router } from '@angular/router';
import { DuenoService } from 'src/app/service/dueno/dueno.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-crud-dueno',
  templateUrl: './crear-dueno.component.html',
  styleUrls: ['./crear-dueno.component.css']
})
export class CrudDuenoComponent {


  constructor(
    private router: Router,
    private duenoService: DuenoService,
    private location: Location
  ){}
  //modelo
  dueno: Dueno = {
    idDueno:0,
    cedulaDueno: '',
    nombreDueno: '',
    apellidoDueno: '',
    correoDueno: '',
    celularDueno: '',
    fotoUrl: ''
  }
  sendDueno!: Dueno;

  //agregar dueno a partir del formulario
  addDueno(){
    this.sendDueno = Object.assign({}, this.dueno);
    this.duenoService.addDueno(this.sendDueno);
    this.location.back();
  }

  regresar(){
    this.location.back();
  }
}
