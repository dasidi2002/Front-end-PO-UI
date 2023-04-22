import { AlunosService } from './../../services/alunos.service';
import { Component, ViewChild,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PoModalAction } from '@po-ui/ng-components';
import { PoModalComponent } from '@po-ui/ng-components';
import { NgForm } from '@angular/forms';
import {PoNotificationService,PoTableColumn,PoTableAction,  PoTableComponent} from '@po-ui/ng-components';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent {

  @ViewChild('modalIncluir') modalIncluir!: PoModalComponent;
  @ViewChild('modalAlterar') modalAlterar!: PoModalComponent;
  @ViewChild('modalExcluir') modalExcluir!: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true })

  poTable!: PoTableComponent;
  poModal!: PoModalComponent;
  form!: NgForm;

  public nomeAluno:String = '';
  public matricula:Number = 0;
  public emailAluno:String = '';
  public email:String = '';
  public colunas:PoTableColumn[] =[];
  public registrosTabela:any[]=[];
  public existeAluno:boolean = false;
  public detailAluno:any  ;

  constructor(private activatedRoute: ActivatedRoute, private AlunosService:AlunosService, private poNotification: PoNotificationService){}

 /* metodo responsaveis pelas colunas da tabela*/

 ngOnInit(){
  this.colunas = [
  {
    property: 'Matricula',
    label: 'Matrícula'
  },
  {
    property: 'Nome_Aluno',
    label: 'Nome Aluno'
  },
  {
    property: 'email',
    label: 'Email'
  },
  {
    property: 'Faltas',
    label: 'Faltas'
  }
]
  this.getAlunos();
 }

/*  responsavel pelas opções de excluir e alterar os registros da tabela*/

actions: Array<PoTableAction> = [

  { action: this.AbrirmodalAlterar.bind(this), icon: 'po-icon-edit', label: 'Alterar' },
  { action: this.AbrirmodalExcluir.bind(this), icon: 'po-icon po-icon-delete', label: 'Excluir' }

];

 /* metodo responsavel por retornar todos os alunos de uma turma*/


getAlunos(){
  let codTurma = Number(this.activatedRoute.snapshot.paramMap.get("codturma"));
  let codMateria = Number(this.activatedRoute.snapshot.paramMap.get("codmateria"));

  this.AlunosService.getAlunos(codTurma, codMateria).subscribe(
    res=>{
      this.registrosTabela = res
      },
    erro => {
      console.log(erro)
    }

  )
}

/* metodo responsavel por realizar a submissão de faltas*/

submeterFalta(){
  const alunosSelecionados = this.poTable.getSelectedRows()

  console.log(alunosSelecionados)
}

/* metodos responsavais pela modal de incluir*/

  abrirModalICluir() {
    this.modalIncluir.open();
  }


  confirm: PoModalAction = {
    action: () => {

      const body = {
        matricula: this.matricula,
        nomeAluno: this.nomeAluno,
        email: this.email,
        codTurma: Number(this.activatedRoute.snapshot.paramMap.get("codturma")),
        codDisciplina: Number(this.activatedRoute.snapshot.paramMap.get("codmateria"))
      }

    if(String(this.matricula) != "" && this.nomeAluno != "" && this.email != "") {


      if(isNaN(Number(this.matricula))){
        this.poNotification.warning("Apenas são aceitos números no campo Matricula")
      }else{
        for (let i = 0; i < this.registrosTabela.length ; i++) {
          if(this.registrosTabela[i].Matricula === Number(this.matricula)){
            this.poNotification.warning("O código da matricula informado já existe")
            this.existeAluno = true
            break;
          }
        }
        if(!this.existeAluno){
          this.AlunosService.cadastraAluno(body).subscribe((data: any) => {

            if (data.AlunoCadastrado) {
              this.modalIncluir.close()
              this.getAlunos()
              this.poNotification.success(data.AlunoCadastrado)
            } else {
              this.modalIncluir.close()
              this.getAlunos()
              this.poNotification.success("Aluno cadastrado com sucesso")
            }

          })
        }
      }

    }else {
      this.poNotification.warning("Todos os campos devem estar preenchidos")
    }

     },
    label: 'adicionar'
  }


close: PoModalAction = {
  action: () => {
    this.modalIncluir.close()
    this.form.reset()
  },
  label: 'fechar'
};

/* metodos responsavais pela modal de alterar */

AbrirmodalAlterar(item: any){
  this.detailAluno = item
  this.modalAlterar.open()
}

alterarAluno: PoModalAction = {
  action: () => {

    const body = {
      nomeAluno: this.nomeAluno,
      email: this.email,
      matricula: this.detailAluno.Matricula,
      codTurma: this.detailAluno.Cod_Turma
    }

    if(this.nomeAluno != "" && this.email === "" || this.nomeAluno === "" && this.email  != "" || this.email  != "" && this.nomeAluno != ""){
        this.AlunosService.alterarAluno(body).subscribe((data: any) => {console.log(data)})
        this.poNotification.success("Aluno alterado com sucesso")
        this.modalAlterar.close()
        this.getAlunos()
    }else[
      this.poNotification.warning("Pelos menos um dos campos devem estar preenchidos")
    ]
  },
  label: 'Salvar'
};


fecharAlterarAluno: PoModalAction = {
  action: () => {
    this.modalExcluir.close()
    this.form.reset()
  },
  label: 'Fechar'

};



/* metodos responsavais pela modal de excluir*/

AbrirmodalExcluir(item: any){
  this.detailAluno = item
  this.modalExcluir.open()
}

excluirAluno: PoModalAction = {
  action: () => {

    const body = {
      matricula: this.detailAluno.Matricula,
      codTurma: this.detailAluno.Cod_Turma,
      codDisciplina: Number(this.activatedRoute.snapshot.paramMap.get("codmateria"))
    }

    this.AlunosService.excluirAluno(body).subscribe()
    this.modalExcluir.close()
    this.poNotification.success("Aluno excluída com sucesso")
    this.getAlunos()

  },
  label: 'Excluir'
};


fecharExcluirAluno: PoModalAction = {
  action: () => {
    this.modalExcluir.close()
    this.form.reset()
  },
  label: 'Fechar'

};

}
