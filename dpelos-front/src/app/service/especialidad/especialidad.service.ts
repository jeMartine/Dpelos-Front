import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from 'src/app/entidades/Especialidad';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  especialidadURL = environment.apiResrURL + '/especialidad'
  constructor(
    private http: HttpClient
  ) { }
  
  findAll():Observable <Especialidad[]> {
    return this.http.get<Especialidad[]>(this.especialidadURL)
  }
}
