import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { LoginService } from '../../service/login.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  hide = true;

  usuario : Usuario = {
    id: 0,
    fullName: '',
    email : '',
    password: '',
    rol:{
      id:0
    }
  }
  
  constructor(private loginService : LoginService, private _router : Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  
  ingresar(){

    this.usuario = this.loginForm.value;

    this.loginService.login(this.usuario.email, this.usuario.password).subscribe( resp => {
      
      if (resp.rol.id == 1) {

        localStorage.setItem('UsuarioIn', JSON.stringify(this.usuario.email));
        localStorage.setItem('UsuarioId', JSON.stringify(resp.id));
        localStorage.setItem('UsuarioName', JSON.stringify(resp.fullName));
        localStorage.setItem('Rol', JSON.stringify(resp.rol.id));

        this.loginForm.reset();
        
        this._router.navigateByUrl('dashboard/registro');

      }else{

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario no tiene acceso de administrador',
        })

        this.loginForm.reset();
        
        this._router.navigateByUrl('auth/login');
      }
      
      
    }, error => {

      this.loginForm.reset();

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error,
      })

  });

  }


}
