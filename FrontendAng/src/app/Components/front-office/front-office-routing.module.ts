import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';
import { HomeComponent } from './components/Home/Home.component';
import {BmiCalculatorComponent} from "../../bmi-calculator/bmi-calculator.component";

const routes: Routes = [
  { path: '',
    component: FrontOfficeComponent ,
    children: [
      { path: '', component: HomeComponent },
      { path: 'bmi', component: BmiCalculatorComponent },
      { path: 'programs', loadChildren: () => import('../../components/front-office/programs/programs.module').then(m => m.ProgramsModule) },
      { path: 'articles', loadChildren: () => import('../../components/front-office/articles/articles.module').then(m => m.ArticlesModule) },
    ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontOfficeRoutingModule {}
