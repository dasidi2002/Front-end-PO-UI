import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';




@Component({
  selector: 'app-diasemana',
  templateUrl: './diasemana.component.html',
  styleUrls: ['./diasemana.component.css']
})
export class DiasemanaComponent {

  codTurma : Number = 0 ;
  diasSemana : String[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
  dataAtual = new Date();

    constructor (private activatedRoute: ActivatedRoute, private poNotification: PoNotificationService,private router: Router){}

    diaSelecionado ( dia : String ){

      let diaValidado: boolean = false
      let codturma = Number(this.activatedRoute.snapshot.paramMap.get("codturma"));

      diaValidado = this.validaDiaAtual(dia)

     /*  if (diaValidado){
        this.router.navigate([`/turmas/${codturma}/${dia}`])
      } */

      this.router.navigate([`/turmas/${codturma}/${dia}`])

    }


    validaDiaAtual(dia:String ){

      let validaDia : boolean = false
      let finalDeSemana : boolean = false

      if(this.dataAtual.getDay() === 1 && dia.toLowerCase() == 'segunda'){
        validaDia = true
      }else if (this.dataAtual.getDay() === 2 && dia.toLowerCase() == 'terça'){
        validaDia = true
      }else if (this.dataAtual.getDay() === 3 && dia.toLowerCase() == 'quarta'){
        validaDia = true
      }else if (this.dataAtual.getDay() === 4 && dia.toLowerCase() == 'quinta'){
        validaDia = true
      }else if (this.dataAtual.getDay() === 5 && dia.toLowerCase() == 'sexta'){
        validaDia = true
      } else if (this.dataAtual.getDay() === 6 || this.dataAtual.getDay() === 0){
        finalDeSemana = true
      }

      if (!validaDia && !finalDeSemana){
        this.poNotification.warning("Dia selecionado diferente do dia atual")
      } else if (!validaDia && finalDeSemana){
        this.poNotification.error("Você está realizando chamada em um final de semana")
      }

      return validaDia
    }



}
