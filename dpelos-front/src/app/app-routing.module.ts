import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudDuenoComponent } from './empleado/dueno/crear-dueno/crear-dueno.component';
import { LandingComponent } from './landing/landing/landing.component';
import { NuevoRegistroComponent } from './empleado/nuevo-registro/nuevo-registro.component';
import { ListaDuenosComponent } from './empleado/dueno/lista-duenos/lista-duenos.component';
import { ListaMascotasComponent } from './empleado/mascota/lista-mascotas/lista-mascotas.component';
import { ActualizarDuenoComponent } from './empleado/dueno/actualizar-dueno/actualizar-dueno.component';
import { CrearMascotaComponent } from './empleado/mascota/crear-mascota/crear-mascota.component';
import { ActualizarMascotaComponent } from './empleado/mascota/actualizar-mascota/actualizar-mascota.component';
import { ListaEnfermedadComponent } from './empleado/enfermedad/lista-enfermedad/lista-enfermedad.component';
import { ActualizarEnfermedadComponent } from './empleado/enfermedad/actualizar-enfermedad/actualizar-enfermedad.component';
import { ListaRazaComponent } from './empleado/raza/lista-raza/lista-raza.component';
import { ActualizarRazaComponent } from './empleado/raza/actualizar-raza/actualizar-raza.component';
import { CrearRazaComponent } from './empleado/raza/crear-raza/crear-raza.component';
import { LoginComponent } from './login/login.component';
import { IndexVeterinarioComponent } from './empleado/index-veterinario/index-veterinario.component';
const routes: Routes = [
  { path: 'dueno/add', component: CrudDuenoComponent },
  { path: 'dueno/update/:id', component: ActualizarDuenoComponent },
  { path: 'dueno', component: ListaDuenosComponent },
  { path: 'home', component: LandingComponent },
  { path: 'mascota/add', component: CrearMascotaComponent },
  { path: 'mascota/update/:id', component: ActualizarMascotaComponent },
  { path: 'mascota', component: ListaMascotasComponent },
  { path: 'enfermedad', component: ListaEnfermedadComponent },
  { path: 'enfermedad/add', component: ListaEnfermedadComponent },
  { path: 'enfermedad/update/:id', component: ActualizarEnfermedadComponent },
  { path: 'registros', component: NuevoRegistroComponent },
  { path: 'raza', component: ListaRazaComponent },
  { path: 'raza/add', component: CrearRazaComponent },
  { path: 'raza/update/:id', component: ActualizarRazaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'empleado', component: IndexVeterinarioComponent },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
