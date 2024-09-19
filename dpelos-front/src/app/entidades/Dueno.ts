import { Mascota } from './Mascota';

export interface Dueno {
    idDueno?: number;
    cedulaDueno: string;
    nombreDueno: string;
    apellidoDueno: string;
    correoDueno: string;
    celularDueno: string;
    fotoUrl: string;
    mascotas?: Mascota[];  // Lista de mascotas asociadas al dueño
  }
  