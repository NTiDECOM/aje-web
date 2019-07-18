import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  enviarEmailAutorizacao(id) {
    return this.http.post(environment.baseApi + 'aje/inscricoes/email-autorizacao/' + id, null);
  }

  salvarInscricao(inscricao) {
    return this.http.post(environment.baseApi + 'aje/inscricoes', inscricao);
  }

  atualizarInscricao(inscricao) {
    console.log(inscricao);
    return this.http.put(environment.baseApi + 'aje/inscricoes/' + inscricao.id, inscricao);
  }

  listaInscricoes() {
    return this.http.get(environment.baseApi + 'aje/inscricoes');
  }

  dadosInscricao(id) {
    return this.http.get(environment.baseApi + 'aje/inscricoes/' + id);
  }

  aprovarInscricao(idInscricao) {
    return this.http.post(environment.baseApi + 'aje/inscricoes/validar-inscricao', {id: idInscricao, valida: true});
  }

}
