import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ReclamtionfrontComponent} from "./reclamtionfront/reclamtionfront.component";

const routes: Routes = [
  { path: '', component: ReclamtionfrontComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationsRoutingModule { }
