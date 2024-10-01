import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-veterinario',
  templateUrl: './header-veterinario.component.html',
  styleUrls: ['./header-veterinario.component.css']
})
export class HeaderVeterinarioComponent {

  constructor(
    private router: Router,
  ) {}

  cerrarSesion(): void {
    this.router.navigate(['/home']);
  }

  homeEmpreado(): void {
    this.router.navigate(['/empleado']);
  }

}
