import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';
import {BmiCalculatorComponent} from "./bmi-calculator/bmi-calculator.component";
import {HomeComponent} from "./shared/home/home.component";
import {ListRecipesComponent} from "./recipes/list-recipes/list-recipes.component";

const routes: Routes = [
  { path: '',
    component: FrontOfficeComponent ,
    children: [
      { path: '', component: HomeComponent },
      { path: 'bmi', component: BmiCalculatorComponent },
      {path:'recipes',
        component:ListRecipesComponent},
      { path: 'programs', loadChildren: () => import('../../components/front-office/programs/programs.module').then(m => m.ProgramsModule) },
      { path: 'articles', loadChildren: () => import('../../components/front-office/articles/articles.module').then(m => m.ArticlesModule) },
      { path: 'diets', loadChildren: () => import('./diets/diets.module').then(m => m.DietsModule) },
    ] },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontOfficeRoutingModule {}
