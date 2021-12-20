import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from 'src/app/dashboard/models/rol';
import { Vehicle } from 'src/app/dashboard/models/vehiculo';
import { Registro } from '../../../dashboard/models/registro';
import { UsuariosService } from '../../../dashboard/service/usuarios/usuarios.service';


@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss']
})
export class EditarUserComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, public registroService : UsuariosService ,@Inject(MAT_DIALOG_DATA) public user: Registro, private dialogRef: MatDialogRef<EditarUserComponent>) { }
  
  hide = false;

  closeModal(): void {
    this.dialogRef.close();
  }

  roles: Rol = {};
  arrayRoles: Rol[] = [];

  vehiculos: Vehicle = {};
  arrayVehiculos: Vehicle[] = [];

  openSnackBar() {
    this._snackBar.open("Usuario modificado con exito","Aceptar");
  }

  ngOnInit(): void {

    this.registroService.getRoles().subscribe(resp=>{
      this.roles = resp;
      this.arrayRoles = Object.values(this.roles);
    });

    this.registroService.getVehiculos().subscribe(resp=>{
      this.vehiculos =  resp;
      this.arrayVehiculos = Object.values(this.vehiculos);
    });
   
  }

  loginForm = new FormGroup({
    id: new FormControl(this.user.id),
    rol: new FormControl('', Validators.required),
    fullName: new FormControl(this.user.fullName, Validators.required),
    email: new FormControl(this.user.email, Validators.required),
    password: new FormControl(this.user.password, Validators.required),
    address: new FormControl(this.user.address, Validators.required),
    cellPhone: new FormControl(this.user.cellPhone, Validators.required),
    vehicle: new FormControl(null),
    isAccepted:new FormControl(true),
    isDeleted:new FormControl(false)
  })

  usuarioRegistro : Registro = {
    "id": 0,
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

    this.registroService.postRegistro(this.usuarioRegistro).subscribe(resp => {

      this.closeModal();
      this.openSnackBar();

    }, error => {

      this.loginForm.reset();
      alert(error)

    });

  }

}
