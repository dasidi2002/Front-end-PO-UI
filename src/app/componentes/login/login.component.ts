import { Component } from '@angular/core';
import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import {LoginService} from 'src/app/services/login.service'
import {PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    usuarioAutenticado : Boolean = false

    constructor ( private loginService: LoginService, private poNotification: PoNotificationService, private router: Router) {}

    customLiterals: PoPageLoginLiterals = {
    loginPlaceholder: 'Insira seu usuário',
    passwordPlaceholder: 'Insira sua senha',
    submitLabel: 'Entrar',
    loginHint: 'Caso enfrente problemas de login, contacte o adminstrador do sistema'
  };


  loginSenha(loginSenha: PoPageLogin) {

    const body = {
      login: loginSenha.login,
      senha: loginSenha.password
    };

     this.loginService.validaUsuario(body).subscribe((data: any[]) => {

      if (data.length === 0 ) {
        this.poNotification.warning("Usuário não encontrado")
      } else {
        this.usuarioAutenticado = true
        this.loginService.setUsuario(body.login)
        this.poNotification.success("Usuário autenticado com sucesso")
        this.router.navigate(['/turmas'])
      }

    });
  }
}
