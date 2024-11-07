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
  public login(peticion: LoginRequest): void {
    this.http.post<any>(this.loginURL, peticion).subscribe(
      (restBackend) => {
        console.log(restBackend);
        //const user = restBackend.user;
        let token = restBackend.user;
        let role = restBackend.role;
        
        //login de veterinario
        if (role === 'VETERINARIO') {
          localStorage.setItem('isVetLogged', 'true');        
          localStorage.setItem('token', JSON.stringify(token));

          this.obtenerVet().subscribe(
            (vetBack)=>{
              const vet = vetBack
              localStorage.setItem('userVet', JSON.stringify(vet));          
              this.router.navigate(['/empleado']);
            }
          )
        
        
        //Login de administrador
        } else if (role === 'ADMINISTRADOR'){
          localStorage.setItem('isAdminLogged', 'true');        
          localStorage.setItem('token', JSON.stringify(token));

          // this.obtenerAdmin().subscribe(
          //   (back)=>{
          //     const vet = back
          //     localStorage.setItem('userAdmin', JSON.stringify(vet));  
          //   }
          // )
          this.router.navigate(['/admin']);        

          //Login de cliente
        } else if (role === 'DUENO'){
          localStorage.setItem('isDuenoLogged', 'true');
          localStorage.setItem('token', JSON.stringify(token));

          this.obtenerCliente().subscribe(
            (back)=>{
              const vet = back
              localStorage.setItem('userDueno', JSON.stringify(vet));          
              this.router.navigate(['/cliente']);
            }
          )
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
