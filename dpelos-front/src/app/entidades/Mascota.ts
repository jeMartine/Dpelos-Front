import { Dueno } from './Dueno';
import { Enfermedad } from './Enfermedad';
import { Raza } from './Raza';
import { Tratamiento } from './Tratamiento';

export interface Mascota {
  //idMascota?: number; // `idMascota` es opcional, ya que puede no estar definido al crear una nueva mascota
  idMascota: number; //temporal por cuestiones de tiempo
  nombreMascota: string;
  edadMascota: number;
  urlFotoMascota: string;
  fechaCreacion: Date;
  estado: boolean;
  dueno?: Dueno; // `dueno` es opcional
  //raza?: Raza;          // `raza` es opcional
  raza: string; //temporal por cuestiones de tiempo
  enfermedad: string; //temporal por cuestiones de tiempo
  //enfermedad?: Enfermedad;  // `enfermedad` es opcional
  tratamientos?: Tratamiento[]; // Lista de tratamientos, opcional y puede estar vacía
}
