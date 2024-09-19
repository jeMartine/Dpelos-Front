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



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerPrincipalComponent,
    ServiciosComponent,
    BannerMolestiasComponent,
    ComentariosComponent,
    AgendarCitaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
