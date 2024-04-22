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




@NgModule({
  declarations: [
    FrontOfficeComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BmiCalculatorComponent
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
