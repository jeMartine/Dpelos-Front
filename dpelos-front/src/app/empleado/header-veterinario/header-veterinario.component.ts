import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/service/login/login.service';


@Component({
  selector: 'app-header-veterinario',
  templateUrl: './header-veterinario.component.html',
  styleUrls: ['./header-veterinario.component.css']
})
export class HeaderVeterinarioComponent {

  logoutIcon = faRightFromBracket
  veterinario?: Veterinario;
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
      this.veterinario = JSON.parse(user);
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
