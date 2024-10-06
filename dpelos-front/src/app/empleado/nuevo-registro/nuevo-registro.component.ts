import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-nuevo-registro',
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.css']
})
export class NuevoRegistroComponent {
  tipoSeleccionado: string = ''; 
  vistaActual: string = '';

  constructor(
    private location: Location
  ){}
  // Función para actualizar la vista basada en la selección
  actualizarVista() {
    this.vistaActual = this.tipoSeleccionado;
  }

  cancelar(){
    this.location.back()
  }
}
