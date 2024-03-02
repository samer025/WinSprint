import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListProgramsComponent} from "./list-programs/list-programs.component";
import {FormProgramsComponent} from "./form-programs/form-programs.component";

const routes: Routes = [
  { path: '', component: ListProgramsComponent },
  { path: 'addProgram', component: FormProgramsComponent },
  { path: 'program/:id', component: FormProgramsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
