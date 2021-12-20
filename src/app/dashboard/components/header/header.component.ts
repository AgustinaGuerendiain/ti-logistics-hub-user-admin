import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  constructor(private _router : Router) { }

  opened = false;
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
