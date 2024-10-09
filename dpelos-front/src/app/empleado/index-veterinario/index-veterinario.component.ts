import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { VetStateService } from 'src/app/service/vetState/vet-state.service';

@Component({
  selector: 'app-index-veterinario',
  templateUrl: './index-veterinario.component.html',
  styleUrls: ['./index-veterinario.component.css']
})
export class IndexVeterinarioComponent {
  veterinario?: Veterinario

  constructor(
    private vetState: VetStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.body.style.backgroundColor = "#FFFFFF";

    this.cargarVet()
  }

  cargarVet(){
    const user = localStorage.getItem('userVet');
    if(user){
      this.veterinario = JSON.parse(user);
    }
  }

}
