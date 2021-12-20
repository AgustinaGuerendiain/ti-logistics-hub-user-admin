import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  login(email: string, password: string) : Observable<Usuario> {
  
    return this.http.get<Usuario>('api/Login?email='+email+'&password='+password);
  
  }
}
