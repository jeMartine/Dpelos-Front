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

  public login(peticion: LoginRequest): void {
    this.http.post<any>(this.loginURL, peticion).subscribe(
      (restBackend) => {
        console.log(restBackend)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('usuario', JSON.stringify(restBackend));
        if (peticion.type == 1) {
          this.router.navigate(['/empleado']);
        } else {
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

  public logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
