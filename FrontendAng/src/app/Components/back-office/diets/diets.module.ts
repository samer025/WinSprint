import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DietsRoutingModule } from './diets-routing.module';
import { DietsComponent } from './diets.component';
import { ListDietsComponent } from '../../../components/back-office/diets/list-diets/list-diets.component';
import { FormDietsComponent } from '../../../components/back-office/diets/form-diets/form-diets.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DietsComponent,
    ListDietsComponent,
    FormDietsComponent
  ],
  imports: [
    CommonModule,
    DietsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DietsModule { }
