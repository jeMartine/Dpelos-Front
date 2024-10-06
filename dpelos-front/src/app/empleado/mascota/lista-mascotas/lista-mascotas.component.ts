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
    private mascotaService: MascotaService
  ) {}


  ngOnInit(): void {
    this.mascotaService.findAll().subscribe(
      (data: Mascota[]) => {
        this.mascotas = data; //asignar la lista de mascotas
      }, (error) => {
        console.error('Error al cargar la lista de mascotas', error);
      }
    );
  }

  deleteMascota(mascota: Mascota): void {
    var index = this.mascotas.indexOf(mascota);
    this.mascotas.splice(index, 1);
    this.mascotaService.deleteById(mascota.idMascota!);
  }

  editarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
  }
  
  addMascota(newMascota: Mascota) {
    this.mascotas.push(newMascota);
    this.mascotaService.addMascota(newMascota);
  }
}
