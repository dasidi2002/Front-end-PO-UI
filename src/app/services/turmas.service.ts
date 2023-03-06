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
}
