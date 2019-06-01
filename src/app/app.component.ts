import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Logoff',
      url: '/logoff',
      icon: 'ios-log-out'
    },
    {
      title: 'Lista de Clientes',
      url: '/lista-de-clientes',
      icon: 'body'
    },
    {
      title: 'Cadastro de Clientes',
      url: '/cadastro-de-cliente',
      icon: 'book'
    },
    {
      title: 'Cadastro de Mensagens',
      url: '/cadastro-de-mensagem',
      icon: 'ios-mail'
    },
    {
      title: 'Lista de Mensagens',
      url: '/lista-de-mensagem',
      icon: 'ios-list-box'
    },
    {
      title: 'Nossas Marcas',
      url: '/nossas-marcas',
      icon: 'md-list-box'
    },
    {
      title: 'Cadastrar Marcas',
      url: '/cadastro-marca',
      icon: 'md-add-circle'
    },
    {
      title: 'Cadastrar Peças',
      url: '/cadastrar-roupa',
      icon: 'md-add-circle'
    },
    {
      title: 'Roupas',
      url: '/roupas',
      icon: 'md-add-circle'
    },
  ];
  //cadastro-de-clientes

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseauth : AngularFireAuth,
    private router : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.firebaseauth.authState
    .subscribe(
      user => {
        if (user) {
          this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/login']);
          }
      },
      () => {
        this.router.navigate(['/home']);
      }
    );

  }
}
