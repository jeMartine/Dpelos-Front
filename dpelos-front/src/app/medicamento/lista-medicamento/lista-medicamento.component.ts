import { Component } from '@angular/core';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Droga } from 'src/app/entidades/Droga';
import { MedicamentoService } from 'src/app/service/medicamento/medicamento.service';

@Component({
  selector: 'app-lista-medicamento',
  templateUrl: './lista-medicamento.component.html',
  styleUrls: ['./lista-medicamento.component.css']
})
export class ListaMedicamentoComponent {
  drogas!: Droga[] 
  selectedDroga!: Droga
  searchTerm: string = '';
  isLoading = true

  constructor(
    private drogaService: MedicamentoService,
    private toast: ToastrService
  ){}

  ngOnInit() {
    this.loadAllDrogas();
  }

  loadAllDrogas() {
    this.isLoading = true;
    this.drogaService.findAll().subscribe(
      (restDrogas) => {
        this.drogas = restDrogas;
        this.isLoading = false;
      },
      (error) => {
        this.toast.error(error.error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.isLoading = false;
      }
    );
  }

  addMascota(newDroga: Droga) {
    this.drogas.push(newDroga);
    this.drogaService.addDroga(newDroga);
  }

  updateDroga(droga: Droga){
    this.selectedDroga = droga;
  }

  deleteDroga(droga: Droga){
    var index = this.drogas.indexOf(droga);
    this.drogas.splice(index, 1);
    this.drogaService.deleteById(droga.idDroga!);
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
  }
  
  searchDroga() {
    console.log('Método searchDroga llamado con término:', this.searchTerm);
    this.isLoading = true;
    if (this.searchTerm.trim().length === 0) {
      this.loadAllDrogas();
    } else {
      this.drogaService.searchByNombre(this.searchTerm).subscribe(
        (restDrogas) => {
          console.log('Drogas encontradas:', restDrogas);
          this.drogas = restDrogas;
          this.isLoading = false;
        },
        (error) => {
          this.toast.error(error.error, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.isLoading = false;
        }
      );
    }
    this.searchTerm = '';
  }
  
}
