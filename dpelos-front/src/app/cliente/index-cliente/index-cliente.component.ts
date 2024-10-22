import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Dueno } from 'src/app/entidades/Dueno';
import { Mascota } from 'src/app/entidades/Mascota';
import { Tratamiento } from 'src/app/entidades/Tratamiento';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { TratamientoService } from 'src/app/service/tratamiento/tratamiento.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit, AfterViewInit {
  mascotas: Mascota[] = [];
  dueno?: Dueno
  tratamientos: Tratamiento[] = [];
  selectedMascota?: Mascota;
  selectedTratamiento?: Tratamiento;
  responsiveOptions: any[];
  carouselClass: string = '';
  descripcionTratamiento: string = '';


  constructor(
    private toast: ToastrService,
    private mascotaService: MascotaService,
    private tratamientoService: TratamientoService 
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.cargarDueno();
    if (this.dueno) {
      this.mascotaService.findMascotasDuenoId(this.dueno.idDueno!).subscribe(
        (mascotas) => {
          this.mascotas = mascotas;
          console.log("Subir carrusel")
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


  ngAfterViewInit() {
    this.actualizarCentradoCarousel();
  }


  cargarDueno(){
    const user = localStorage.getItem('userDueno');
    if(user){
      this.dueno = JSON.parse(user);
    }
  }


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

  mostrarInfoMascota(mascota: Mascota) {
    if (this.selectedMascota === mascota) {
      this.selectedMascota = undefined;
    } else {
      this.selectedMascota = mascota;
      if (this.mascotas.length > 0) {
        this.selectedMascota = this.mascotas[0];
        this.obtenerTratamientosMascota(this.selectedMascota.idMascota!);
      }
    }
  }

  obtenerTratamientosMascota(idMascota: number) {
    this.tratamientoService.findTratamientosByMascotaId(idMascota).subscribe(
      (tratamientos) => {
        this.tratamientos = tratamientos;
        this.tratamientos.sort((a, b) => {
          return new Date(b.fechaAdministracion).getTime() - new Date(a.fechaAdministracion).getTime();
        });
        if (this.tratamientos.length > 0) {
          this.mostrarDescripcion(this.tratamientos[0]);
        }
      },
      (error) => {
        this.toast.error('Error al obtener tratamientos', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  isMascotaSeleccionada(mascota: Mascota) {
    return this.selectedMascota === mascota;
  }

  buscarMascota(nombre: string) {
    const mascotaEncontrada = this.mascotas.find(mascota => mascota.nombreMascota.toLowerCase() === nombre.toLowerCase());

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

  mostrarDescripcion(tratamiento: Tratamiento) {
    this.selectedTratamiento = tratamiento;
    this.descripcionTratamiento = tratamiento.recomendacionesGenerales!;
  }

}
