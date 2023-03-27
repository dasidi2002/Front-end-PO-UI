import { Component, ViewChild,TemplateRef } from '@angular/core';
import { TurmasService } from 'src/app/services/turmas.service';
import { Router } from '@angular/router';
import { PoModalAction } from '@po-ui/ng-components';
import { PoModalComponent } from '@po-ui/ng-components';
import { NgForm } from '@angular/forms';
import {PoNotificationService } from '@po-ui/ng-components';
import { PoDropdownAction } from '@po-ui/ng-components';


@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent {

  @ViewChild('modalIncluir') modalIncluir!: PoModalComponent;
  @ViewChild('modalAlterar') modalAlterar!: PoModalComponent;
  @ViewChild('modalExcluir') modalExcluir!: PoModalComponent;


  poModal!: PoModalComponent;
  form!: NgForm;

  public turmas: any[] = [];
  public descricao: string = ''
  public nomeTurma:string = '';
  public codigoTurma:string = '';
  public turmaAtual: any[] = [];
  public codTurma:Number = 0;


/*   estamos setando as opções para o dropdwon no caso editar e excluir
 */
  public dropdown : Array<any> = [
    { label: 'Editar',  icon: 'po-icon-edit', action: this.abrirModalAlterar.bind(this)},
    { label: 'Excluir', icon: 'po-icon-delete', action: this.abrirModalExcluir.bind(this)},
  ];

/*   inicializandos os serviços necessarios no construtor
 */
  constructor(private turmasService: TurmasService, private router: Router,private poNotification: PoNotificationService) { }

  ngOnInit() {
    this.getAllTurmas()
  }

  turmaSelecionada(turma: any ){
  this.router.navigate([`/turmas/${turma.Cod_turma}`])
}

getAllTurmas(){
  this.turmasService.getTurmas().subscribe((data: any[]) => {
    this.turmas = data;
  });
}

getDados(turma: any){
  this.codTurma = turma["Cod_turma"]
}

/* metodos responsavais pela modal de incluir
 */

abrirModalICluir() {
  this.modalIncluir.open();
}

confirm: PoModalAction = {
  action: () => {

    const body = {
      turma: this.nomeTurma,
      codturma: parseInt(this.codigoTurma)
    }

    if(this.nomeTurma != "" && this.codigoTurma != "") {
      this.turmasService.cadastraTurma(body).subscribe()
      this.modalIncluir.close()
      this.getAllTurmas()
      this.poNotification.success("Turma incluida com sucesso")

      }
    else{
      this.poNotification.warning("Todos os campos devem estar preenchidos")
    }

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
      turma: this.nomeTurma,
      codturma: this.codTurma
    }

    if(this.nomeTurma != "" ) {
        this.turmasService.editarTurma(body).subscribe()
        this.modalAlterar.close()
        this.getAllTurmas()
        this.poNotification.success("Turma alterada com sucesso")
      }
    else{
      this.poNotification.warning("Todos os campos devem estar preenchidos")
    }

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

/* metodos responsaveis pelo modar de excluir
 */

abrirModalExcluir(){
  this.modalExcluir.open();
}


salvarExclusao: PoModalAction = {
  action: () => {

    const body = {
      codturma: this.codTurma
    }

        this.turmasService.deletarTurma(body).subscribe()
        this.modalExcluir.close()
        this.getAllTurmas()
        this.poNotification.success("Turma excluída com sucesso")


  },
  label: 'Excluir'
};


fecharExclusao: PoModalAction = {
  action: () => {
    this.modalExcluir.close()
    this.form.reset()
  },
  label: 'Fechar'

};


}
