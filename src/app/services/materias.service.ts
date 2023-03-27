import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private http: HttpClient) { }

  getMaterias(codTurma :Number , diaSemana : any): Observable<any[]> {  // especifica o tipo de dados
    return this.http.get<any[]>(`http://localhost:8800/materias/${codTurma}/${diaSemana}`);
  }


  setMateria(body : any ): Observable<any> {

    const url = "http://localhost:8800/materias/incluir"

    return this.http.post<any>(url,body);
  }

  updateMateria(body : any ): Observable<any> {

    const url = "http://localhost:8800/materias/editar"

    return this.http.post<any>(url,body);
  }

  deleteMateria(body : any ): Observable<any> {

    const url = "http://localhost:8800/materias/excluir"

    return this.http.post<any>(url,body);
  }
}
