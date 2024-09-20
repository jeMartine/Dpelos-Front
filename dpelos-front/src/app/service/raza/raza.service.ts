import { Injectable } from '@angular/core';
import { Raza } from 'src/app/entidades/Raza';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  constructor() { }

  razasList: Raza[] = [
    { idRazaMascota: 1, razaMascota: "Husky" },
    { idRazaMascota: 2, razaMascota: "Labrador" },
    { idRazaMascota: 3, razaMascota: "Pastor Alemán" },
    { idRazaMascota: 4, razaMascota: "Golden Retriever" },
    { idRazaMascota: 5, razaMascota: "Bulldog" },
    { idRazaMascota: 6, razaMascota: "Beagle" },
    { idRazaMascota: 7, razaMascota: "Rottweiler" },
    { idRazaMascota: 8, razaMascota: "Yorkshire Terrier" },
    { idRazaMascota: 9, razaMascota: "Boxer" },
    { idRazaMascota: 10, razaMascota: "Dálmata" },
    { idRazaMascota: 11, razaMascota: "Chihuahua" },
    { idRazaMascota: 12, razaMascota: "Poodle" },
    { idRazaMascota: 13, razaMascota: "Shih Tzu" },
    { idRazaMascota: 14, razaMascota: "Schnauzer" },
    { idRazaMascota: 15, razaMascota: "Cocker Spaniel" },
    { idRazaMascota: 16, razaMascota: "Pomerania" },
    { idRazaMascota: 17, razaMascota: "Mastín" },
    { idRazaMascota: 18, razaMascota: "Basset Hound" },
    { idRazaMascota: 19, razaMascota: "Border Collie" },
    { idRazaMascota: 20, razaMascota: "Akita" },
    { idRazaMascota: 21, razaMascota: "Samoedo" }
  ];
  
  findAll(): Raza[] {
    return this.razasList;
  }

  findById(id: number): Raza {
    const enfermedad: Raza  = this.razasList.find((ennf) => ennf.idRazaMascota === id)!;
    return enfermedad;
  }

  updateRaza(enfermedad: Raza) {
    const index = this.razasList.findIndex(e => e.idRazaMascota === enfermedad.idRazaMascota);
    this.razasList[index] = enfermedad;
  }

  addRaza(enfermedad: Raza) {
    enfermedad.idRazaMascota = this.razasList.length +1;
    this.razasList.push(enfermedad);
  }
}
