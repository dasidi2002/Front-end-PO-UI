import { MateriasComponent } from './componentes/materias/materias.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { TurmasComponent } from './componentes/turmas/turmas.component';
import { DiasemanaComponent } from './componentes/diasemana/diasemana.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'turmas', component: TurmasComponent},
  {path: 'turmas/:codturma', component: DiasemanaComponent},
  {path: 'turmas/:codturma/:diasemana', component: MateriasComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
