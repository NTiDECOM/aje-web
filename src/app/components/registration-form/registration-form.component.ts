import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Mask } from '@fagnerlima/ng-mask';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { RegistrationService } from '../../services/registration.service';
import { Inscricao } from '../../models/inscricao';
import { OficinaService } from '../../services/oficina.service';
import { ConfiguracaoEventoService } from '../../services/configuracaoEvento.service';
import { EstadoService } from 'src/app/services/estado.service';
import { CidadeService } from 'src/app/services/cidade.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  @ViewChild('successAlert') private successAlert: SwalComponent;
  @ViewChild('errorAlert') private errorAlert: SwalComponent;

  readonly dateMask: Mask = new Mask('00/00/0000');
  readonly maskPhone: string = '(00) 00000-0000';

  private inscricao: Inscricao;
  private fDataNascimento: string;
  private oficinas: any;
  private estados: any;
  private cidades: any;

  public tos: any;
  public config: any;
  public idEstado: any;

  constructor(private registrationService: RegistrationService, 
              private oficinaService: OficinaService,
              private configuracaoEventoService: ConfiguracaoEventoService,
              private estadoService: EstadoService,
              private cidadeService: CidadeService) { }

  ngOnInit() {
    this.config = {liberado: true};
    this.oficinaService.listaOficinas().subscribe(
      data => this.oficinas = data,
      error => console.log(error)
    );
    this.configuracaoEventoService.buscarConfiguracao().subscribe(
      (data) => {
        this.config = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.estadoService.listarEstados().subscribe(
      data => this.estados = data,
      error => console.log(error)
    );
    this.inscricao = new Inscricao();
  }

  swalClose() {
    window.location.reload();
  }

  success(data) {
    this.successAlert.show();
  }

  error(error) {
    console.log(error);
    this.errorAlert.show()
  }

  submitForm() {
    // this.inscricao.pessoa.dataNascimento = new Date(this.fDataNascimento);
    this.registrationService.salvarInscricao(this.inscricao).subscribe(
      data => this.success(data),
      error => this.error(error) 
    );
  }

  listarCidades() {
    this.cidadeService.listarCidadesPorEstado(this.idEstado).subscribe(
      data => this.cidades = data,
      error => console.log(error)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new Error(
      'Something bad happened; please try again later.');
  }

}