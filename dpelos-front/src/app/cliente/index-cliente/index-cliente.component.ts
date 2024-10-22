import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Droga } from 'src/app/entidades/Droga';
import { Dueno } from 'src/app/entidades/Dueno';
import { Mascota } from 'src/app/entidades/Mascota';
import { Tratamiento } from 'src/app/entidades/Tratamiento';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { TratamientoService } from 'src/app/service/tratamiento/tratamiento.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css'],
})
export class IndexClienteComponent implements OnInit, AfterViewInit {
  // Declaración de variables
  mascotas: Mascota[] = [];
  dueno?: Dueno;
  tratamientos: Tratamiento[] = [];
  selectedMascota?: Mascota;
  selectedTratamiento?: Tratamiento;
  responsiveOptions: any[];
  carouselClass: string = '';
  descripcionTratamiento: string = '';
  selectedMedicamentos: Droga[] = [];

  constructor(
    private toast: ToastrService,
    private mascotaService: MascotaService,
    private tratamientoService: TratamientoService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  //Inicialización del componente en el que se cargan los datos de la mascota
  ngOnInit() {
    this.cargarDueno();
    if (this.dueno) {
      this.mascotaService.findMascotasDuenoId(this.dueno.idDueno!).subscribe(
        (mascotas) => {
          this.mascotas = mascotas;
          this.actualizarCentradoCarousel();
          console.log('Subir carrusel');
        },
        (error) => {
          this.toast.error(error.error, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    }
  }

  //Funcion para centrar el carrusel cuando se carga el componente
  ngAfterViewInit() {
    this.actualizarCentradoCarousel();
  }

  //Funcion para cargar el dueno
  cargarDueno() {
    const user = localStorage.getItem('userDueno');
    if (user) {
      this.dueno = JSON.parse(user);
    }
  }

  //Funcion para centrar el carrusel
  actualizarCentradoCarousel() {
    const numItems = this.mascotas.length;

    if (numItems === 1) {
      this.carouselClass = 'center-single';
    } else if (numItems === 2) {
      this.carouselClass = 'center-double';
    } else {
      this.carouselClass = '';
    }
  }

  //Funcion para mostrar la informacion de la mascota
  mostrarInfoMascota(mascota: Mascota) {
    if (this.selectedMascota === mascota) {
      this.selectedMascota = undefined;
      this.tratamientos = [];
      this.selectedTratamiento = undefined;
      this.descripcionTratamiento = '';
    } else {
      this.selectedMascota = mascota;
      this.tratamientos = []; 
      this.selectedTratamiento = undefined; 
      this.descripcionTratamiento = ''; 
      this.obtenerTratamientosMascota(mascota.idMascota!);
    }
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
  
  //Funcion para saber si la mascota esta seleccionada
  isMascotaSeleccionada(mascota: Mascota) {
    return this.selectedMascota === mascota;
  }

  //Funcion para buscar una mascota
  buscarMascota(nombre: string) {
    const mascotaEncontrada = this.mascotas.find(
      (mascota) => mascota.nombreMascota.toLowerCase() === nombre.toLowerCase()
    );

    if (mascotaEncontrada) {
      this.selectedMascota = mascotaEncontrada;
    } else {
      this.selectedMascota = undefined;
      this.toast.error('Mascota no encontrada', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }
  }

  //Funcion para mostrar la informacion del tratamiento
  mostrarDescripcion(tratamiento: Tratamiento) {
    this.selectedTratamiento = tratamiento;

    console.log('Tratamiento seleccionado:', this.selectedTratamiento);

    this.tratamientoService
      .getMedicamentosPorTratamiento(this.selectedTratamiento.idTratamiento!)
      .subscribe(
        (medicamentos: Droga[]) => {
          this.selectedMedicamentos = medicamentos;
          console.log('Medicamentos obtenidos:', this.selectedMedicamentos);
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
