import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

 nombre : string = JSON.parse(localStorage.getItem("UsuarioName")||"");

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  
  constructor(private observer: BreakpointObserver, private _router : Router) { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  existe = false;

  existeSesion(){
    let id = localStorage.getItem('UsuarioId');
    
    if (id) {
      return this.existe = true
    }else{
      return this.existe = false
    }
  }

  cerrarSesion(){
    localStorage.clear();
    this._router.navigateByUrl('auth/login');
  }
}
