import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CarouselModule } from 'primeng/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './landing/header/header.component';
import { BannerPrincipalComponent } from './landing/banner-principal/banner-principal.component';
import { ServiciosComponent } from './landing/servicios/servicios.component';
import { BannerMolestiasComponent } from './landing/banner-molestias/banner-molestias.component';
import { ComentariosComponent } from './landing/comentarios/comentarios.component';
import { AgendarCitaComponent } from './landing/agendar-cita/agendar-cita.component';
import { FooterComponent } from './landing/footer/footer.component';
import { CrudDuenoComponent } from './empleado/dueno/crear-dueno/crear-dueno.component';
import { LandingComponent } from './landing/landing/landing.component';
import { NuevoRegistroComponent } from './empleado/nuevo-registro/nuevo-registro.component';
import { ListaDuenosComponent } from './empleado/dueno/lista-duenos/lista-duenos.component';
import { ListaMascotasComponent } from './empleado/mascota/lista-mascotas/lista-mascotas.component';
import { ActualizarDuenoComponent } from './empleado/dueno/actualizar-dueno/actualizar-dueno.component';
import { FormsModule } from '@angular/forms';
import { CrearMascotaComponent } from './empleado/mascota/crear-mascota/crear-mascota.component';
import { ActualizarMascotaComponent } from './empleado/mascota/actualizar-mascota/actualizar-mascota.component';
import { CrearEnfermedadComponent } from './empleado/enfermedad/crear-enfermedad/crear-enfermedad.component';
import { ActualizarEnfermedadComponent } from './empleado/enfermedad/actualizar-enfermedad/actualizar-enfermedad.component';
import { ListaEnfermedadComponent } from './empleado/enfermedad/lista-enfermedad/lista-enfermedad.component';
import { CrearRazaComponent } from './empleado/raza/crear-raza/crear-raza.component';
import { ActualizarRazaComponent } from './empleado/raza/actualizar-raza/actualizar-raza.component';
import { ListaRazaComponent } from './empleado/raza/lista-raza/lista-raza.component';
import { LoginComponent } from './login/login.component';
import { HeaderVeterinarioComponent } from './empleado/header-veterinario/header-veterinario.component';
import { IndexVeterinarioComponent } from './empleado/index-veterinario/index-veterinario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerPrincipalComponent,
    ServiciosComponent,
    BannerMolestiasComponent,
    ComentariosComponent,
    AgendarCitaComponent,
    FooterComponent,
    CrudDuenoComponent,
    LandingComponent,
    NuevoRegistroComponent,
    ListaDuenosComponent,
    ListaMascotasComponent,
    ActualizarDuenoComponent,
    CrearMascotaComponent,
    ActualizarMascotaComponent,
    CrearEnfermedadComponent,
    ActualizarEnfermedadComponent,
    ListaEnfermedadComponent,
    CrearRazaComponent,
    ActualizarRazaComponent,
    ListaRazaComponent,
    LoginComponent,
    HeaderVeterinarioComponent,
    IndexVeterinarioComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CarouselModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
