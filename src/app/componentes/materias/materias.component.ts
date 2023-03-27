import { Component,ViewChild } from '@angular/core';
import {LoginService} from 'src/app/services/login.service'
import {MateriasService} from 'src/app/services/materias.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PoModalAction } from '@po-ui/ng-components';
import { PoModalComponent } from '@po-ui/ng-components';
import { NgForm } from '@angular/forms';
import {PoNotificationService } from '@po-ui/ng-components';




@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent {

  @ViewChild('modalIncluir') modalIncluir!: PoModalComponent;
  @ViewChild('modalAlterar') modalAlterar!: PoModalComponent;
  @ViewChild('modalExcluir') modalExcluir!: PoModalComponent;

  form!: NgForm;
  public materias: any[] = [];
  public nomeMateria: String = '';
  public nomeMateriaUpdate: String = '';
  public codigoMateria: String = '';
  public turno: String = '';
  public codturma:Number =0;
  public diaSemana:String = '';
  public existeMateria:Boolean = false;


  constructor ( private loginService: LoginService, private materiasService: MateriasService, private activatedRoute: ActivatedRoute, private router: Router, private poNotification: PoNotificationService) {}


  ngOnInit() {
   console.log(this.loginService.getUsuario())
   this.getAllMaterias()
  }

  public dropdown : Array<any> = [
    { label: 'Primeiro', },
    { label: 'Segundo'},
  ];

  public dropdownEditar : Array<any> = [
    { label: 'Editar',  icon: 'po-icon-edit', action: this.abrirModalAlterar.bind(this)},
    { label: 'Excluir', icon: 'po-icon-delete', /* action: this.abrirModalExcluir.bind(this) */},
  ];

  getAllMaterias(){

    this.codturma = Number(this.activatedRoute.snapshot.paramMap.get("codturma"));
    this.diaSemana = String(this.activatedRoute.snapshot.paramMap.get("diasemana"));

    this.materiasService.getMaterias(this.codturma,this.diaSemana).subscribe((data: any[]) => {
      this.materias = data;
    });
  }

  materiaSelecionada(materia: any){
    alert(materia["Nome_Disciplina"])
  }

  setTurno(evento: any ){
    this.turno = evento
  }

  getMateria(materia:any){
    this.codigoMateria = materia["Cod_Disciplina"]
  }

 /* metodos responsavais pela modal de incluir*/

abrirModalICluir() {
  this.modalIncluir.open();
}

confirm: PoModalAction = {
  action: () => {

      const body = {
      codMateria: Number(this.codigoMateria),
      codTurma: Number(this.codturma),
      nomMateria: this.nomeMateria,
      turno: this.turno,
      diaSemana: this.diaSemana
    }

    if(this.codigoMateria != "" && this.nomeMateria != "" && this.turno != "") {

      if(isNaN(Number(this.codigoMateria))){
        this.poNotification.warning("Apenas são aceitos números no campo Código matéria")
      }
      else {
        for (let i = 0; i < this.materias.length ; i++) {
          if(this.materias[i].Cod_Disciplina === Number(this.codigoMateria)){
            this.poNotification.warning("O código da materia informado já existe")
            this.existeMateria = true
            break;
          }
        }
        if(!this.existeMateria){
          this.materiasService.setMateria(body).subscribe()
          this.modalIncluir.close()
          this.poNotification.success("Matéria incluída com sucesso")
          this.getAllMaterias()
        }
      }

    }
    else{
      this.poNotification.warning("Todos os campos devem estar preenchidos")
    }
    this.getAllMaterias()
  },
  label: 'Salvar'
};

close: PoModalAction = {
  action: () => {
    this.modalIncluir.close()
    this.form.reset()
  },
  label: 'Fechar'

};

/* metodos responsaveis pela modal de editar */

abrirModalAlterar(){
  this.modalAlterar.open();
}

salvarEditar: PoModalAction = {
  action: () => {

    const body = {
      novoNome: this.nomeMateriaUpdate,
      codMateria: Number(this.codigoMateria),
      codTurma: Number(this.codturma)    }

    if(this.nomeMateriaUpdate != "" ) {
      this.materiasService.updateMateria(body).subscribe()
      this.modalAlterar.close()
      this.getAllMaterias()
      this.poNotification.success("Matéria alterada com sucesso")
      }
    else{
      this.poNotification.warning("Todos os campos devem estar preenchidos")
    }
    this.getAllMaterias()
  },
  label: 'Salvar'
};


fecharEditar: PoModalAction = {
  action: () => {
    this.modalIncluir.close()
    this.form.reset()
  },
  label: 'Fechar'

};




}
