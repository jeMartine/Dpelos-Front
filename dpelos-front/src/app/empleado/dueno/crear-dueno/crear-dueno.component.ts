import { Component, EventEmitter, Output } from '@angular/core';
import { Dueno } from 'src/app/entidades/Dueno';
import { Router } from '@angular/router';
import { DuenoService } from 'src/app/service/dueno/dueno.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crud-dueno',
  templateUrl: './crear-dueno.component.html',
  styleUrls: ['./crear-dueno.component.css']
})
export class CrudDuenoComponent {
  isCedulaValid = true;

  constructor(
    private toast: ToastrService,
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

    this.toast.success("Dueño Guardado con éxito", 'Ok', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });

    this.location.back();
  }

  checkCedula(){
    this.duenoService.findByCedula(this.dueno.cedulaDueno).subscribe(
      (restDueno) => {
        if (restDueno) {  // Si se recibe un objeto
          this.toast.warning("Esta cédula ya existe", '¡Cuidado!', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.isCedulaValid = false;  
        } else {
          this.isCedulaValid = true;  
        }
      },
      (error) => {
        this.isCedulaValid = true;  
      }
    )
  }
  regresar(){
    this.location.back();
  }
}
