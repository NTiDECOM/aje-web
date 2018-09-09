import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { text } from '../../../../node_modules/@angular/core/src/render3/instructions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OficinaService } from '../../services/oficina.service';
import { SwalComponent } from '../../../../node_modules/@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public oficinas: any;
  public oficinaId: any;

  @ViewChild('successAlert') private successAlert: SwalComponent;
  @ViewChild('errorAlert') private errorAlert: SwalComponent;

  constructor(private reportService: ReportService, 
              private oficinaService: OficinaService, 
              private http: HttpClient) { }

  ngOnInit() {
    this.oficinaService.listaOficinas().subscribe(
      (data) => {
        this.oficinas = data;
      },
      (error) => {
        console.log(error);
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

  reportEmailAutorizacao() {
    this.reportService.enviarEmailsAutorizacao().subscribe(
      (data) => {
        this.success(data);
      },
      (error) => {
        this.error(error);
      }
    );
  }

  reportInscricoes() {
    this.reportService.reportInscricoes().subscribe(
      (pdf) => {
        let file = new Blob([pdf], { type: 'application/pdf' });            
        var fileURL = URL.createObjectURL(file);
        var link = document.createElement('a');
        link.href = fileURL;
        link.download = 'INSCRICOES_AJE2018.pdf';
        link.dispatchEvent(new MouseEvent('click'));
      }, 
      (error) => {
        console.log(error);
      }
    );
  }

  reportOficina() {
    this.reportService.reportOficina(this.oficinaId).subscribe(
      (pdf) => {
        let file = new Blob([pdf], { type: 'application/pdf' });            
        var fileURL = URL.createObjectURL(file);
        var link = document.createElement('a');
        link.href = fileURL;
        link.download = 'OFICINA_AJE2018.pdf';
        link.dispatchEvent(new MouseEvent('click'));
      }, 
      (error) => {
        console.log(error);
      }
    );
  }

  public async downloadExcel(): Promise<Blob> {
    const file = await this.http.get<Blob>(
      environment.baseApi + 'aje/excel',
      {responseType: 'blob' as 'json'}
    ).toPromise();
    return file;
  }

  public async reportInscricoesExcel(): Promise<void> {
    const blob = await this.downloadExcel();
    var fileURL = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = fileURL;
    link.download = 'INSCRICOES_AJE2018.xlsx';
    link.dispatchEvent(new MouseEvent('click'));
  }

}
