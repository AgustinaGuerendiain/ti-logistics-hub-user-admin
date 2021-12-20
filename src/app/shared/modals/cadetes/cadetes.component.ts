import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Registro } from 'src/app/dashboard/models/registro';
import { UsuariosService } from 'src/app/dashboard/service/usuarios/usuarios.service';
import { ViajesService } from 'src/app/dashboard/service/viajes/viajes.service';
import { Viaje } from '../../../dashboard/models/viaje';

@Component({
  selector: 'app-cadetes',
  templateUrl: './cadetes.component.html',
  styleUrls: ['./cadetes.component.scss']
})
export class CadetesComponent implements OnInit {

  constructor(public viajesService : ViajesService ,public usuariosService : UsuariosService ,@Inject(MAT_DIALOG_DATA) public viaje: Viaje, private dialogRef: MatDialogRef<CadetesComponent>) { }

  arrayCadetes: Registro[] = [];

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getCadetes();
  }

  postViaje(viaje : Viaje, cadete : number){

    this.viajesService.postViaje(viaje,cadete).subscribe(resp=>{
      console.log(resp)
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

    })

  }
}
