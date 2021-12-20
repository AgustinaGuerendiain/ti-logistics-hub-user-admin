import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viaje } from '../../models/viaje';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  constructor(private http: HttpClient) { }

  obtenerViajesHistorial(numero : number){

    let id: string = JSON.parse(localStorage.getItem("UsuarioId")||"");

    return this.http.get<Viaje>(`api/Travel/${id}/${numero}`)
  }

  obtenerViajesActivos(numero : number){

    let id: string = JSON.parse(localStorage.getItem("UsuarioId")||"");

    return this.http.get<Viaje[]>(`api/Travel/${id}/${numero}`)
  }

  postViaje(viaje : Viaje, cadete : number){

    let rol: string = JSON.parse(localStorage.getItem("Rol")||"");
    let isReasigned :boolean = false;

    if (viaje.lastStatusTravel == 10) {
      isReasigned = true;
    }

    return this.http.post<Viaje>(`api/Travel?travelId=${viaje.id}&statusTravel=${viaje.lastStatusTravel}&userOperation=${rol}&cadeteId=${cadete}&isReasigned=${isReasigned}`,"");
   
  }

  postViajeSinCadete(viaje : Viaje){

    let rol: string = JSON.parse(localStorage.getItem("Rol")||"");
    let isReasigned :boolean = false;

    let cadete = viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length-1].cadete?.id;

    if (viaje.lastStatusTravel == 10) {
      isReasigned = true;
      viaje.lastStatusTravel = viaje.lastStatusTravel - 1;
    }

    return this.http.post<Viaje>(`api/Travel?travelId=${viaje.id}&statusTravel=${viaje.lastStatusTravel}&userOperation=${rol}&cadeteId=${cadete}&isReasigned=${isReasigned}`,"");
 
  }
  
}
