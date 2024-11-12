import { Component, NgModule, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { VeterinarioService } from 'src/app/service/veterinario/veterinario.service';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-lista-vet',
  templateUrl: './lista-vet.component.html',
  styleUrls: ['./lista-vet.component.css']
})

export class ListaVetComponent implements OnInit{
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  veterinarios: Veterinario[] = [];
  totalVeterinarios: number = 0;
  pageSize: number = 30;
  totalPages: number = 0;
  currentPage: number = 1;
  selectedVeterinario!: Veterinario;
  isLoading = true;
  searchTerm: string = '';
  noResults: boolean = false;
  isSearching: boolean = false;
  locationStrategy: any;

  constructor(
    private veterinarioService: VeterinarioService,
    private toast: ToastrService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.loadVeterinarios(this.currentPage);
  }

  //Función para cargar todas los veterinarios por paginas
  loadVeterinarios(page: number) {
    this.isLoading = true;
    this.isSearching = false;
    this.veterinarioService.getVeterinariosPaginados(page - 1, this.pageSize).subscribe(
      (response) => {
        console.log(response);
        this.veterinarios = response.content;
        this.totalVeterinarios = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLoading = false;
        this.noResults = this.veterinarios.length === 0;
      },
      (error) => {
        this.toast.error('Error al cargar los veterinarios', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.isLoading = false;
      }
    );
  }

  //Función para eliminar una mascota seleccionada
  deleteMascota(veterinario: Veterinario): void {
    
    if(confirm('¿Estás seguro de que quieres eliminar este veterinario?')){
      var index = this.veterinarios.indexOf(veterinario);
      this.veterinarios.splice(index, 1);
      this.veterinarioService.deleteById(veterinario.idVeterinario!);
    }
  }

  //Función para editar un veterinario
  editarVeterinario(veterinario: Veterinario) {
    this.selectedVeterinario = veterinario;
  }

  //Función para añadir un nuevo veterinario
  addVeterinario(newVeterinario: Veterinario) {
    this.veterinarios.push(newVeterinario);
    this.veterinarioService.addVeterinario(newVeterinario);
  }

  //Función para realizar una búsqueda
  onSearchInput(): void {
    //Llama a searchMascotas solo si hay un término de búsqueda
    if (this.searchTerm.trim().length > 0) {
      this.currentPage = 1;
      this.searchVeterinario(this.currentPage);
    } else {
      //Carga a todas las mascotas si no hay término de búsqueda
      this.currentPage = 1;
      this.loadVeterinarios(this.currentPage);
    }
  }

  //Función para buscar un veterinario por nombre
  searchVeterinario(page: number) {
    this.isLoading = true;
    this.noResults = false;
    this.isSearching = true;
    this.veterinarioService
      .searchByNombrePaginado(
        this.searchTerm,
        this.currentPage - 1,
        this.pageSize
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.veterinarios = response.content;
          this.totalVeterinarios = response.totalElements;
          this.totalPages = response.totalPages;
          this.isLoading = false;
          //Si no hay resultados, muestra mensaje de error
          if (this.totalVeterinarios === 0) {
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

  //Función para ir a la página siguiente y actualizar la lista de veterinarios mostrados
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.isSearching
        ? this.searchVeterinario(this.currentPage)
        : this.loadVeterinarios(this.currentPage);
    }
  }

  //Función para ir a la página anterior y actualizar la lista de mascotas mostradas
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.isSearching
        ? this.searchVeterinario(this.currentPage)
        : this.loadVeterinarios(this.currentPage);
    }
  }

  regresar() {
    this.location.back();
    setTimeout(() => {
      this.locationStrategy.onPopState(() => {
        window.location.reload();
      });
    }, 0);
  }
}
