import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {

  constructor(private http: HttpClient) { }

  getTurmas(): Observable<any[]> {  // especifica o tipo de dados
    return this.http.get<any[]>('http://localhost:8800/turmas');
  }

  cadastraTurma(body : any ): Observable<any> {

    const url = "http://localhost:8800/cadastroturma"

    return this.http.post<any>(url,body);
  }

  editarTurma(body : any ): Observable<any> {

    const url = "http://localhost:8800/editarturma"

    return this.http.post<any>(url,body);
  }

  deletarTurma(body : any ): Observable<any> {

    const url = "http://localhost:8800/deletarturma"

    return this.http.post<any>(url,body);
  }


}
