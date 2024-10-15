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

  constructor(
    private tratamientoService: TratamientoService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTratamientos();
  }

  //Función para cargar todos los tratamientos
  loadTratamientos(): void {
    this.isLoading = true;
    this.tratamientoService.getTratamientosActivos().subscribe(
      (data: Tratamiento[]) => {
        console.log(data);
        this.tratamientos = data;
        this.isLoading = false;
        this.noResults = this.tratamientos.length === 0;
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

  //Función para navegar al componente de actualización
  verTratamiento(idTratamiento: number): void {
    this.router.navigate([`tratamiento/update`, idTratamiento]);
  }
}
