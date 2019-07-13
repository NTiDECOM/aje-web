import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) { }

  listarCidadesPorEstado(idEstado) {
    return this.http.get(environment.baseApi + 'enderecos/cidades/' + idEstado);
  }

}
