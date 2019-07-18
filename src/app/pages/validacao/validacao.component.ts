import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration.service';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '../../../../node_modules/@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-validacao',
  templateUrl: './validacao.component.html',
  styleUrls: ['./validacao.component.css']
})
export class ValidacaoComponent implements OnInit {

  @ViewChild('successAlert') private successAlert: SwalComponent;
  @ViewChild('errorAlert') private errorAlert: SwalComponent;

  inscricao: any;
  constructor(private route: ActivatedRoute,
              private registrationService: RegistrationService) { }

  ngOnInit() {
    this.route.params.subscribe( params => 
      this.registrationService.dadosInscricao(params['id']).subscribe(
        data => this.inscricao = data,
        error => console.log(error)
      )
    );
  }

  aprovarInscricao() {
    this.registrationService.aprovarInscricao(this.inscricao.id).subscribe(
      data => {
        this.success(data);
      },
      err => {
        this.error(err);
      }
    );
  }

  success(data) {
    this.successAlert.show();
  }

  error(error) {
    console.log(error);
    this.errorAlert.show()
  }

  swalClose() {
    window.location.reload();
  }

  classeSpanStatus(status) {
    switch (status) {
      case 'pending':
        return 'badge-danger';
      case 'approved':
        return 'badge-success';
      case 'authorized':
        return 'badge-info';
      case 'in_process':
        return 'badge-light';
      case 'in_mediation':
        return 'badge-warning';
      case 'rejected':
        return 'badge-danger';
      case 'cancelled':
        return 'badge-danger';
      case 'refunded':
        return 'badge-danger';
      case 'charged_back':
        return 'badge-info';
      default:
        return 'badge-secondary';
    }
  }

  textoSpanStatus(status) {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovado';
      case 'authorized':
        return 'Autorizado';
      case 'in_process':
        return 'Em Processo';
      case 'in_mediation':
        return 'Em Mediação';
      case 'rejected':
        return 'Rejeitado';
      case 'cancelled':
        return 'Cancelado';
      case 'refunded':
        return 'Devolvido';
      case 'charged_back':
        return 'Credito Devolvido';
      default:
        return 'Não Iniciado';
    }
  }

}
