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
  mostrarTratamientoFlag: boolean = true;
  selectedMedicamentos: Droga[] = [];
  tratamiento: Tratamiento = {
    fechaAdministracion: new Date(),
    descripcionTratamiento: '',
    estado: true
  };
  tratamientos: Tratamiento[] = [];
  selectedTratamiento?: Tratamiento;
  descripcionTratamiento: string = '';
  selectedMedicamentosExistentes: Droga[] = [];


  constructor(
    private route: ActivatedRoute, 
    private mascotaService: MascotaService,
    private tratamientoService: TratamientoService,    
    private toast: ToastrService,
    private router: Router) {}

    //Carga la información de la mascota
  ngOnInit(): void {
    //Cargar el veterinario que crea el tratamiento
    this.cargarVeterinario()
    //cargar medicamentos
    this.cargarMedicamentos()
    const idMascota = this.route.snapshot.paramMap.get('idMascota');
      if (idMascota) {
        this.mascotaService.findById(+idMascota).subscribe((findMascota) => {
          this.tratamiento.mascota = findMascota;
        });
      }

      this.obtenerTratamientosMascota(+idMascota!);
  }

  cargarVeterinario(){
    var vet = localStorage.getItem('userVet')
    if(vet){
      this.tratamiento.veterinario = JSON.parse(vet)
    }
  }

  cargarMedicamentos(){
    //Cargar los medicamentos seleccionados
    var meds = localStorage.getItem('medicamentosSeleccionados')
    var trat = localStorage.getItem('tratamiento')
    if(meds && trat){
      this.selectedMedicamentos = JSON.parse(meds)
      this.tratamiento = JSON.parse(trat)
      this.tratamiento.drogas = this.selectedMedicamentos
      localStorage.removeItem('medicamentosSeleccionados')
      localStorage.removeItem('tratamiento')
      this.toast.success('Medicamentos agregados exitosamente.', 'Éxito', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }
  }

  navigateToAgregarMedicamento() {
    localStorage.setItem('tratamiento', JSON.stringify(this.tratamiento))
    localStorage.setItem('id_mascota', JSON.stringify(this.tratamiento.mascota?.idMascota))
    this.router.navigate(['/tratamiento/update/addMedicamento']);
  }

  regresar(): void {
    this.router.navigate(['/mascota']);
  }

  crearTratamiento(): void {
    this.mostrarTratamientoFlag = true;
  }

  //Función para mostrar el historial
    mostrarHistorial(): void {
    this.mostrarTratamientoFlag = false;
  }

  guardarTratamiento() {
    // Enviar el tratamiento al backend
    this.tratamientoService.addTratamientoToMascota(this.tratamiento.mascota?.idMascota!, this.tratamiento)
      .subscribe(
        (response: string) => {
          // Si la creación fue exitosa
          this.toast.success(response, 'Éxito');
          this.router.navigate(['/tratamientos']);
        },
        (error) => {
          // Si hubo un error
          this.toast.error('Error al crear el tratamiento', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
  }

  //Funcion para mostrar la informacion del tratamiento
  obtenerTratamientosMascota(idMascota: number) {
    this.tratamientoService.findTratamientosByMascotaId(idMascota).subscribe(
      (tratamientos) => {
        this.tratamientos = tratamientos || [];
        this.selectedTratamiento = undefined; 
  
        //Validar si hay tratamientos y ordenarlos por fecha de inicio ascendente
        if (this.tratamientos.length > 0) {
          this.tratamientos.sort((a, b) => {
            return (
              new Date(b.fechaAdministracion).getTime() -
              new Date(a.fechaAdministracion).getTime()
            );
          });
          this.mostrarDescripcion(this.tratamientos[0]);
        } else {
          this.selectedTratamiento = undefined;
          this.descripcionTratamiento = 'Esta mascota actualmente no tiene tratamientos.';
        }
      },
      (error) => {
        this.tratamientos = [];
        this.selectedTratamiento = undefined;
        this.descripcionTratamiento = '';
        this.toast.error('Error al obtener tratamientos', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  //Funcion para mostrar la informacion del tratamiento
  mostrarDescripcion(tratamiento: Tratamiento) {
    this.selectedTratamiento = tratamiento;

    console.log('Tratamiento seleccionado:', this.selectedTratamiento);

    this.tratamientoService
      .getMedicamentosPorTratamiento(this.selectedTratamiento.idTratamiento!)
      .subscribe(
        (medicamentos: Droga[]) => {
          this.selectedMedicamentosExistentes = medicamentos;
          console.log('Medicamentos obtenidos:', this.selectedMedicamentosExistentes);
        },
        (error) => {
          this.toast.error('Error al obtener medicamentos', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
  }
  
}
