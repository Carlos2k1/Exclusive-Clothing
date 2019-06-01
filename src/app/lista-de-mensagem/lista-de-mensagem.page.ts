import { PopoverpesquisaPage } from './../pages/popoverpesquisa/popoverpesquisa.page';
import { Component, OnInit } from '@angular/core';
import { Mensagem } from '../model/mensagem';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-lista-de-mensagem',
  templateUrl: './lista-de-mensagem.page.html',
  styleUrls: ['./lista-de-mensagem.page.scss'],
})
export class ListaDeMensagemPage implements OnInit {

  listaDeMensagens: Mensagem[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  constructor(public Router: Router,
    public loadingController: LoadingController,
    public popoverController: PopoverController,) {

  }

  ngOnInit() {
    this.getList();
  }

  viewMensagem(obj: Mensagem) {
    this.Router.navigate(['/mensagem-view', { 'mensagem': obj.id }]);

  }

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("mensagem");
    ref.get().then(query => {
      query.forEach(doc => {
        let m = new Mensagem();
        m.setDados(doc.data());
        m.id = doc.id;
        this.listaDeMensagens.push(m);
      });
      this.loadingController.dismiss();

    });

  }

  remove(obj: Mensagem) {
    var ref = firebase.firestore().collection("mensagem");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeMensagens = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }
}

