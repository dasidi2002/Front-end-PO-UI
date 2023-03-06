import { Component } from '@angular/core';
import { TurmasService } from 'src/app/services/turmas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent {

  turmas: any[] = [];

  constructor(private turmasService: TurmasService, private router: Router) { }

  ngOnInit() {
    this.turmasService.getTurmas().subscribe((data: any[]) => {
      this.turmas = data;
    });
  }

  turmaSelecionada(turma: any ){
  this.router.navigate([`/turmas/${turma.Cod_turma}`])
}


}
