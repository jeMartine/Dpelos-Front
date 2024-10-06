import { Injectable } from '@angular/core';
import { Veterinario } from 'src/app/entidades/Veterinario';

@Injectable({
  providedIn: 'root'
})
export class VetStateService {
  private veterinario?: Veterinario;

  setVeterinario(veterinario: Veterinario): void {
    this.veterinario = veterinario;
  }

  getVeterinario(): Veterinario | undefined {
    return this.veterinario;
  }
}
