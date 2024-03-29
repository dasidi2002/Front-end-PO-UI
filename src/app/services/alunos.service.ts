import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor(private http: HttpClient) { }

  getAlunos(codTurma :Number , codMateria : Number): Observable<any[]> {  // especifica o tipo de dados
    return this.http.get<any[]>(`http://localhost:8800/alunos/${codTurma}/${codMateria}`);
  }

  cadastraAluno(body : any ): Observable<any> {  // especifica o tipo de dados

    const url = "http://localhost:8800/alunos/cadastro"

    return this.http.post<any>(url,body);
  }

  alterarAluno(body : any ): Observable<any> {  // especifica o tipo de dados

    const url = "http://localhost:8800/alunos/alterar"

    return this.http.post<any>(url,body);
  }

  excluirAluno(body : any ): Observable<any> {  // especifica o tipo de dados

    const url = "http://localhost:8800/alunos/excluir"

    return this.http.post<any>(url,body);
  }
}
