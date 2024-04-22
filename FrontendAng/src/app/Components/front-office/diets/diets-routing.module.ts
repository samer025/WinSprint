import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListDietsComponent} from "./list-diets/list-diets.component";
import {DetailDietComponent} from "./detail-diet/detail-diet.component";

const routes: Routes = [
  { path: '', component: ListDietsComponent },
  { path: 'detail/:id', component: DetailDietComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietsRoutingModule { }
