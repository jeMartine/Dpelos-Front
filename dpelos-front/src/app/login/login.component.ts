import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cedulaDueno: string = '';
  cedulaVeterinario: string = '';
  contrasenaVeterinario: string = '';
  mensajeError: string = '';

  isRegisterActive: boolean = false;

  constructor(
    private router: Router,
  ) {}

  onLoginVeterinarioClick(): void {
    this.isRegisterActive = true;
    this.changeBackgroundColor('#94F3D4'); // Color del empleado
  }

  onLoginDuenoClick(): void {
    this.isRegisterActive = false;
    this.changeBackgroundColor('#9496F3'); // Color del cliente
  }

  changeBackgroundColor(color: string): void {
    document.body.style.backgroundColor = color;
    document.body.style.transition = 'all 0.6s ease-in-out';
  }

  validateVet(): void {
    this.router.navigate(['/empleado']);
  }

  regresar(): void {
    this.router.navigate(['/home']);
  }

}
