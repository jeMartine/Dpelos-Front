import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mergeMap, of } from 'rxjs';
import { Droga } from 'src/app/entidades/Droga';
import { Mascota } from 'src/app/entidades/Mascota';
import { Tratamiento } from 'src/app/entidades/Tratamiento';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { TratamientoService } from 'src/app/service/tratamiento/tratamiento.service';

@Component({
  selector: 'app-crear-tratamiento',
  templateUrl: './crear-tratamiento.component.html',
  styleUrls: ['./crear-tratamiento.component.css'],
})
export class CrearTratamientoComponent implements OnInit {
  mascotas: Mascota[] = [];
  mostrarTratamientoFlag: boolean = true;
  selectedMedicamentos: Droga[] = [];
  tratamiento: Tratamiento = {
    fechaAdministracion: new Date(),
    descripcionTratamiento: '',
    estado: true
  };

  constructor(
    private route: ActivatedRoute, 
    private mascotaService: MascotaService,
    private tratamientoService: TratamientoService,
    private router: Router) {}

  ngOnInit(): void {
    const idMascota = this.route.snapshot.paramMap.get('idMascota');
      if (idMascota) {
        this.mascotaService.findById(+idMascota).subscribe((mascota) => {
          this.tratamiento.mascota = mascota;
        });
      }
  }

  navigateToAgregarMedicamento() {
    const tratamientoId = this.tratamiento.idTratamiento;
    console.log('Navegando a Medicamentos con ID:', tratamientoId);

    this.router.navigate([
      '/tratamiento/update',
      tratamientoId,
      'addMedicamento',
    ]);
  }

  regresar(): void {
    this.router.navigate(['/tratamientos']);
  }

  crearTratamiento(): void {
    this.mostrarTratamientoFlag = true;
  }

  //Función para mostrar el historial
    mostrarHistorial(): void {
    this.mostrarTratamientoFlag = false;
  }

  guardarTratamiento() {}
}
