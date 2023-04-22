import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FaltasService {

  constructor(private http: HttpClient) {}

  submeterFaltas(body : any ): Observable<any> {  // especifica o tipo de dados

    const url = "http://localhost:8800/faltas"

    return this.http.post<any>(url,body);
  }


}
