import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListExercicesComponent} from "./list-exercices/list-exercices.component";
import {FormExercicesComponent} from "./form-exercices/form-exercices.component";

const routes: Routes = [
  { path: '', component: ListExercicesComponent },
  { path: 'addExercice/:idp', component: FormExercicesComponent },
  { path: 'exercice/:id', component: FormExercicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercicesRoutingModule { }
