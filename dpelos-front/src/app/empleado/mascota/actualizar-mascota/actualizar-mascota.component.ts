import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/entidades/Mascota';
import { MascotaService } from 'src/app/service/mascota/mascota.service';

@Component({
  selector: 'app-actualizar-mascota',
  templateUrl: './actualizar-mascota.component.html',
  styleUrls: ['./actualizar-mascota.component.css'],
})
export class ActualizarMascotaComponent {
  @Input()
  mascota!: Mascota;
  sendMascota!: Mascota;

  constructor(
    private mascotaService: MascotaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.mascota = this.mascotaService.findById(id);
    });
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
