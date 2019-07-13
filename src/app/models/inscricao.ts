import { Pessoa } from "./pessoa";
import { Oficina } from "./oficina";
import { Cidade } from "./cidade";

export class Inscricao {
    id: number;
    trabalhador: boolean;
    telefone: string;
    instituicao: string;
    nomeCoordenador: string;
    emailCoordenador: string;
    pessoa: Pessoa;
    oficina: Oficina;
    cidade: Cidade;

    constructor() {
        this.pessoa = new Pessoa();
        this.oficina = new Oficina();
        this.cidade = new Cidade();
    }
}