import { Component, OnInit } from '@angular/core';
import { cliente } from '../model/cliente';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-view',
  templateUrl: './cliente-view.page.html',
  styleUrls: ['./cliente-view.page.scss'],
})
export class ClienteViewPage implements OnInit {

  cliente: cliente = new cliente();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  formGroup: FormGroup; // <---

  constructor(public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router : Router,
    public loadingController : LoadingController) { // <---
    this.id = this.activateRoute.snapshot.paramMap.get('cliente');
    this.form();
  }

  form() {
    this.formGroup = this.formBuilder.group({
      nome: [this.cliente.nome],
      telefone: [this.cliente.telefone],
      email: [this.cliente.email]
    });
  }

  ngOnInit() {
    this.obterCliente();
  }

  obterCliente() {
    var ref = firebase.firestore().collection("cliente").doc(this.id);
    ref.get().then(doc => {
      this.cliente.setDados(doc.data());
      this.form();
    }).catch(function (error) {
      console.log("Error getting document: ", error);
    });
  }

  atualizar(){
    this.loading();
    let ref = this.firestore.collection('cliente')
    ref.doc(this.id).set(this.formGroup.value)
      .then(() =>{
        console.log('Atualizado com sucesso');
        this.router.navigate(['/lista-de-clientes']);
      }).catch(()=>{
        console.log('Erro ao Atualizar');
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
