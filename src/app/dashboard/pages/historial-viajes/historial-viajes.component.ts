import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Viaje } from '../../models/viaje';
import { ViajesService } from '../../service/viajes/viajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.component.html',
  styleUrls: ['./historial-viajes.component.scss']
})
export class HistorialViajesComponent implements OnInit {

  constructor(private historialService : ViajesService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Viaje> (undefined);

  displayedColumns: string[] = ['id','cadete', 'cliente', 'fecha', 'estado del equipo'];
  
  infoTablaHistorial: Viaje[] = [];
  
  ngOnInit(): void {

    this.historialService.obtenerViajesHistorial(9).subscribe( resp=> {

      let respuesta = JSON.stringify(resp)
    
      JSON.parse(respuesta);
  
      this.infoTablaHistorial = JSON.parse(respuesta);
  
      this.dataSource = new MatTableDataSource<Viaje>(this.infoTablaHistorial);

      this.dataSource.paginator = this.paginator;

    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error,
      })
    });


  }

}


