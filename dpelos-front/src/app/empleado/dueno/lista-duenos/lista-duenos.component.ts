import { Component } from '@angular/core';
import { Dueno } from 'src/app/entidades/Dueno';
import { DuenoService } from 'src/app/service/dueno/dueno.service';

@Component({
  selector: 'app-lista-duenos',
  templateUrl: './lista-duenos.component.html',
  styleUrls: ['./lista-duenos.component.css']
})
export class ListaDuenosComponent {

  duenosList!: Dueno[]; 
  isLoading = true;
  filteredDuenosList!: Dueno[];
  selectedDueno!: Dueno;
  searchTerm: string = '';
  
  //Inyectar dependencias
  constructor(
    private duenoService: DuenoService
  ){}

  //Realizo llamados cuando ya se ha cargado la interfaz
  ngOnInit() :void{
    this.loadAllDuenos();
  }

  loadAllDuenos() {
    this.duenoService.findAll().subscribe(
      (data: Dueno[])=>{
        this.duenosList = data;// asignar la lista de duenos
        this.filteredDuenosList = data;
        this.isLoading = false;
      }, (error)=>{
        console.error('Error al cargar la lista de dueños', error); // Manejo de errores
      }
    );
  }

  editarDueno(dueno: Dueno){
    this.selectedDueno = dueno;
  }

  addDueno(newDueno: Dueno): void {
    this.duenoService.addDueno(newDueno);
    this.duenosList.push(newDueno);
  } 

  eliminarDueno(dueno: Dueno): void {
    var index = this.duenosList.indexOf(dueno);
    this.duenosList.splice(index, 1);
    this.duenoService.deleteById(dueno.idDueno!);
  }

  searchDueno() {
    if (this.searchTerm.trim().length === 0) {
      this.loadAllDuenos();
    } else {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredDuenosList = this.duenosList.filter(dueno =>
        dueno.nombreDueno.toLowerCase().includes(lowerCaseSearchTerm) ||
        dueno.apellidoDueno.toLowerCase().includes(lowerCaseSearchTerm) ||
        dueno.cedulaDueno.includes(lowerCaseSearchTerm)
      );
    }
    this.searchTerm = '';
  }
  
}
