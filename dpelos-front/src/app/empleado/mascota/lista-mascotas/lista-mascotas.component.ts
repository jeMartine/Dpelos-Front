import { Component } from '@angular/core';
import { Mascota } from 'src/app/entidades/Mascota';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css'],
})
export class ListaMascotasComponent {
  mascotas!: Mascota[]; // Define the mascotas property
  selectedMascota!: Mascota;
  constructor(
    private mascotaService: MascotaService, 
    private router: Router) {}

  ngOnInit(): void {
    this.mascotas = this.mascotaService.findAll();
  }

  deleteMascota(mascota: Mascota): void {
    this.mascotaService.deleteMascota(mascota);
  }

  editarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
  }
  addMascota(newMascota: Mascota) {
    this.mascotas.push(newMascota);
  }
  }
