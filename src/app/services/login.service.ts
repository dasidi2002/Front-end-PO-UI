import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario : String = "";



  constructor(private http: HttpClient) {}

  validaUsuario(body : any ): Observable<any> {  // especifica o tipo de dados

    const url = "http://localhost:8800/autenticacao"

    return this.http.post<any>(url,body);
  }


  setUsuario(usuarioLogado: String){
    this.usuario = usuarioLogado
  }

  getUsuario(){
    return this.usuario
  }


}
