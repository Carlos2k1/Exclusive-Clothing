import { Component, OnInit } from '@angular/core';
import { cliente } from '../model/cliente';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lista-de-clientes',
  templateUrl: './lista-de-clientes.page.html',
  styleUrls: ['./lista-de-clientes.page.scss'],
})
export class ListaDeClientesPage implements OnInit {

 
  listaDeClientes: cliente[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  constructor(public router: Router,
    public loadingController : LoadingController) {

     }

  ngOnInit() {
    this.getList();
  }

  viewCliente(obj: cliente) {
    this.router.navigate(['/cliente-view', { 'cliente' : obj.id }]);
  }

  comprar(){
    this.router.navigate(['/home']);
  }

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("cliente");
    ref.get().then(query => {
      query.forEach(doc => {
        let c = new cliente();
        c.setDados(doc.data());
        c.id = doc.id;
        this.listaDeClientes.push(c);
      });
      this.loadingController.dismiss();     

    });

  }

  remove(obj: cliente) {
    var ref = firebase.firestore().collection("cliente");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeClientes = [];
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
