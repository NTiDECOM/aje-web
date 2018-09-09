import { Pessoa } from "./pessoa";
import { Oficina } from "./oficina";

export class Inscricao {
    id: number;
    trabalhador: boolean;
    telefone: string;
    instituicao: string;
    nomeCoordenador: string;
    emailCoordenador: string;
    pessoa: Pessoa;
    oficina: Oficina;

    constructor() {
        this.pessoa = new Pessoa();
        this.oficina = new Oficina();
    }
}