import { Component } from '@angular/core';
import { error } from 'jquery';
import { Dueno } from 'src/app/entidades/Dueno';
import { DuenoService } from 'src/app/service/dueno/dueno.service';

@Component({
  selector: 'app-lista-duenos',
  templateUrl: './lista-duenos.component.html',
  styleUrls: ['./lista-duenos.component.css']
})
export class ListaDuenosComponent {

  duenosList!: Dueno[]; 

  selectedDueno!: Dueno;
  
  //Inyectar dependencias
  constructor(
    private duenoService: DuenoService
  ){}

  //Realizo llamados cuando ya se ha cargado la interfaz
  ngOnInit() :void{
    this.duenoService.findAll().subscribe(
      (data: Dueno[])=>{
        this.duenosList = data;// asignar la lista de duenos
      }, (error)=>{
        console.error('Error al cargar la lista de dueños', error); // Manejo de errores
      }
    );
  }

  editarDueno(dueno: Dueno){
    this.selectedDueno = dueno;
  }

  addDueno(newDueno: Dueno): void {
    this.duenosList.push(newDueno);
  }

  eliminarDueno(id: number): void {
    this.duenoService.deleteById(id);
  }
}
