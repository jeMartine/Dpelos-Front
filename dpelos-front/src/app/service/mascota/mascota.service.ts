import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mascota } from 'src/app/entidades/Mascota';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {

  mascotaURL = environment.apiResrURL + '/mascota';

  constructor(
    private http: HttpClient
  ) {}
  sqlDate = new Date();


  findAll(): Observable <Mascota[]> {
    return this.http.get<Mascota[]>(this.mascotaURL);
  }

  findById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.mascotaURL}/${id}`);
  }


  public addMascota(mascota: Mascota){
    this.http.post(this.mascotaURL+"/add", mascota).subscribe();
  }

  updateMascota(mascota: Mascota){
    this.http.put(this.mascotaURL+"/update", mascota).subscribe();
  }

  deleteById(id: number) {
    this.http.delete(`${this.mascotaURL}/delete/${id}`).subscribe();
  }
}
