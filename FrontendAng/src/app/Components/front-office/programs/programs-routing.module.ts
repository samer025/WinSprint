import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProgramsComponent} from "./list-programs/list-programs.component";
import {DetailProgramComponent} from "./detail-program/detail-program.component";
import {DetailExerciceComponent} from "./detail-exercice/detail-exercice.component";

const routes: Routes = [

  { path: '', component: ListProgramsComponent },
  { path: 'program/:id', component: DetailProgramComponent },
  { path: 'exercise/:id', component: DetailExerciceComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
