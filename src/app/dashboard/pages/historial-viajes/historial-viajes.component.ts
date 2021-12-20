import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Viaje } from '../../models/viaje';
import { ViajesService } from '../../service/viajes/viajes.service';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.component.html',
  styleUrls: ['./historial-viajes.component.scss']
})
export class HistorialViajesComponent implements OnInit {

  constructor(private historialService : ViajesService) { }

  dataSource = new MatTableDataSource<Viaje> (undefined);

  displayedColumns: string[] = ['id','cadete', 'cliente', 'fecha', 'estado del equipo'];
  
  infoTablaHistorial: Viaje[] = [];
  
  ngOnInit(): void {

    this.historialService.obtenerViajesHistorial(9).subscribe( resp=> {

      let respuesta = JSON.stringify(resp)
    
      JSON.parse(respuesta);
  
      this.infoTablaHistorial = JSON.parse(respuesta);
  
      this.dataSource = new MatTableDataSource<Viaje>(this.infoTablaHistorial);

    }, error => {
      alert(error.error)
    });


  }

}


