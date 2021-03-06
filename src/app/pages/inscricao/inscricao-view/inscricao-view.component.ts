import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../../../services/registration.service';
import { SwalComponent } from '../../../../../node_modules/@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-inscricao-view',
  templateUrl: './inscricao-view.component.html',
  styleUrls: ['./inscricao-view.component.css']
})
export class InscricaoViewComponent implements OnInit {

  @ViewChild('successAlert') private successAlert: SwalComponent;
  @ViewChild('errorAlert') private errorAlert: SwalComponent;

  inscricao: any;

  constructor(private route: ActivatedRoute, 
              private registrationService: RegistrationService) { }

  ngOnInit() {
    this.route.params.subscribe( params => 
      this.registrationService.dadosInscricao(params['id']).subscribe(
        data => {
          this.inscricao = data;
          console.log(data);
        },
        error => {
          console.log(error)
        }
      )
    );
  }

  success(data) {
    this.successAlert.show();
  }

  error(error) {
    console.log(error);
    this.errorAlert.show()
  }

  enviarEmailAutorizacao() {
    this.registrationService.enviarEmailAutorizacao(this.inscricao.id).subscribe(
      (data) => {
        this.success(data);
      },
      (error) => {
        this.error(error);
      }
    );
  }

  confirmarPagamento() {
    this.inscricao.pago = true;
    this.registrationService.atualizarInscricao(this.inscricao).subscribe(
      (data) => {
        this.successAlert.show();
      },
      (error) => {
        console.log(error);
        this.errorAlert.show();
      }
    );
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
