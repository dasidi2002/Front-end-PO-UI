import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { LoginComponent } from './componentes/login/login.component';
import { PoNotificationModule } from '@po-ui/ng-components';
import { TurmasComponent } from './componentes/turmas/turmas.component';
import { DiasemanaComponent } from './componentes/diasemana/diasemana.component';
import { MateriasComponent } from './componentes/materias/materias.component';
import { FormsModule }   from '@angular/forms';
import { AlunosComponent } from './componentes/alunos/alunos.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TurmasComponent,
    DiasemanaComponent,
    MateriasComponent,
    AlunosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    PoNotificationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
