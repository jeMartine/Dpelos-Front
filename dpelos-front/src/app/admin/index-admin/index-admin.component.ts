import { Component } from '@angular/core';
import { Administrador } from 'src/app/entidades/Administrador';
import { Droga } from 'src/app/entidades/Droga';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { MedicamentoService } from 'src/app/service/medicamento/medicamento.service';
import { VeterinarioService } from 'src/app/service/veterinario/veterinario.service';
import { TratamientoService } from 'src/app/service/tratamiento/tratamiento.service';
@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css'],
})
export class IndexAdminComponent {
  administrador?: Administrador;
  totalMascotas: number = 0;
  totalVets: number = 0;
  totalDrogas: number = 0;
  totalTratamientos: number = 0;
  totalMascotasActivas: number = 0;
  totalVentas: number = 0.0;
  totalGancias: number = 0.0;
  constructor(
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private drogasService: MedicamentoService,
    private tratamientoService: TratamientoService
  ) {}

  ngOnInit(): void {
    this.obtenerTotalMascotas();
    this.obtenerTotalVeterinarios();
    this.obtenerTotalDrogas();
    this.obtenerTotalTratamientos();
    this.obtenerTotalMascotasActivas();
    this.obtenerTotalVentas();
    this.obtenerTotalGanancias();
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
        console.log(total);
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
  //Metodo para obtener el total de tratamientos administrados en el ultimo mes.
  obtenerTotalTratamientos(): void {
    this.tratamientoService.findAll().subscribe(
      (tratamientos) => {
        console.log(tratamientos);
        this.totalTratamientos = tratamientos.length;
      },
      (error) => {
        console.error('Error al obtener el total de tratamientos:', error);
      }
    );
  }

  obtenerTotalMascotasActivas(): void {
    this.mascotaService.obtenerTotalMascotasActivas().subscribe(
      (total: number) => {
        console.log(total);
        this.totalMascotasActivas = total;
      },
      (error) => {
        console.error('Error al obtener el total de mascotas activas:', error);
      }
    );
  }

  obtenerTotalVentas(): void {
    this.drogasService.obtenerTotalVentas().subscribe(
      (total: number) => {
        this.totalVentas = total;
      },
      (error) => {
        console.error('Error al obtener el total de ventas:', error);
      }
    );
  }

  obtenerTotalGanancias(): void {
    this.drogasService.obtenerTotalGanancias().subscribe(
      (total: number) => {
        this.totalGancias = total;
      },
      (error) => {
        console.error('Error al obtener el total de ganancias:', error);
      }
    );
  }
}
