import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { Administrador } from 'src/app/entidades/Administrador';
import { TratamientoDrogaAux } from 'src/app/entidades/TratamientoDrogaAux';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { MedicamentoService } from 'src/app/service/medicamento/medicamento.service';
import { TratamientoService } from 'src/app/service/tratamiento/tratamiento.service';
import { VeterinarioService } from 'src/app/service/veterinario/veterinario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  administrador?: Administrador;
  totalMascotas: number = 0;
  totalVets: number = 0;
  totalDrogas: number = 0;
  totalTratamientos: number = 0;
  totalMascotasActivas: number = 0;
  totalVentas: number = 0.0;
  totalGancias: number = 0.0;
  totalVetActivos: number = 0;
  totalVetInactivos: number = 0;
  tratamientosMasVendidos?: string[];
  tratamientosTipoDroga?: TratamientoDrogaAux[];
  constructor(
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private drogasService: MedicamentoService,
    private tratamientoService: TratamientoService
  ) {}

  ngOnInit(): void {
    // Ejecutar todas las solicitudes y esperar a que todas se completen
    forkJoin({
      totalMascotas: this.mascotaService.obtenerTotalMascotas(),
      totalVeterinarios: this.veterinarioService.obtenerTotalVeterinarios(),
      totalDrogas: this.drogasService.obtenerTotalDrogas(),
      totalTratamientos: this.tratamientoService.findAll(),
      totalMascotasActivas: this.mascotaService.obtenerTotalMascotasActivas(),
      totalVentas: this.drogasService.obtenerTotalVentas(),
      totalGanancias: this.drogasService.obtenerTotalGanancias(),
      totalVetActivos: this.veterinarioService.obtenerActivos(),
      totalVetInactivos: this.veterinarioService.obtenerInactivos(),
      tratamientosMasVendidos: this.tratamientoService.tratamientosMasUnidadesVendidas(),
      tratamientosTipoDroga: this.tratamientoService.tratamientosPorTipoDrogas()
    }).subscribe({
      next: (data) => {
        // Asignar los datos recibidos a las propiedades del componente
        this.totalMascotas = data.totalMascotas;
        this.totalVets = data.totalVeterinarios;
        this.totalDrogas = data.totalDrogas;
        this.totalTratamientos = data.totalTratamientos.length;
        this.totalMascotasActivas = data.totalMascotasActivas;
        this.totalVentas = data.totalVentas;
        this.totalGancias = data.totalGanancias;
        this.totalVetActivos = data.totalVetActivos;
        this.totalVetInactivos = data.totalVetInactivos;
        this.tratamientosMasVendidos = data.tratamientosMasVendidos;
        this.tratamientosTipoDroga = data.tratamientosTipoDroga;
        
        // Llamar a la función para mostrar el gráfico después de que todos los datos estén disponibles
        this.verificarYMostrarGrafico();
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
      }
    });
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

  obtenerTotalVetActivos(): void {
    this.veterinarioService.obtenerActivos().subscribe(
      (total: number) => {
        this.totalVetActivos = total;
      },
      (error) => {
        console.error(
          'Error al obtener el total de veterinarios activos:',
          error
        );
      }
    );
  }

  obtenerTotalVetInactivos(): void {
    this.veterinarioService.obtenerInactivos().subscribe(
      (total: number) => {
        this.totalVetInactivos = total;
      },
      (error) => {
        console.error(
          'Error al obtener el total de veterinarios inactivos:',
          error
        );
      }
    );
  }

  obtenerTratamientosMasVendidos(): void {
    this.tratamientoService.tratamientosMasUnidadesVendidas().subscribe(
      (tratamientos) => {
        console.log(tratamientos);
        this.tratamientosMasVendidos = tratamientos;
      },
      (error) => {
        console.error('Error al obtener los tratamientos más vendidos:', error);
      }
    );
  }

  obtenerTratamientosTipoDroga(): void {
    this.tratamientoService.tratamientosPorTipoDrogas().subscribe(
      (tratamientos) => {
        console.log(tratamientos);
        this.tratamientosTipoDroga = tratamientos;
      },
      (error) => {
        console.error(
          'Error al obtener los tratamientos por tipo de droga:',
          error
        );
      }
    );
  }

  verificarYMostrarGrafico() {
    if (this.totalVetActivos > 0 || this.totalVetInactivos > 0) {
      this.loadChart(); 
    }
  }
  loadChart() {
    const canvasElement = document.getElementById('veterinariosChart') as HTMLCanvasElement;
  
    if (canvasElement) {
      new Chart(canvasElement, {
        type: 'pie',
        data: {
          labels: ['Veterinarios Activos', 'Veterinarios Inactivos'],
          datasets: [{
            label: 'Distribución de Veterinarios',
            data: [this.totalVetActivos, this.totalVetInactivos],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    } else {
      console.error('El elemento canvas no está disponible');
    }
  }
}  


