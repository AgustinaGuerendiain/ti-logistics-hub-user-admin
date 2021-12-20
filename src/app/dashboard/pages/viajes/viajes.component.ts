import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { Viaje } from '../../models/viaje';
import { ViajesService } from '../../service/viajes/viajes.service';
import { CadetesComponent } from 'src/app/shared/modals/cadetes/cadetes.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss']
})
export class ViajesComponent implements OnInit {
  
  constructor(private viajesService : ViajesService,  private dialogo : MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Viaje> (undefined);

  displayedColumns: string[] = ['cliente','direccion','estado'];
  
  infoTablaHistorial: Viaje[] = [];

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
  
  ngOnInit(): void {
  }

  getViajesActivos(){
    let uno = this.viajesService.obtenerViajesActivos(1);
    let dos = this.viajesService.obtenerViajesActivos(2);
    let tres = this.viajesService.obtenerViajesActivos(3);
    let cuatro = this.viajesService.obtenerViajesActivos(4);
    let cinco = this.viajesService.obtenerViajesActivos(5);
    let seis = this.viajesService.obtenerViajesActivos(6);
    let siete = this.viajesService.obtenerViajesActivos(7);
    let ocho = this.viajesService.obtenerViajesActivos(8);

    forkJoin([uno,dos,tres,cuatro,cinco,seis,siete,ocho]).subscribe(resp=>{
     
      this.infoTablaHistorial = [...resp[0],...resp[1],...resp[2],...resp[3],...resp[4],...resp[5],...resp[6],...resp[7]];
      
      console.log(this.infoTablaHistorial)

      this.dataSource = new MatTableDataSource<Viaje>(this.infoTablaHistorial);

      this.dataSource.paginator = this.paginator;
    })

  }

  getViajesPendientes(){

    let uno = this.viajesService.obtenerViajesActivos(1);
    let cinco = this.viajesService.obtenerViajesActivos(5);

    forkJoin([uno,cinco]).subscribe(resp=>{
     
      this.infoTablaHistorial = [...resp[0],...resp[1]];
      
      console.log(this.infoTablaHistorial)

      this.dataSource = new MatTableDataSource<Viaje>(this.infoTablaHistorial);

      this.dataSource.paginator = this.paginator;

    })
    
  }

  getViajesCurso(){

    let dos = this.viajesService.obtenerViajesActivos(2);
    let tres = this.viajesService.obtenerViajesActivos(3);
    let seis = this.viajesService.obtenerViajesActivos(6);
    let siete = this.viajesService.obtenerViajesActivos(7);

    forkJoin([dos,tres,seis,siete]).subscribe(resp=>{
     
      this.infoTablaHistorial = [...resp[0],...resp[1],...resp[2],...resp[3]];
      
      console.log(this.infoTablaHistorial)

      this.dataSource = new MatTableDataSource<Viaje>(this.infoTablaHistorial);

      this.dataSource.paginator = this.paginator;
    })
    
  }

  postViaje(element: Viaje){

    if (element.lastStatusTravel == 2 || element.lastStatusTravel == 6){

      this.dialogo.open(CadetesComponent,{
        data: element
      });

    }else{

      this.viajesService.postViajeSinCadete(element).subscribe(resp=>{
        console.log(resp)
      }, error => {
        alert(error.error)
      })
      
    }
   
  }
  

}



  
   