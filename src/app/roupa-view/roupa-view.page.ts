import { Component, OnInit } from '@angular/core';
import { roupas } from '../model/roupas';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-roupa-view',
  templateUrl: './roupa-view.page.html',
  styleUrls: ['./roupa-view.page.scss'],
})
export class RoupaViewPage implements OnInit {

  roupas: roupas = new roupas();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  formGroup: FormGroup;

  constructor(public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router : Router,
    public loadingController : LoadingController) { 
      this.id = this.activateRoute.snapshot.paramMap.get('roupas');
    this.form();
     }

     form() {
      this.formGroup = this.formBuilder.group({
        nome: [this.roupas.roupa],
        preco: [this.roupas.preco],
        marca: [this.roupas.marca],
        modelo: [this.roupas.modelo],
        img: [this.roupas.img],
      });
    }

  ngOnInit() {
    this.obterRoupa();
  }

  obterRoupa() {
    var ref = firebase.firestore().collection("roupas").doc(this.id);
    ref.get().then(doc => {
      this.roupas.setDados(doc.data());
      this.form();
    }).catch(function (error) {
      console.log("Error getting document: ", error);
    });
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

}
