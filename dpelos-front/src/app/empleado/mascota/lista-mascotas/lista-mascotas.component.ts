import { Component } from '@angular/core';
import { Mascota } from 'src/app/entidades/Mascota';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { ToastrService } from 'ngx-toastr';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
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
  totalPages: number = 0;
  currentPage: number = 1;
  selectedMascota!: Mascota;
  isLoading = true;
  searchTerm: string = '';
  noResults: boolean = false;
  isSearching: boolean = false;

  constructor(
    private mascotaService: MascotaService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMascotas(this.currentPage);
  }

  //Función para cargar todas las mascotas por paginas
  loadMascotas(page: number) {
    this.isLoading = true;
    this.isSearching = false;
    this.mascotaService.getMascotasPaginadas(page - 1, this.pageSize).subscribe(
      (response) => {
        console.log(response);
        this.mascotas = response.content;
        this.totalMascotas = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLoading = false;
        this.noResults = this.mascotas.length === 0;
      },
      (error) => {
        this.toast.error('Error al cargar las mascotas', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.isLoading = false;
      }
    );
  }

  //Función para eliminar una mascota seleccionada
  deleteMascota(mascota: Mascota): void {
    var index = this.mascotas.indexOf(mascota);
    this.mascotas.splice(index, 1);
    this.mascotaService.deleteById(mascota.idMascota!);
  }

  //Función para editar una mascota
  editarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
  }

  //Función para añadir una nueva mascota
  addMascota(newMascota: Mascota) {
    this.mascotas.push(newMascota);
    this.mascotaService.addMascota(newMascota);
  }

  //Función para realizar una búsqueda
  onSearchInput(): void {
    //Llama a searchMascotas solo si hay un término de búsqueda
    if (this.searchTerm.trim().length > 0) {
      this.currentPage = 1;
      this.searchMascotas(this.currentPage);
    } else {
      //Carga a todas las mascotas si no hay término de búsqueda
      this.currentPage = 1;
      this.loadMascotas(this.currentPage);
    }
  }

  //Función para buscar una mascota por nombre
  searchMascotas(page: number) {
    this.isLoading = true;
    this.noResults = false;
    this.isSearching = true;
    this.mascotaService
      .searchByNombrePaginado(
        this.searchTerm,
        this.currentPage - 1,
        this.pageSize
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.mascotas = response.content;
          this.totalMascotas = response.totalElements;
          this.totalPages = response.totalPages;
          this.isLoading = false;
          //Si no hay resultados, muestra mensaje de error
          if (this.totalMascotas === 0) {
            this.noResults = true;
          }
        },
        (error) => {
          this.toast.error('Error en la búsqueda', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.isLoading = false;
        }
      );
  }

  //Función para ir a la página siguiente y actualizar la lista de mascotas mostradas
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.isSearching
        ? this.searchMascotas(this.currentPage)
        : this.loadMascotas(this.currentPage);
    }
  }

  //Función para ir a la página anterior y actualizar la lista de mascotas mostradas
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.isSearching
        ? this.searchMascotas(this.currentPage)
        : this.loadMascotas(this.currentPage);
    }
  }
}
