export class Marcas{

    id: string;
    nome: string;
    img: string;
    descricao: string;

    constructor(){

    }
     // Dados do firebase
     setDados(obj : any){
        this.nome = obj.nome;
        this.img = obj.img;
        this.descricao = obj.descricao;
    }
}