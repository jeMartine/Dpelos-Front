import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-cliente',
  templateUrl: './header-cliente.component.html',
  styleUrls: ['./header-cliente.component.css']
})
export class HeaderClienteComponent {
  logoutIcon = faDoorOpen

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  cerrarSesion(): void {
    this.loginService.logout()
    this.router.navigate(['/home']);
  }

}
