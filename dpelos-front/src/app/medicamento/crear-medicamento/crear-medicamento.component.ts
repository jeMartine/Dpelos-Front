import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { Location, LocationStrategy } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Droga } from 'src/app/entidades/Droga';
import { MedicamentoService } from 'src/app/service/medicamento/medicamento.service';

@Component({
  selector: 'app-crear-medicamento',
  templateUrl: './crear-medicamento.component.html',
  styleUrls: ['./crear-medicamento.component.css']
})
export class CrearMedicamentoComponent {
  droga: Droga = {
    nombreDroga: '',
    precioVenta : 0,
    precioCompra: 0,
    unitVendidas: 0,
    unitDisponibles: 0,
    urlFotoDroga: '',
  }; 
  sendDroga!: Droga;

  constructor(
    private router: Router, 
    private drogaService: MedicamentoService,
    private location: Location,
    private toast: ToastrService,
    private locationStrategy: LocationStrategy
  ) {}
     

  addDroga(): void {
    this.sendDroga = Object.assign({}, this.droga);
    this.drogaService.addDroga(this.sendDroga).subscribe({
      next: (response) => {
        console.log('Droga agregada', response);
      },
      error: (error) => {
        console.error('Error al agregar la droga', error);
      },
      complete: () => {
        this.location.back();
      }
    });
  }  

  regresar() {
    this.location.back();
    setTimeout(() => {
      this.locationStrategy.onPopState(() => {
        window.location.reload();
      });
    }, 0);
  }

}
