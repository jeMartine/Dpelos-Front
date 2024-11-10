import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicamentoService } from 'src/app/service/medicamento/medicamento.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detaller-med',
  templateUrl: './detaller-med.component.html',
  styleUrls: ['./detaller-med.component.css']
})
export class DetallerMedComponent {
  medicamento: any;
  mostrarInformacion:boolean = false;
  disponible: boolean = false; 

  constructor(
    private route: ActivatedRoute, 
    private medicamentoService: MedicamentoService,
    private location: Location
  ) {}

  //Método que carga la información del medicamento
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.medicamentoService.findById(id).subscribe((data) => {
          this.medicamento = data;
          if(this.medicamento.unitDisponibles >= 1){
            this.disponible = true;
          }
        }, error => {
          console.error('Error al obtener el medicamento:', error);
        });
      }
    });
  }

  toggleInformacion() {
    this.mostrarInformacion = !this.mostrarInformacion;
  }

  //Método para volver a la pantalla anterior
  regresar() {
    this.location.back();
  }
}
