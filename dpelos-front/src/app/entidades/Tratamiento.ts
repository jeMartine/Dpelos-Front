import { Droga } from './Droga';
import { Mascota } from './Mascota';
import { Veterinario } from './Veterinario';

export interface Tratamiento {
  idTratamiento?: number;
  fechaAdministracion: Date;
  descripcionTratamiento: string;
  recomendacionesGenerales?: string;
  drogas?: Droga[];
  mascota?: Mascota;
  veterinario?: Veterinario;
  estado: boolean;
}
