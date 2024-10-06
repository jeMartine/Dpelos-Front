import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-cliente',
  templateUrl: './header-cliente.component.html',
  styleUrls: ['./header-cliente.component.css']
})
export class HeaderClienteComponent {
  constructor(
    private router: Router,
  ) {}

  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }

}
