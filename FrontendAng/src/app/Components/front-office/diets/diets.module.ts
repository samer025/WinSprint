import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DietsRoutingModule } from './diets-routing.module';
import { DietsComponent } from './diets.component';
// @ts-ignore
import {ListDietsComponent} from './list-diets/list-diets.component';
import { DetailDietComponent } from '../../../components/front-office/diets/detail-diet/detail-diet.component';



@NgModule({
  declarations: [
    DietsComponent,
    ListDietsComponent,
    DetailDietComponent
  ],
  imports: [
    CommonModule,
    DietsRoutingModule
  ]
})
export class DietsModule { }
