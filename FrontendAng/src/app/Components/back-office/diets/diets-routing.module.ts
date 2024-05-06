import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DietsComponent } from './diets.component';
import {FormDietsComponent} from "./form-diets/form-diets.component";
import {ListDietsComponent} from "./list-diets/list-diets.component";

const routes: Routes = [
  { path: '', component: ListDietsComponent },
  { path: 'add', component: FormDietsComponent },
  { path: 'edit/:id', component: FormDietsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietsRoutingModule { }
