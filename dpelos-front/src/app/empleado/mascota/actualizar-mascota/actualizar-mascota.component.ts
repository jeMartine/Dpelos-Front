import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { Enfermedad } from 'src/app/entidades/Enfermedad';
import { Mascota } from 'src/app/entidades/Mascota';
import { Raza } from 'src/app/entidades/Raza';
import { EnfermedadService } from 'src/app/service/enfermedad/enfermedad.service';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { RazaService } from 'src/app/service/raza/raza.service';

@Component({
  selector: 'app-actualizar-mascota',
  templateUrl: './actualizar-mascota.component.html',
  styleUrls: ['./actualizar-mascota.component.css'],
})
export class ActualizarMascotaComponent {
  @Input()
  mascota!: Mascota;
  sendMascota!: Mascota;
  razas: Raza[] = [];
  enfermedades: Enfermedad[] = [];

  constructor(
    private mascotaService: MascotaService,
    private razaService: RazaService,
    private enfermedadService: EnfermedadService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      //this.mascota = this.mascotaService.findById(id);
      this.mascotaService.findById(id).subscribe(
        (data: Mascota) => {
          this.mascota = data; //cargar los datos de la mascota
      }, (error)=>{
        console.error('Error al cargar la mascota', error);
      })
    });

    this.razas = this.razaService.findAll();
    this.enfermedades = this.enfermedadService.findAll();
  }

  mascotaUpdate(): void {
    this.sendMascota = Object.assign({}, this.mascota);
    this.mascotaService.updateMascota(this.sendMascota);
    this.router.navigate(['/mascota']);
  }

  regresar() {
    this.router.navigate(['/mascota']);
  }
}
