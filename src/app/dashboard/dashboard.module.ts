import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';





@NgModule({
  declarations: [
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PagesModule,
    MaterialModule,
    SharedModule,
    ComponentsModule
  
  ],exports:[
   
  ]
})
export class DashboardModule { }
