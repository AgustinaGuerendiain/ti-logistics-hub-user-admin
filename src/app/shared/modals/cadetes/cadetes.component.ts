import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Registro } from 'src/app/dashboard/models/registro';
import { UsuariosService } from 'src/app/dashboard/service/usuarios/usuarios.service';
import { ViajesService } from 'src/app/dashboard/service/viajes/viajes.service';
import { Viaje } from '../../../dashboard/models/viaje';
import Swal from 'sweetalert2'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadetes',
  templateUrl: './cadetes.component.html',
  styleUrls: ['./cadetes.component.scss']
})
export class CadetesComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, public viajesService : ViajesService ,public usuariosService : UsuariosService ,@Inject(MAT_DIALOG_DATA) public viaje: Viaje, private dialogRef: MatDialogRef<CadetesComponent>) { }

  arrayCadetes: Registro[] = [];

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getCadetes();
  }

  openSnackBar() {
    this._snackBar.open("Viaje modificado con exito","Aceptar");
  }

  postViaje(viaje : Viaje, cadete : number){

    this.viajesService.postViaje(viaje,cadete).subscribe(resp=>{
      
      this.closeModal();

      this.openSnackBar();

    },error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error,
      })
      this.closeModal();
    })

  }
  
  getCadetes(){

    this.usuariosService.getUsuarios().subscribe(resp=>{

      this.arrayCadetes = resp;

      this.arrayCadetes = this.arrayCadetes.filter(condicion=>{
      if(condicion.rol?.id == 2){
        return condicion.rol?.id == 2
      }
      return false
      })

    },error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error,
      })
    })

  }
}
