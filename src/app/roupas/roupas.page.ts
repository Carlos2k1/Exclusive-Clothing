import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { roupas } from '../model/roupas';

@Component({
  selector: 'app-roupas',
  templateUrl: './roupas.page.html',
  styleUrls: ['./roupas.page.scss'],
})
export class RoupasPage implements OnInit {

  listaDeRoupas: roupas[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };


  constructor(public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController) {

  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

  async toast(msg : string) {
    const toast = await this.toastController.create({
      message: 'Cadastrado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("roupas");
    ref.get().then(query => {
      query.forEach(doc => {
        let r = new roupas();
        r.setDados(doc.data());
        r.id = doc.id;
        this.listaDeRoupas.push(r);
      });
      this.loadingController.dismiss();

    });

  }

  viewClienteRoupa(obj: roupas) {
    this.router.navigate(['/roupa-view', { 'roupas' : obj.id }]);

  }

  remove(obj: roupas) {
    var ref = firebase.firestore().collection("roupas");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeRoupas = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

}