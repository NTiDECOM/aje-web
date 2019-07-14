import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';
import { InscricaoViewComponent } from './pages/inscricao/inscricao-view/inscricao-view.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'inscricao', component: RegistrationFormComponent},
  {path: 'inscricao/:id/view', component: InscricaoViewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'relatorio', component: ReportsComponent},
  {path: 'pagamento/:id', component: PagamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
