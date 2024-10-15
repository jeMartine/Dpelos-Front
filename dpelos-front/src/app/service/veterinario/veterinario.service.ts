import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/entidades/Page';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  vetURL = environment.apiResrURL+'/vet';
  constructor(
    private http: HttpClient
  ) { }

    
  findAll(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(this.vetURL);
  }

  findById(id: number):Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.vetURL}/${id}`);
  }

  updateVeterinario(vet: Veterinario) {
    this.http.put(this.vetURL + '/update', vet).subscribe(); 
}

  addVeterinario(vet: Veterinario) {
    this.http.post<Veterinario>(this.vetURL, vet).subscribe();
  }

  deleteById(id: number) {
    this.http.delete(`${this.vetURL}/delete/${id}`, { responseType: 'text' })
      .subscribe(response => {
        console.log('Veterinario eliminado:', response);
      }, error => {
        console.error('Error eliminando veterinario:', error);
      });
  }
  

  searchByNombrePaginado(
    nombre: string,
    page: number,
    size: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.vetURL}/buscar?nombre=${nombre}&page=${page}&size=${size}`
    );
  }
  getVeterinariosPaginados(
    page: number,
    size: number
  ): Observable<Page<Veterinario>> {
    return this.http.get<Page<Veterinario>>(
      `${this.vetURL}/paginacion?page=${page}&size=${size}`
    );
  }

  obtenerTotalVeterinarios(): Observable<number> {
    return this.http.get<number>(`${this.vetURL}/total`);
  }
}
