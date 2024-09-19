import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mascota } from 'src/app/entidades/Mascota';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  constructor() {}
  sqlDate = new Date();
  mascotas: Mascota[] = [
    {
      idMascota: 1,
      nombreMascota: 'Firulais',
      edadMascota: 2,
      urlFotoMascota:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vK9XGVpsZJyLqihEWrl8FZlRTEIvPpn90KC5OnJRh2qiNiEzy0JBlls0ZV3_rkQOmdo&usqp=CAU',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 2,
      nombreMascota: 'Toby',
      edadMascota: 3,
      urlFotoMascota:
        'https://images.saymedia-content.com/.image/t_share/MjAxMjg4MjkxNjI5MTQ3Njc1/labrador-retriever-guide.jpg',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 3,
      nombreMascota: 'Rex',
      edadMascota: 4,
      urlFotoMascota:
        'https://i.pinimg.com/1200x/07/84/ab/0784ab30e8c3c18e909620e531572b53.jpg',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 4,
      nombreMascota: 'Max',
      edadMascota: 5,
      urlFotoMascota:
        'https://dogtime.com/wp-content/uploads/sites/12/2024/03/GettyImages-1285465107-e1710251441662.jpg?w=1024',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 5,
      nombreMascota: 'Bella',
      edadMascota: 2,
      urlFotoMascota:
        'https://www.borrowmydoggy.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F4ij0poqn%2Fproduction%2F817123f48402f97455c0e9d3761f79613a151685-650x400.jpg&w=1200&q=100',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 6,
      nombreMascota: 'Charlie',
      edadMascota: 3,
      urlFotoMascota:
        'https://www.metrovetchicago.com/cdn-cgi/image/q=75,f=auto,metadata=none/sites/default/files/styles/large/public/beagle-dog-breed-info.jpg?itok=xLkF7OZ_',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 7,
      nombreMascota: 'Lucy',
      edadMascota: 4,
      urlFotoMascota:
        'https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1685787498.877709/fun-facts-about-siberian-huskies-1.png',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 8,
      nombreMascota: 'Cooper',
      edadMascota: 1,
      urlFotoMascota:
        'https://cdn.britannica.com/07/234207-050-0037B589/English-bulldog-dog.jpg',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 9,
      nombreMascota: 'Luna',
      edadMascota: 2,
      urlFotoMascota:
        'https://www.dogster.com/wp-content/uploads/2024/01/1onbcf7aody.jpg',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 10,
      nombreMascota: 'Rocky',
      edadMascota: 3,
      urlFotoMascota:
        'https://media-be.chewy.com/wp-content/uploads/2021/04/16140537/Boxer_Feature-Image.jpg',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 11,
      nombreMascota: 'Daisy',
      edadMascota: 4,
      urlFotoMascota:
        'https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MjAxMTY5NTU4ODY4ODYyNDg2/dalmatian-guide.jpg',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 12,
      nombreMascota: 'Bailey',
      edadMascota: 5,
      urlFotoMascota:
        'https://cdn.prod.website-files.com/6586ad1766809383c71cd41e/658904fc8a695c5c1300ed48_18-National-Welsh-Corgi-Day.jpeg',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
    {
      idMascota: 13,
      nombreMascota: 'Milo',
      edadMascota: 2,
      urlFotoMascota:
        'https://media-be.chewy.com/wp-content/uploads/2021/05/13111454/GettyImages-521009590-923x615.jpg',
      fechaCreacion: this.sqlDate,
      estado: true,
      raza: 'Labrador', // Add this property
      enfermedad: 'None', // Add this property
    },
  ];
  private mascotasSubject: BehaviorSubject<Mascota[]> = new BehaviorSubject(
    this.mascotas
  );
  mascotas$: Observable<Mascota[]> = this.mascotasSubject.asObservable();

  findAll(): Mascota[] {
    return this.mascotas;
  }

  findById(id: number): Mascota {
    const mascota = this.mascotas.find((m) => m.idMascota === id);
    if (!mascota) {
      throw new Error(`Mascota with id ${id} not found`);
    }
    return mascota;
  }

  addMascota(mascota: Mascota): void {
    this.mascotas.push(mascota);
    this.mascotasSubject.next(this.mascotas);
  }

  updateMascota(mascota: Mascota): void {
    const index = this.mascotas.findIndex(
      (m) => m.nombreMascota === mascota.nombreMascota
    );
    this.mascotas[index] = mascota;
  }

  deleteMascota(mascota: Mascota): void {
    const index = this.mascotas.findIndex(
      (m) => m.nombreMascota === mascota.nombreMascota
    );
    this.mascotas.splice(index, 1);
  }
}
