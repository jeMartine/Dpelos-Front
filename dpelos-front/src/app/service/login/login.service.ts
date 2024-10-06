import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/entidades/LoginRequest';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginURL = environment.apiResrURL+ '/login';

  constructor(
    private http: HttpClient
  ) {}

  public login (peticion: LoginRequest): Observable<any>{
    return this.http.post<any>(this.loginURL, peticion);
  }

}
