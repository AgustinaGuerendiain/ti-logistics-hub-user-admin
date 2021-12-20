import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { ViajesComponent } from './viajes/viajes.component';
import { HistorialViajesComponent } from './historial-viajes/historial-viajes.component';
import { ListasComponent } from './listas/listas.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegistroComponent,
    ViajesComponent,
    HistorialViajesComponent,
    ListasComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class PagesModule { }
