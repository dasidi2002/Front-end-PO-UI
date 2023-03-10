import { Component } from '@angular/core';
import {LoginService} from 'src/app/services/login.service'


@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent {


  constructor ( private loginService: LoginService) {}


  ngOnInit() {
   console.log(this.loginService.getUsuario())
  }

}
