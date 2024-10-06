import { Injectable } from '@angular/core';
import { Dueno } from '../../entidades/Dueno'; // Asegúrate de que la ruta sea correcta
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DuenoService {

  duenoURL = environment.apiResrURL + '/dueno';

  constructor(
    private http: HttpClient
  ) {}



  findAll(): Observable<Dueno[]> {
    return this.http.get<Dueno[]>(this.duenoURL);
  }
 
  findById(id: number): Observable<Dueno> {
    return this.http.get<Dueno>(`${this.duenoURL}/${id}`);
  }
  
  findByCedula(cedula: string): Observable<Dueno> {
    return this.http.get<Dueno>(`${this.duenoURL}/buscarCedula/${cedula}`);
  }

  addDueno(dueno: Dueno) {
    this.http.post<Dueno>(this.duenoURL, dueno).subscribe();
  }

  updateDueno(dueno: Dueno): void {
    this.http.put<Dueno>(this.duenoURL+"/update", dueno).subscribe();
  }

  deleteById(id: number) {
    this.http.delete(`${this.duenoURL}/delete/${id}`).subscribe();
  }
}
