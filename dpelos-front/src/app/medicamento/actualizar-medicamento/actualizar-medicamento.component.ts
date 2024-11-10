import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, mergeMap } from 'rxjs';
import { Droga } from 'src/app/entidades/Droga';
import { MedicamentoService } from 'src/app/service/medicamento/medicamento.service';

@Component({
  selector: 'app-actualizar-medicamento',
  templateUrl: './actualizar-medicamento.component.html',
  styleUrls: ['./actualizar-medicamento.component.css']
})
export class ActualizarMedicamentoComponent {
  @Input()
  sendDroga!: Droga;
  originalDroga!: Droga;
  isFormDirty: boolean = false;

  droga: Droga = {
    nombreDroga: '',
    precioCompra: 0,
    precioVenta: 0,
    unitDisponibles: 0,
    unitVendidas: 0,
    urlFotoDroga: '',
  };

  constructor(
    private drogaService: MedicamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {}

 /* Función ngOnInit que permite hacer peticiones recursivas
    1. Carga información de la mascota
    2. usa forkJoin para hacer peticiones en paralelo
    3. con el mergeMap concatena las peticiones hechas en forkJoin
    4. Se cargan los datos y se ponen en el html
 */
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        const id = Number(params.get('id'));
    
        if (!isNaN(id)) {
          this.drogaService.findById(id).subscribe(
            (drogaInfo) => {
              this.droga = drogaInfo;
              this.originalDroga = { ...this.droga };
    
              // Asignamos los valores a las variables individuales
              /*this.nombreDroga = this.droga.nombreDroga;
              this.precioCompra = this.droga.precioCompra;
              this.precioVenta = this.droga.precioVenta;*/
            },
            (error) => {
              this.toast.error(error.message, 'Error', {
                timeOut: 3000,
                positionClass: 'toast-top-center',
              });
            }
          );
        } else {
          this.toast.error('ID de droga inválido', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      });
    }
     

    drogaUpdate(): void {
      this.sendDroga = Object.assign({}, this.droga);
      this.drogaService.updateDroga(this.sendDroga).subscribe({
        next: (response) => {
          console.log('Droga actualizada', response);
        },
        error: (error) => {
          console.error('Error al actualizar la droga', error);
        },
        complete: () => {
          this.router.navigate(['/medicamentos']);
        }
      });
    }
    
    
  regresar() {
    this.router.navigate(['/medicamentos']);
  }

  checkFormDirty() {
    this.isFormDirty = JSON.stringify(this.originalDroga) !== JSON.stringify(this.droga);
  }

}
