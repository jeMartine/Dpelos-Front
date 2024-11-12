import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Administrador } from 'src/app/entidades/Administrador';
import { Dueno } from 'src/app/entidades/Dueno';
import { LoginRequest } from 'src/app/entidades/LoginRequest';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginURL = environment.apiResrURL + '/login';
  loginVerifTokenURL = environment.apiResrURL + '/login/validate-token';
  loginClienteURL = environment.apiResrURL + '/dueno/details';
  loginVeterinarioURL = environment.apiResrURL + '/vet/details';
  //loginAdminURL = environment.apiResrURL + '/admin/details';

  constructor(
    
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {}

  //Recibe un objeto y lo almancena en el localstorage para manejar la sesión
  public login(peticion: LoginRequest): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.loginURL, peticion).subscribe(
        (restBackend) => {
          console.log(restBackend);
          let token = restBackend.user;
          let role = restBackend.role;
  
          // Login de veterinario
          if (role === 'VETERINARIO') {
            localStorage.setItem('isVetLogged', 'true');
            localStorage.setItem('token', JSON.stringify(token));
  
            this.obtenerVet().subscribe((vetBack) => {
              localStorage.setItem('userVet', JSON.stringify(vetBack));
              this.router.navigate(['/empleado']);
              resolve(true); // Devuelve true al completar
            });
          }
          // Login de administrador
          else if (role === 'ADMINISTRADOR') {
            localStorage.setItem('isAdminLogged', 'true');
            localStorage.setItem('token', JSON.stringify(token));
            this.router.navigate(['/admin']);
            resolve(true);
          }
          // Login de cliente
          else if (role === 'DUENO') {
            localStorage.setItem('isDuenoLogged', 'true');
            localStorage.setItem('token', JSON.stringify(token));
  
            this.obtenerCliente().subscribe((back) => {
              localStorage.setItem('userDueno', JSON.stringify(back));
              this.router.navigate(['/cliente']);
              resolve(true);
            });
          } else {
            resolve(false);
          }
        },
        (error) => {
          this.toast.error(error.error, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          reject(false); // Manejar error y devolver false
        }
      );
    });
  }
  

  public logout(usuario: string, type: string): void {
    localStorage.removeItem(usuario);
    localStorage.removeItem(type);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(type: string): boolean {
    return localStorage.getItem(type) === 'true';
  }

  //obtener entidad de cliente
  obtenerCliente():Observable<Dueno>{
    return this.http.get<Dueno>(this.loginClienteURL);
  }

  //obtener entidad de administrador
  //obtenerAdmin():Observable<Administrador>{
  //  return this.http.get<Administrador>(this.loginAdminURL);
  //}

  //obtener entidad de veterinario
  obtenerVet():Observable<Veterinario>{
    return this.http.get<Veterinario>(this.loginVeterinarioURL);
  }

// Método para enviar el token al backend y obtener el rol
validateToken(token: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

  return this.http.get<string>(this.loginVerifTokenURL, { headers });
}
}
