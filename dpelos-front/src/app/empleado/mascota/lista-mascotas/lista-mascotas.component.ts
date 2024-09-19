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

  constructor(private mascotaService: MascotaService, private router: Router) {}

  ngOnInit(): void {
    this.mascotaService.mascotas$.subscribe((mascotas) => {
      this.mascotas = mascotas;
    });
  }

  deleteMascota(mascota: Mascota): void {
    this.mascotaService.deleteMascota(mascota);
  }
  // regresar(): void {
  //   this.router.navigate(['/home']);
  // }
}
