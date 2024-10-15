import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Droga } from 'src/app/entidades/Droga';
import { Tratamiento } from 'src/app/entidades/Tratamiento';
import { MedicamentoService } from 'src/app/service/medicamento/medicamento.service';
import { TratamientoService } from 'src/app/service/tratamiento/tratamiento.service';

@Component({
  selector: 'app-agregar-medicamento',
  templateUrl: './agregar-medicamento.component.html',
  styleUrls: ['./agregar-medicamento.component.css']
})
export class AgregarMedicamentoComponent {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  drogas!: Droga[]
  totalMedicamentos: number = 0;
  pageSize: number = 30;
  totalPages: number = 0;
  currentPage: number = 1;
  selectedDroga!: Droga
  searchTerm: string = '';
  isLoading = true
  noResults: boolean = false;
  isSearching: boolean = false;
  selectedMedicamentos: Droga[] = [];
  message: string | null = null;
  tratamiento!: Tratamiento;
  tratamientoId!: number;

  constructor(
    private drogaService: MedicamentoService,
    private tratamientoService: TratamientoService,
    private toast: ToastrService,
    private router: Router, 
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tratamientoId = +params['idTratamiento'];
      this.loadDrogas(this.currentPage);
      this.loadMedicamentosDelTratamiento(this.tratamientoId);
    });
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

  addMedicamento(droga: Droga) {
    if (!this.selectedMedicamentos.includes(droga)) {
      this.selectedMedicamentos.push(droga);
      this.message = 'Medicamento añadido a la lista.';
    } else {
      this.message = 'Este medicamento ya está en la lista.';
    }
  }

  // Eliminar un medicamento de la lista de seleccionados
  removeMedicamento(droga: Droga) {
    const index = this.selectedMedicamentos.indexOf(droga);
    if (index >= 0) {
      this.selectedMedicamentos.splice(index, 1);
      this.message = 'Medicamento eliminado de la lista.';
    }
  }

  loadMedicamentosDelTratamiento(idTratamiento: number) {
    this.tratamientoService.getMedicamentosPorTratamiento(idTratamiento).subscribe(
      (response) => {
        this.selectedMedicamentos = response;
      },
      (error) => {
        this.toast.error("Error al cargar los medicamentos del tratamiento", 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }


  confirmarAdicion() {
    this.tratamientoService.updateMedicamentosDelTratamiento(this.tratamientoId, this.selectedMedicamentos).subscribe(
      () => {
        this.toast.success('Medicamentos actualizados exitosamente.', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        // Redirigir a la pantalla de actualización del tratamiento
        this.router.navigate(['/tratamiento/update', this.tratamientoId]);
      },
      (error) => {
        this.toast.error('Error al actualizar los medicamentos del tratamiento.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  
    
  }
  


}
