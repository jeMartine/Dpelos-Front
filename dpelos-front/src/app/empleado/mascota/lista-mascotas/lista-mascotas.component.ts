import { Component } from '@angular/core';
import { Mascota } from 'src/app/entidades/Mascota';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { ToastrService } from 'ngx-toastr';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css'],
})
export class ListaMascotasComponent {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  mascotas: Mascota[] = [];
  displayedMascotas: any[] = [];
  totalMascotas: number = 0;
  pageSize: number = 30;
  currentPage: number = 1;
  selectedMascota!: Mascota;
  isLoading = true;
  searchTerm: string = '';
  noResults: boolean = false;

  constructor(
    private mascotaService: MascotaService,
    private toast: ToastrService
  ) {}


  ngOnInit(): void {
    this.loadAllMascotas();
  }

  //Cargar todas las mascotas
  loadAllMascotas() {
    this.mascotaService.findAll().subscribe(
      (data: Mascota[]) => {
        this.mascotas = data; //asignar la lista de mascotas
        this.totalMascotas = this.mascotas.length;
        this.currentPage = 1;
        this.updateDisplayedMascotas();
        this.isLoading = false;
        this.noResults = false;
      }, (error) => {
        console.error('Error al cargar la lista de mascotas', error);
      }
    );
  }

  //Eliminar una mascota seleccionada
  deleteMascota(mascota: Mascota): void {
    var index = this.mascotas.indexOf(mascota);
    this.mascotas.splice(index, 1);
    this.mascotaService.deleteById(mascota.idMascota!);
  }

  //Editar una mascota
  editarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
  }
  
  //Añadir una nueva mascota
  addMascota(newMascota: Mascota) {
    this.mascotas.push(newMascota);
    this.mascotaService.addMascota(newMascota);
  }

  //Recibir el nombre de una mascota de la barra de búsqueda
  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
  }
  
  //Buscar una mascota por nombre
  searchMascotas() {
    this.isLoading = true;
    this.noResults = false; 
    if (this.searchTerm.trim().length === 0) {
      this.loadAllMascotas();
    } else {
      this.mascotaService.searchByNombre(this.searchTerm).subscribe(
        (data) => {
          this.mascotas = data;
          this.totalMascotas = this.mascotas.length;
          this.currentPage = 1;
          this.updateDisplayedMascotas();
          this.isLoading = false;

          if (this.totalMascotas === 0) {
            this.noResults = true; 
          }
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

  // Actualiza la lista de mascotas mostradas basadas en la página actual
  updateDisplayedMascotas() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedMascotas = this.mascotas.slice(startIndex, endIndex);
    this.scrollToTop();
  }

  // Ir a la página siguiente
  nextPage() {
    if (this.currentPage * this.pageSize < this.totalMascotas) {
      this.currentPage++;
      this.updateDisplayedMascotas();
    }
  }

  // Volver a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedMascotas();
    }
  }

  //Desplazarse al inicio de la página
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
