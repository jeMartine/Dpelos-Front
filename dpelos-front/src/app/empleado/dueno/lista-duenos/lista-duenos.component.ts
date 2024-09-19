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

  selectedDueno!: Dueno;
  
  //Inyectar dependencias
  constructor(
    private duenoService: DuenoService
  ){}

  //Realizo llamados cuando ya se ha cargado la interfaz
  ngOnInit() :void{
    this.duenosList = this.duenoService.findAll();
  }

  editarDueno(dueno: Dueno){
    this.selectedDueno = dueno;
  }

  addDueno(newDueno: Dueno): void {
    this.duenosList.push(newDueno);
  }

  eliminarDueno(dueno: Dueno): void {
    this.duenoService.deleteDueno(dueno);
  }
}
