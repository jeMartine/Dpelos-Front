import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/entidades/LoginRequest';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginURL = environment.apiResrURL + '/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {}

  //Recibe un objeto y lo almancena en el localstorage para manejar la sesión
  public login(peticion: LoginRequest): void {
    this.http.post<any>(this.loginURL, peticion).subscribe(
      (restBackend) => {
        const user = restBackend.user;
        const role = restBackend.role;

        if (role === 'VETERINARIO') {
          localStorage.setItem('isVetLogged', 'true');        
          localStorage.setItem('userVet', JSON.stringify(user));
          this.router.navigate(['/empleado']);
        } else if (role === 'ADMINISTRADOR'){
          localStorage.setItem('isAdminLogged', 'true');        
          localStorage.setItem('userAdmin', JSON.stringify(user));
          this.router.navigate(['/admin']);
        } else if (role === 'DUENO'){
          localStorage.setItem('isDuenoLogged', 'true');
          localStorage.setItem('userDueno', JSON.stringify(user));        
          this.router.navigate(['/cliente']);
        }
      },
      (error) => {
        this.toast.error(error.error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  public logout(usuario: string, type: string): void {
    localStorage.removeItem(usuario);
    localStorage.removeItem(type);
    this.router.navigate(['/login']);
  }

  isLoggedIn(type: string): boolean {
    return localStorage.getItem(type) === 'true';
  }
}
