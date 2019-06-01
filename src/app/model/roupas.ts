export class roupas{

    id: string;
    roupa: string;
    preco: string;
    modelo: string;
    marca: string;
    img: string;

    constructor(){
    }

    // Dados do firebase
    setDados(obj : any){
        this.roupa = obj.roupa;
        this.preco = obj.preco;
        this.modelo = obj.modelo;
        this.marca = obj.marca;
        this.img = obj.img;
    }
}