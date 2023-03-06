import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  validaUsuario(login : String, senha : String  ): Observable<any[]> {  // especifica o tipo de dados
    return this.http.get<any[]>(`http://localhost:8800/autenticacao/${login}/${senha}`);
  }





}
