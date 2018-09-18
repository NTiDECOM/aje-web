import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoEventoService {

  constructor(private http: HttpClient) { }

  buscarConfiguracao() {
    return this.http.get(environment.baseApi + 'aje/configuracao/' + environment.codigoEvento);
  }

}
