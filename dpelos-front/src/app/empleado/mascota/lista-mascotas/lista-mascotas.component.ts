import { Component } from '@angular/core';
import { Mascota } from 'src/app/entidades/Mascota';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css'],
})
export class ListaMascotasComponent {
  mascotas!: Mascota[]; 
  selectedMascota!: Mascota;
  isLoading = true;
  searchTerm: string = '';
  constructor(
    private mascotaService: MascotaService,
    private toast: ToastrService
  ) {}


  ngOnInit(): void {
    this.loadAllMascotas();
  }

  loadAllMascotas() {
    this.mascotaService.findAll().subscribe(
      (data: Mascota[]) => {
        this.mascotas = data; //asignar la lista de mascotas
        this.isLoading = false;
      }, (error) => {
        console.error('Error al cargar la lista de mascotas', error);
      }
    );
  }

  deleteMascota(mascota: Mascota): void {
    var index = this.mascotas.indexOf(mascota);
    this.mascotas.splice(index, 1);
    this.mascotaService.deleteById(mascota.idMascota!);
  }

  editarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
  }
  
  addMascota(newMascota: Mascota) {
    this.mascotas.push(newMascota);
    this.mascotaService.addMascota(newMascota);
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
  }
  
  searchDroga() {
    console.log('Método searchDroga llamado con término:', this.searchTerm);
    this.isLoading = true;
    if (this.searchTerm.trim().length === 0) {
      this.loadAllMascotas();
    } else {
      this.mascotaService.searchByNombre(this.searchTerm).subscribe(
        (data) => {
          console.log('Macotas encontradas:', data);
          this.mascotas = data;
          this.isLoading = false;
        },
        (error) => {
          this.toast.error(error.error, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.isLoading = false;
        }
      );
    }
    this.searchTerm = '';
  }
}
