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
import { IndexClienteComponent } from './cliente/index-cliente/index-cliente.component';
import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
  { path: 'dueno/add', component: CrudDuenoComponent , canActivate: [AuthGuard]},
  { path: 'dueno/update/:id', component: ActualizarDuenoComponent , canActivate: [AuthGuard]},
  { path: 'dueno', component: ListaDuenosComponent , canActivate: [AuthGuard]},
  { path: 'home', component: LandingComponent },
  { path: 'mascota/add', component: CrearMascotaComponent, canActivate: [AuthGuard] },
  { path: 'mascota/update/:id', component: ActualizarMascotaComponent, canActivate: [AuthGuard] },
  { path: 'mascota', component: ListaMascotasComponent , canActivate: [AuthGuard]},
  { path: 'enfermedad', component: ListaEnfermedadComponent, canActivate: [AuthGuard] },
  { path: 'enfermedad/add', component: ListaEnfermedadComponent , canActivate: [AuthGuard]},
  { path: 'enfermedad/update/:id', component: ActualizarEnfermedadComponent , canActivate: [AuthGuard]},
  { path: 'registros', component: NuevoRegistroComponent , canActivate: [AuthGuard]},
  { path: 'raza', component: ListaRazaComponent , canActivate: [AuthGuard]},
  { path: 'raza/add', component: CrearRazaComponent , canActivate: [AuthGuard]},
  { path: 'raza/update/:id', component: ActualizarRazaComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'empleado', component: IndexVeterinarioComponent , canActivate: [AuthGuard]},
  { path: 'cliente', component: IndexClienteComponent, canActivate: [AuthGuard]},

  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
