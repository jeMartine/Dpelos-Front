import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dueno } from 'src/app/entidades/Dueno';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  //revisar sesion iniciada
  token?: String
  vet?: Veterinario
  dueno?: Dueno

  constructor(
    private loginService: LoginService,
    private router: Router

  ){}

  ngOnInit() {
    const token = localStorage.getItem('token');
    
    if (token) {
      this.loginService.validateToken(token).subscribe(
        (response) => {
          const role = response.role
          if (role === 'VETERINARIO') {
            this.router.navigate(['/empleado']);
          } else if (role === 'ADMINISTRADOR') {
            this.router.navigate(['/admin']);
          } else if (role === 'DUENO') {
            this.router.navigate(['/cliente']);
          }
        },
        (error) => {
          console.error('Token inválido o error en la validación:', error);
          this.router.navigate(['']);
        }
      );
    } else {
      this.router.navigate(['']);
    }
  }

}

