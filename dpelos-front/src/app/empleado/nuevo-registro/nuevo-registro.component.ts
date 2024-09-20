import { Component } from '@angular/core';

@Component({
  selector: 'app-nuevo-registro',
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.css']
})
export class NuevoRegistroComponent {
  tipoSeleccionado: string = ''; // Para vincular el valor seleccionado
  vistaActual: string = ''; // Para determinar qué vista mostrar

  // Función para actualizar la vista basada en la selección
  actualizarVista() {
    this.vistaActual = this.tipoSeleccionado;
  }
}
