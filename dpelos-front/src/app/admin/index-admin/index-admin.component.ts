import { Component } from '@angular/core';
import { Administrador } from 'src/app/entidades/Administrador';
import { Droga } from 'src/app/entidades/Droga';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { MedicamentoService } from 'src/app/service/medicamento/medicamento.service';
import { VeterinarioService } from 'src/app/service/veterinario/veterinario.service';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent {
    administrador?: Administrador
    totalMascotas: number = 0
    totalVets: number = 0
    totalDrogas: number = 0
  
    constructor(
      private mascotaService: MascotaService,
      private veterinarioService: VeterinarioService,
      private drogasService: MedicamentoService
    ) {}
  
    ngOnInit(): void {
      this.obtenerTotalMascotas();
      this.obtenerTotalVeterinarios();
      this.obtenerTotalDrogas();

    }
  
    obtenerTotalMascotas(): void {
      this.mascotaService.obtenerTotalMascotas().subscribe(
        (total: number) => {
          this.totalMascotas = total;
        },
        (error) => {
          console.error('Error al obtener el total de mascotas:', error);
        }
      );
    }

    obtenerTotalVeterinarios(): void {
      this.veterinarioService.obtenerTotalVeterinarios().subscribe(
        (total: number) => {
          console.log(total)
          this.totalVets = total;
        },
        (error) => {
          console.error('Error al obtener el total de veterinarios:', error);
        }
      );
    }

    obtenerTotalDrogas(): void {
      this.drogasService.obtenerTotalDrogas().subscribe(
        (total: number) => {
          this.totalDrogas = total;
        },
        (error) => {
          console.error('Error al obtener el total de medicamentos:', error);
        }
      );
    }
}
