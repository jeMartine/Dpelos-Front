import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {
  mascotas: any[] = [];
  selectedMascota: any = null;
  responsiveOptions: any[];
  carouselClass: string = '';

  constructor() {
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
    //Datos de muestra, llamado a la API
    this.mascotas = [
      {
        nombreMascota: 'Bobby',
        urlFotoMascota: 'assets/images/prueba.png',
        razaMascota: 'Golden Retriever',
        fechaCreacion: new Date(),
        estado: true,
        enfermedadMascota: 'Parvovirus'
      },
      {
        nombreMascota: 'Bobby2',
        urlFotoMascota: 'assets/images/prueba.png',
        razaMascota: 'Golden Retriever',
        fechaCreacion: new Date(),
        estado: true,
        enfermedadMascota: 'Parvovirus'
      },
      {
        nombreMascota: 'Bobby3',
        urlFotoMascota: 'assets/images/prueba.png',
        razaMascota: 'Golden Retriever',
        fechaCreacion: new Date(),
        estado: true,
        enfermedadMascota: 'Parvovirus'
      },
      {
        nombreMascota: 'Bobby4',
        urlFotoMascota: 'assets/images/prueba.png',
        razaMascota: 'Golden Retriever',
        fechaCreacion: new Date(),
        estado: true,
        enfermedadMascota: 'Parvovirus'
      },
      
    ];

    this.actualizarCentradoCarousel();
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

  mostrarInfoMascota(mascota: any) {
    if (this.selectedMascota === mascota) {
      this.selectedMascota = null;
    } else {
      this.selectedMascota = mascota;
    }
  }
  isMascotaSeleccionada(mascota: any) {
    return this.selectedMascota === mascota;
  }

}
