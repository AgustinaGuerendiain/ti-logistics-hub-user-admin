import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarUserComponent } from './modals/editar-user/editar-user.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadetesComponent } from './modals/cadetes/cadetes.component';




@NgModule({
  declarations: [
    EditarUserComponent,
    CadetesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports:[
    EditarUserComponent,
  ]
})
export class SharedModule { }
