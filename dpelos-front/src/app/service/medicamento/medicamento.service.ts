import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Droga } from 'src/app/entidades/Droga';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  drogaURL = environment.apiResrURL + '/droga';

  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<Droga[]>{
    return this.http.get<Droga[]>(this.drogaURL);
  }

  findById(id: number):Observable<Droga>{
    return this.http.get<Droga>(`${this.drogaURL}/${id}`);
  }

  addDroga(droga: Droga){
    this.http.post<Droga>(this.drogaURL, droga).subscribe();
  }

  addDrogasExcel(drogas: Droga[]):Observable<any>{
    return this.http.post<Droga[]>(`${this.drogaURL}/excel`, drogas)
  }

  updateDroga(droga: Droga){
    this.http.put<Droga>(this.drogaURL, droga).subscribe();
  }

  deleteById(id: number){
    this.http.delete(`${this.drogaURL}/${id}`).subscribe();
  }

  searchByNombre(nombre: string): Observable<Droga[]> {
    return this.http.get<Droga[]>(`${this.drogaURL}/buscar?nombre=${nombre}`);
  }
}
