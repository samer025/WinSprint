import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { HeaderComponent } from '../../components/front-office/shared/header/header.component';
import { FooterComponent } from '../../components/front-office/shared/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../../components/front-office/shared/home/home.component';
import {BmiCalculatorComponent} from "./bmi-calculator/bmi-calculator.component";
import {ListRecipesComponent} from "./recipes/list-recipes/list-recipes.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {CalorieCalculatorComponent} from "../../Components/front-office/calorie-calculator/calorie-calculator.component";
import { ChatBotComponent } from '../../components/front-office/chat-bot/chat-bot.component';
import {QuizComponent} from "./quiz/quiz.component";


@NgModule({
  declarations: [
    FrontOfficeComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BmiCalculatorComponent,
    RecipesComponent,
    ListRecipesComponent,
    CalorieCalculatorComponent,
    ChatBotComponent,
    QuizComponent,
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class FrontOfficeModule { }
