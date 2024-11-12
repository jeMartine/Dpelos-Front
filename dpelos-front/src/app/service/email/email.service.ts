import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from 'src/app/entidades/Email';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  emailURL = environment.apiResrURL + '/enviarCorreo'
  constructor(
    private http: HttpClient
  ) { }
  
  enviarCorreo(email: Email): Observable<any> {
    return this.http.post<any>(this.emailURL, email);
  }
}
