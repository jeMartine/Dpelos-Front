import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/entidades/Mascota';
import { EnfermedadService } from 'src/app/service/enfermedad/enfermedad.service';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { RazaService } from 'src/app/service/raza/raza.service';
@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css'],
})
export class CrearMascotaComponent {
  constructor(
    private router: Router, 
    private mascotaService: MascotaService,
    private razaService: RazaService,
    private enfermedadService: EnfermedadService
  ) {}

  mascota: Mascota = {
    idMascota: 0,
    nombreMascota: '',
    edadMascota: 0,
    urlFotoMascota: '',
    fechaCreacion: new Date(),
    estado: true,
    raza: '', // Initialize the new property
    enfermedad: '', // Initialize the new property
  };
  sendMascota!: Mascota;

  addMascota() {
    this.sendMascota = Object.assign({}, this.mascota);
    this.mascotaService.addMascota(this.sendMascota);
    this.router.navigate(['/mascota']);
  }

  regresar() {
    this.router.navigate(['/mascota']);
  }
}
