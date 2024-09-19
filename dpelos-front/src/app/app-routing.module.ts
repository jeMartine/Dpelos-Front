import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudDuenoComponent } from './empleado/dueno/crear-dueno/crear-dueno.component';
import { LandingComponent } from './landing/landing/landing.component';
import { CrudEnfermedadComponent } from './empleado/crud-enfermedad/crud-enfermedad.component';
import { CrudRazaComponent } from './empleado/crud-raza/crud-raza.component';
import { NuevoRegistroComponent } from './empleado/nuevo-registro/nuevo-registro.component';
import { ListaDuenosComponent } from './empleado/dueno/lista-duenos/lista-duenos.component';
import { ListaMascotasComponent } from './empleado/mascota/lista-mascotas/lista-mascotas.component';
import { ActualizarDuenoComponent } from './empleado/dueno/actualizar-dueno/actualizar-dueno.component';
import { CrearMascotaComponent } from './empleado/mascota/crear-mascota/crear-mascota.component';
import { ActualizarMascotaComponent } from './empleado/mascota/actualizar-mascota/actualizar-mascota.component';
const routes: Routes = [
  { path: 'dueno/add', component: CrudDuenoComponent },
  { path: 'dueno/update/:id', component: ActualizarDuenoComponent },
  { path: 'dueno', component: ListaDuenosComponent },
  { path: 'home', component: LandingComponent },
  { path: 'mascota/add', component: CrearMascotaComponent },
  { path: 'mascota/update/:id', component: ActualizarMascotaComponent },
  { path: 'mascota', component: ListaMascotasComponent },
  { path: 'enfermedad', component: CrudEnfermedadComponent },
  { path: 'registros', component: NuevoRegistroComponent },
  { path: 'raza', component: CrudRazaComponent },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
