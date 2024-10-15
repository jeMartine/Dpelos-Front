import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Administrador } from 'src/app/entidades/Administrador';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  logoutIcon = faRightFromBracket
  administrador?: Administrador;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(){
    this.cargarVet();
  }

  cargarVet(){
    const user = localStorage.getItem('userVet');
    if(user){
      this.administrador = JSON.parse(user);
    }
  }
  cerrarSesion(): void {
    this.loginService.logout('userVet', "isVetLogged")
    this.router.navigate(['/home']);
  }

  homeEmpreado(): void {
    this.router.navigate(['/empleado']);
  }

}
