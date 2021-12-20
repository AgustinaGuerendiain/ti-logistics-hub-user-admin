import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Registro } from '../../models/registro';
import { UsuariosService } from '../../service/usuarios/usuarios.service';
import { Vehicle } from '../../models/vehiculo';
import { Rol } from '../../models/rol';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{

  constructor(private registroService : UsuariosService) { }

  hide = false;

  roles: Rol = {};
  arrayRoles: Rol[] = [];

  vehiculos: Vehicle = {};
  arrayVehiculos: Vehicle[] = [];

  ngOnInit(): void {

    this.registroService.getRoles().subscribe(resp=>{
      this.roles = resp;
      this.arrayRoles = Object.values(this.roles);
      this.arrayRoles.shift();
    });

    this.registroService.getVehiculos().subscribe(resp=>{
      this.vehiculos =  resp;
      this.arrayVehiculos = Object.values(this.vehiculos);
    });
   
  }

  loginForm = new FormGroup({
    rol: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    cellPhone: new FormControl('', Validators.required),
    vehicle: new FormControl(null),
    isAccepted:new FormControl(true),
    isDeleted:new FormControl(false)
  })

  usuarioRegistro : Registro = {
    "email": '',
    "fullName": '',
    "address": '',
    "cellPhone": '',
    "isAccepted": true,
    "isDeleted": false,
    "observations": '',
    "password": '',
    "vehicle": undefined,
    "rol": undefined
  }

  registrar(){

    this.usuarioRegistro = this.loginForm.value;

    console.log(this.usuarioRegistro)

    this.registroService.postRegistro(this.usuarioRegistro).subscribe(resp => {

      console.log(resp)

      Swal.fire(
        'Usuario registrado!',
        '',
        'success'
      )
      
      this.loginForm.reset();

    }, error => {

      this.loginForm.reset();
      console.log(error);
      alert(error.error)

    });

  }



}
