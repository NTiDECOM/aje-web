import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  constructor(private http: HttpClient) { }

  buscarPreferencia(idInscricao) {
    return this.http.post(environment.baseApi + 'payment-gateway/preferencia', {id: idInscricao});
  } 

}
