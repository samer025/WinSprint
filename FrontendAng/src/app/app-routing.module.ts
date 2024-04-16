import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BmiCalculatorComponent} from "./bmi-calculator/bmi-calculator.component";

const routes: Routes = [
  { path: 'frontOffice', loadChildren: () => import('./components/front-office/front-office.module').then(m => m.FrontOfficeModule) },
  { path: 'backOffice', loadChildren: () => import('./components/back-office/back-office.module').then(m => m.BackOfficeModule) }
,{ path: 'BMI', component: BmiCalculatorComponent }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
