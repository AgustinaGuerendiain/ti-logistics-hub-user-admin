import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from '../material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PagesModule,
    MaterialModule, 
    HttpClientModule
  ]
})
export class AuthModule { }
