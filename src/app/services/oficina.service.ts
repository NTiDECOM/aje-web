import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OficinaService {

  constructor(private http: HttpClient) { }

  listaOficinas() {
    return this.http.get(environment.baseApi + 'aje/oficinas');
  }

}
