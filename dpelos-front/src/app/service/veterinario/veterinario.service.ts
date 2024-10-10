import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  updateRaza(vet: Veterinario) {
    this.http.put<Veterinario>(this.vetURL+"/update", vet).subscribe();
  }

  addRaza(vet: Veterinario) {
    this.http.post<Veterinario>(this.vetURL, vet).subscribe();
  }

  deleteById(id:number){
    this.http.delete(`${this.vetURL}/detete/${id}`).subscribe();
  }
}
