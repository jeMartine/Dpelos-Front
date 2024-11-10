import { Component } from '@angular/core';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Droga } from 'src/app/entidades/Droga';
import { MedicamentoService } from 'src/app/service/medicamento/medicamento.service';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-lista-med',
  templateUrl: './lista-med.component.html',
  styleUrls: ['./lista-med.component.css']
})
export class ListaMedComponent {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  drogas!: Droga[] 
  displayedMedicamentos: any[] = [];
  totalMedicamentos: number = 0;
  pageSize: number = 30;
  totalPages: number = 0;
  currentPage: number = 1;
  selectedDroga!: Droga
  searchTerm: string = '';
  isLoading = true
  noResults: boolean = false;
  isSearching: boolean = false;

  constructor(
    private drogaService: MedicamentoService,
    private toast: ToastrService
  ){}

  ngOnInit() {
    this.loadDrogas(this.currentPage);
  }

  //Función para cargar todas las drogas por paginas
  loadDrogas(page: number) {
    this.isLoading = true;
    this.isSearching = false;
    this.drogaService.getMedicamentosPaginadas(page - 1, this.pageSize).subscribe(
      (restDrogas) => {
        console.log('Drogas encontradas:', restDrogas);
        this.drogas = restDrogas.content;
        this.totalMedicamentos = restDrogas.totalElements;
        this.totalPages = restDrogas.totalPages;
        this.isLoading = false;
        this.noResults = this.drogas.length === 0;
      },
      (error) => {
        this.toast.error("Error al cargar los medicamentos", 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.isLoading = false;
      }
    );
  }

  //Función para añadir una nueva droga
  addDroga(newDroga: Droga) {
    this.drogas.push(newDroga);
    this.drogaService.addDroga(newDroga);
  }

  //Función para editar una droga
  updateDroga(droga: Droga){
    this.selectedDroga = droga;
  }

  //Funcion para eliminar una droga
  deleteDroga(droga: Droga){
    var index = this.drogas.indexOf(droga);
    this.drogas.splice(index, 1);
    this.drogaService.deleteById(droga.idDroga!);
  }

  //Función para realizar una busqueda
  onSearchInput() {
   //Llama a searchDroga solo si hay un término de búsqueda
   if (this.searchTerm.trim().length > 0) {
    this.currentPage = 1;
    this.searchDroga(this.currentPage);
  } else {
    //Carga a todas las drogas si no hay término de búsqueda
    this.currentPage = 1;
    this.loadDrogas(this.currentPage);
  }
  }
  
  //Función para buscar una droga por nombre
  searchDroga(page:number) {
    this.isLoading = true;
    this.noResults = false;
    this.isSearching = true;
    this.drogaService
    .searchByNombrePaginado(
      this.searchTerm,
      this.currentPage - 1,
      this.pageSize
    )
    .subscribe(
      (response) => {
        console.log(response);
        this.drogas = response.content;
        this.totalMedicamentos = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLoading = false;
        //Si no hay resultados, muestra mensaje de error
        if (this.totalMedicamentos === 0) {
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
        ? this.searchDroga(this.currentPage)
        : this.loadDrogas(this.currentPage);
    }
  }

  //Función para ir a la página anterior y actualizar la lista de mascotas mostradas
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.isSearching
        ? this.searchDroga(this.currentPage)
        : this.loadDrogas(this.currentPage);
    }
  }
}

