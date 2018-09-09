import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private registrationService: RegistrationService) { }

  inscricoes: any;

  ngOnInit() {
    this.dtOptions = {
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Portuguese-Brasil.json',
      },
      responsive: true
    };
    this.registrationService.listaInscricoes().subscribe(
      (data) => {
        this.inscricoes = data;
        this.rerender();
      },
      (error) => {
        console.log(error)
      }
    );
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  countTrabalhadores() {
    var trabalhadores = this.inscricoes.filter((i) => {
      return i.trabalhador === true;
    });
    return trabalhadores.length;
  }

  countPagamentos() {
    var pagamentos = this.inscricoes.filter((i) => {
      return i.pago === true;
    });
    return pagamentos.length;
  }

}
