import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagamentoService } from 'src/app/services/pagamento.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  public pagamento: any;
  public inscricao: any;
  public today: Date;

  constructor(private pagamentoService: PagamentoService,
              private registrationService: RegistrationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.today = new Date();
    this.route.params.subscribe( 
      params => {
        this.pagamentoService.buscarPreferencia(params['id']).subscribe(
          data => {
            this.pagamento = data;
            console.log(data);
          },
          error => console.log(error)
        );
        this.registrationService.dadosInscricao(params['id']).subscribe(
          data => {
            this.inscricao = data;
            console.log(data);
          },
          error => console.log(error)
        );
      }
    )
  }

  pagar() {
    window.location.href = this.pagamento.initPoint;
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