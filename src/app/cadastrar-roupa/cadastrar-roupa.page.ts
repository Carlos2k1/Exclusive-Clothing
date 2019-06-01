import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { roupas } from '../model/roupas';

@Component({
  selector: 'app-cadastrar-roupa',
  templateUrl: './cadastrar-roupa.page.html',
  styleUrls: ['./cadastrar-roupa.page.scss'],
})
export class CadastrarRoupaPage implements OnInit {

   
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  formGroup : FormGroup; 

  roupas: roupas = new roupas();

  imagem : string = "";

  constructor(public formBuilder : FormBuilder,
    public router : Router,
    public loadingController : LoadingController,
    public toastController : ToastController) {
            
      this.formGroup = this.formBuilder.group({
      roupa : [''],
      preco : [''],
      modelo : [''],
      marca : [''],
      img : [''],
      
    }) }

  ngOnInit() {
  }

  ionViewDidLoad(){
    this.downloadFoto();
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

  cadastrar(){
    this.loading();
    let ref = this.firestore.collection('roupas')
    ref.add(this.formGroup.value)
      .then(() =>{
        this.toast('Cadastrado com sucesso');
        this.router.navigate(['/roupas']);
        this.loadingController.dismiss();
      }).catch(()=>{
        this.toast("Erro ao Cadastrar!");
        this.loadingController.dismiss();
      })
  }

  enviaArquivo(event){
    let imagem = event.srcElement.files[0];
    //console.log(imagem.name);
    let ref = firebase.storage().ref()
                  .child(`roupas/${this.roupas.id}.jpg`);
    
    ref.put(imagem).then(url=>{
      console.log("Enviado com sucesso!");
      this.downloadFoto();
    })

  }

  downloadFoto(){
    let ref = firebase.storage().ref()
      .child(`roupas/${this.roupas.id}.jpg`);

      ref.getDownloadURL().then( url=>{ 
        this.imagem = url;
      })
  }

}
