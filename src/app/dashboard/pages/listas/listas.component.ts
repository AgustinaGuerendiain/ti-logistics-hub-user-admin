import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../../service/usuarios/usuarios.service';
import { Registro } from '../../models/registro';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserComponent } from '../../../shared/modals/editar-user/editar-user.component';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent {

  constructor(private usuariosService : UsuariosService, private dialogo : MatDialog) { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Registro> (undefined);

  displayedColumns: string[] = ['nombre','rol','direccion','telefono','email','vehiculo','editar'];
  
  infoTablaLista: Registro[] = [];

  ESTADOS = [
    "1-Soliditud de retiro",
    "2-Retiro asignado",
    "3-Retirado",
    "4-Pendiente de reparación",
    "5-Reparado",
    "6-Entrega asignada",
    "7-Pendiente de entrega",
    "8-Entregado",
    "9-Recibido",
    "10-Renunciado"
  ];

  getUsuarios(rol : number){

    this.usuariosService.getUsuarios().subscribe(resp=>{
     
      let respuesta = JSON.stringify(resp);

      this.infoTablaLista = JSON.parse(respuesta);

      if(rol != 0){
         this.infoTablaLista = this.infoTablaLista.filter(condicion=>{
        if(condicion.rol?.id){
          return condicion.rol?.id === rol
        }
        return false
        })
      }

      this.dataSource = new MatTableDataSource<Registro>(this. infoTablaLista);

      this.dataSource.paginator = this.paginator;
      
    }, error => {
      alert(error.error)
    })

  }

  editarUsuario(usuario : Registro){

    this.dialogo.open(EditarUserComponent,{
      data: usuario
    });
  
  }

  eliminarUsuario(element: Registro){

    element.isDeleted = true;

    this.usuariosService.postRegistro(element).subscribe(resp=>{
      console.log(resp)
    }, error => {
      alert(error.error)
    })

  }

  incorporarUsuario(element: Registro){

    element.isDeleted = false;

    this.usuariosService.postRegistro(element).subscribe(resp=>{
      console.log(resp)
    }, error => {
      alert(error.error)
    })

  }

}
