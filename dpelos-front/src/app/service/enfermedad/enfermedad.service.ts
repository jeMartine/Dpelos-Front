import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enfermedad } from 'src/app/entidades/Enfermedad';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {
  enfermedadURL = environment.apiResrURL + '/enfermedad'
  constructor(
    private http: HttpClient
  ) { }
  
  findAll():Observable <Enfermedad[]> {
    return this.http.get<Enfermedad[]>(this.enfermedadURL)
  }

  findById(id: number): Observable <Enfermedad> {
    return this.http.get<Enfermedad>(`${this.enfermedadURL}`)
  }

  updateEnfermedad(enfermedad: Enfermedad) {
    this.http.put<Enfermedad>(this.enfermedadURL+"/update", enfermedad).subscribe()
  }

  addEnfermedad(enfermedad: Enfermedad) {
    this.http.post<Enfermedad>(this.enfermedadURL, enfermedad).subscribe()
  }

  deleteById(id: number){
    this.http.delete(`${this.enfermedadURL}/delete/${id}`).subscribe();
  }
}
