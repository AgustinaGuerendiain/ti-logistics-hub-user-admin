import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HistorialViajesComponent } from './pages/historial-viajes/historial-viajes.component';
import { ListasComponent } from './pages/listas/listas.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ViajesComponent } from './pages/viajes/viajes.component';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent,
    children:[
      {
        path: 'viajes',
        component: ViajesComponent
      },
      {
        path:'registro',
        component: RegistroComponent
      },
      {
        path: 'historial-viajes',
        component: HistorialViajesComponent
      },
      {
        path:'listas',
        component: ListasComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
