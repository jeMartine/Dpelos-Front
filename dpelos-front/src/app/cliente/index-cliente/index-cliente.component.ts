import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Dueno } from 'src/app/entidades/Dueno';
import { Mascota } from 'src/app/entidades/Mascota';
import { MascotaService } from 'src/app/service/mascota/mascota.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {
  mascotas: Mascota[] = [];
  dueno?: Dueno
  selectedMascota?: Mascota;
  responsiveOptions: any[];
  carouselClass: string = '';

  constructor(
    private toast: ToastrService,
    private mascotaService: MascotaService
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
          this.actualizarCentradoCarousel();
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
    }
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

}
