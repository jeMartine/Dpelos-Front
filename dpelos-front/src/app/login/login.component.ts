import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoginRequest } from 'src/app/entidades/LoginRequest';
import { LoginService } from '../service/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { VetStateService } from '../service/vetState/vet-state.service';

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
    private loginService: LoginService,
    private toast: ToastrService,
    private vetState: VetStateService
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
    const container = document.getElementById('container');
    if (container) {
      container.style.backgroundColor = color;
      container.style.transition = 'all 0.6s ease-in-out';
    }
  }

  validateVet(): void {
    const request: LoginRequest = {
      document: this.cedulaVeterinario, 
      password: this.contrasenaVeterinario,
      type: 1
    }

    this.loginService.login(request)
  }

  validateClient(): void {
    const request: LoginRequest = {
      document: this.cedulaDueno,
      type: 2
    }
    this.loginService.login(request)
  }

  regresar(): void {
    //this.router.navigate(['/home']);
  }

}
