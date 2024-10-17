import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Droga } from 'src/app/entidades/Droga';
import { Page } from 'src/app/entidades/Page';
import { Tratamiento } from 'src/app/entidades/Tratamiento';
import { TratamientoDrogaAux } from 'src/app/entidades/TratamientoDrogaAux';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  tratamientoURL = environment.apiResrURL + `/tratamiento`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(this.tratamientoURL + '/lista');
  }

  findById(id: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(`${this.tratamientoURL}/${id}`);
  }

  addTratamiento(tratamiento: Tratamiento) {
    this.http.post(this.tratamientoURL + '/add', tratamiento).subscribe();
  }

  updateTratamiento(tratamiento: Tratamiento): Observable<void> {
    return this.http.put<void>(`${this.tratamientoURL}/update`, tratamiento)
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar el tratamiento', error);
          return throwError(error);
        })
      );
  }
  
  deleteById(id: number){
    this.http.delete(`${this.tratamientoURL}/delete/${id}`).subscribe();
  }

  getTratamientosActivos(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.tratamientoURL}/activos`);
  }

  buscarTratamientosPorNombre(
    nombreMascota: string
  ): Observable<Tratamiento[]> {
    const params = new HttpParams().set('nombre', nombreMascota);
    return this.http.get<Tratamiento[]>(`${this.tratamientoURL}/buscar`, {
      params,
    });
  }

  updateMedicamentosDelTratamiento(
    idTratamiento: number,
    medicamentos: Droga[]
  ): Observable<void> {
    return this.http.put<void>(
      `${this.tratamientoURL}/${idTratamiento}/medicamentos`,
      medicamentos
    );
  }

  getMedicamentosPorTratamiento(idTratamiento: number): Observable<Droga[]> {
    return this.http
      .get<Droga[]>(`${this.tratamientoURL}/${idTratamiento}/medicamentos`)
      .pipe(
        catchError((error: any) => {
          console.error('Error en la llamada al servicio:', error); // Imprime el error en la consola
          return throwError(error); // Propaga el error
        })
      );
  }

  tratamientosMasUnidadesVendidas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.tratamientoURL}/top3`);
  }

  tratamientosPorTipoDrogas(): Observable<TratamientoDrogaAux[]> {
    return this.http.get<TratamientoDrogaAux[]>(
      `${this.tratamientoURL}/tratamientos-por-tipo-drogas`
    );
  }
}
