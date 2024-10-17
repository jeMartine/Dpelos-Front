import { Especialidad } from './Especialidad';
import { Tratamiento } from './Tratamiento';

export interface Veterinario {
  idVeterinario?: number;
  nombreVeterinario: string;
  apellidoVeterinario: string;
  cedulaVeterinario: string;
  estadoVeterinario: boolean;
  passwordVeterinario: string;
  fotoUrl: string;
  numeroAtenciones: number;
  especialidad?: Especialidad;
  tratamientos?: Tratamiento[]; // Lista de tratamientos realizados por el veterinario
}
