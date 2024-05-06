import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReclamtionadminComponent} from "./reclamtionadmin/reclamtionadmin.component";

const routes: Routes = [
  { path: '', component: ReclamtionadminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationsRoutingModule { }
