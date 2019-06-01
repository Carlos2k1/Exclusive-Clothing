export class cliente{

    id: string;
    nome: string;
    telefone: string;
    email: string;
    endereco: string;
    cep: string;

    constructor(){
    }

    // Dados do firebase
    setDados(obj : any){
        this.nome = obj.nome;
        this.telefone = obj.telefone;
        this.email = obj.email;
        this.endereco = obj.endereco;
        this.cep = obj.cep;
    }
}