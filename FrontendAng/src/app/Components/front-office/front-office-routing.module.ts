import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';
import {BmiCalculatorComponent} from "./bmi-calculator/bmi-calculator.component";
import {HomeComponent} from "./shared/home/home.component";
import {ListRecipesComponent} from "./recipes/list-recipes/list-recipes.component";
import {CalorieCalculatorComponent} from "../../Components/front-office/calorie-calculator/calorie-calculator.component";
import {ChatBotComponent} from "./chat-bot/chat-bot.component";
import {QuizComponent} from "./quiz/quiz.component";


const routes: Routes = [
  { path: '',
    component: FrontOfficeComponent ,
    children: [
      { path: '', component: HomeComponent },
      { path: 'bmi', component: BmiCalculatorComponent },
      { path: 'calories', component: CalorieCalculatorComponent},
      {path:'recipes',
        component:ListRecipesComponent},
      { path: 'chatbot', component: ChatBotComponent },
      {path:'quiz',component:QuizComponent},
      { path: 'programs', loadChildren: () => import('../../components/front-office/programs/programs.module').then(m => m.ProgramsModule) },
      { path: 'articles', loadChildren: () => import('../../components/front-office/articles/articles.module').then(m => m.ArticlesModule) },
      { path: 'diets', loadChildren: () => import('./diets/diets.module').then(m => m.DietsModule) },
      { path: 'reclamations', loadChildren: () => import('./reclamations/reclamations.module').then(m => m.ReclamationsModule) },

    ] },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontOfficeRoutingModule {}
