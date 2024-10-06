import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Raza } from 'src/app/entidades/Raza';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  razaURL = environment.apiResrURL + '/raza';
  constructor(
    private http: HttpClient
  ) { }

  
  findAll(): Observable<Raza[]> {
    return this.http.get<Raza[]>(this.razaURL);
  }

  findById(id: number):Observable<Raza> {
    return this.http.get<Raza>(`${this.razaURL}/${id}`);
  }

  updateRaza(raza: Raza) {
    this.http.put<Raza>(this.razaURL+"/update", raza).subscribe();
  }

  addRaza(raza: Raza) {
    this.http.post<Raza>(this.razaURL, raza).subscribe();
  }

  deleteById(id:number){
    this.http.delete(`${this.razaURL}/detete/${id}`).subscribe();
  }
}
