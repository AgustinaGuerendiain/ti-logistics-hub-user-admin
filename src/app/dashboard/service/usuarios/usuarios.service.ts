import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../../models/registro';
import { Rol } from '../../models/rol';
import { Vehicle } from '../../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  postRegistro(usuarioRegistro : Registro) : Observable<Registro>{

    return this.http.post<Registro>(`api/Users`,usuarioRegistro);

  }

  getVehiculos(){
    return this.http.get<Vehicle>(`api/Vehicles`)
  }

  getRoles(){
    return this.http.get<Rol>(`api/Roles`)
  }

  getUsuarios(){

    let rol: string = JSON.parse(localStorage.getItem("Rol")||"");
    
    return this.http.get<Registro[]>(`api/Users?userOperation=${rol}`);

  }

}
