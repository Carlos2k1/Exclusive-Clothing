import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-marca',
  templateUrl: './cadastro-marca.page.html',
  styleUrls: ['./cadastro-marca.page.scss'],
})
export class CadastroMarcaPage implements OnInit {

 
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  formGroup: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController) {

    this.formGroup = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      img: [''],

    })
  }
    ngOnInit() {
    }

    cadastrar(){
      this.loading();
      let ref = this.firestore.collection('marcas')
      ref.add(this.formGroup.value)
        .then(resp => {
          console.log(resp);
          this.toast('Cadastrado com sucesso');
          this.router.navigate(['/nossas-marcas']);
          this.loadingController.dismiss();
        }).catch(() => {
          this.toast("Erro ao Cadastrar!");
          this.loadingController.dismiss();
        })
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
  }




  





