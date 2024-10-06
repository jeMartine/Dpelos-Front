import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dueno } from 'src/app/entidades/Dueno';
import { DuenoService } from 'src/app/service/dueno/dueno.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-actualizar-dueno',
  templateUrl: './actualizar-dueno.component.html',
  styleUrls: ['./actualizar-dueno.component.css']
})
export class ActualizarDuenoComponent {
  @Input()
  dueno!: Dueno;
  sendDueno!: Dueno;

  //inyectar dependencias
  constructor(
    private duenoService  : DuenoService,
    private route: ActivatedRoute,
    private router : Router,
    private location: Location
  ){}

  //Se llama una unica vez cuando se renderiza la pantalla
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      console.log(id)
      this.duenoService.findById(id).subscribe(
        (duenoRest)=>{
          this.dueno = duenoRest;
        }
      )
    })
  }

  duenoUpdate():void{
    this.sendDueno = Object.assign({}, this.dueno)
    this.duenoService.updateDueno(this.sendDueno);
    this.location.back();
  }

  regresar(){
  this.location.back()
  }
}
