import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'src/app/entidades/Page';
import { Tratamiento } from 'src/app/entidades/Tratamiento';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { TratamientoService } from 'src/app/service/tratamiento/tratamiento.service';

@Component({
  selector: 'app-lista-tratamientos',
  templateUrl: './lista-tratamientos.component.html',
  styleUrls: ['./lista-tratamientos.component.css'],
})
export class ListaTratamientosComponent implements OnInit {
  tratamientos: Tratamiento[] = [];
  isLoading: boolean = true;
  noResults: boolean = false;
  searchTerm: string = '';
  mensajeError: string = '';
  veterinario?: Veterinario;

  constructor(
    private tratamientoService: TratamientoService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarVeterinario();
  }

  //Funcion para cargar veterinario logueado desde localStorage
  cargarVeterinario() {
    const user = localStorage.getItem('userVet');
    if (user) {
      this.veterinario = JSON.parse(user);
      if (this.veterinario) {
        this.loadTratamientos();
      }
    }
  }

  //Función para cargar los tratamientos del veterinario
  loadTratamientos(): void {
    this.isLoading = true;
    if (this.veterinario) {
      this.tratamientoService.getTratamientosByVeterinario(this.veterinario.idVeterinario!).subscribe(
        (data: Tratamiento[] | null) => {
          // Verificamos si data no es null o undefined
          if (data && data.length > 0) {
            this.tratamientos = data;
            this.noResults = false;
          } else {
            // Si data es null o tiene longitud 0, mostramos el mensaje de error
            this.tratamientos = [];
            this.noResults = true;
            this.mensajeError = 'No tiene tratamientos activos creados.';
          }
          this.isLoading = false;
        },
        (error) => {
          this.toast.error('Error al cargar los tratamientos', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.isLoading = false;
        }
      );
    }
  }
  
  //Función para buscar un tratamiento por nombre de la mascota
  onSearchInput() {
    this.noResults = false;
    this.mensajeError = '';

    this.tratamientoService
      .buscarTratamientosPorNombre(this.searchTerm.toLowerCase())
      .subscribe(
        (data: Tratamiento[] | null) => {
          this.tratamientos = data || [];
          this.noResults = this.tratamientos.length === 0;

          if (this.noResults) {
            this.mensajeError = `No se encontraron tratamientos para "${this.searchTerm}"`;
          }
        },
        (error) => {
          this.tratamientos = [];
          this.noResults = true;
          this.mensajeError =
            'No se encontraron coincidencias para tu búsqueda';
        }
      );
  }

  //Función para navegar al componente de actualización de tratamiento
  verTratamiento(idTratamiento: number): void {
    this.router.navigate([`tratamiento/updatetrat`, idTratamiento]);
  }
}
