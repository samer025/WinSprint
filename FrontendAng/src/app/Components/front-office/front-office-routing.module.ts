import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';
import {HomeComponent} from "./shared/home/home.component";

const routes: Routes = [
  { path: '',
    component: FrontOfficeComponent ,
    children: [
      { path: '', component: HomeComponent },
      { path: 'programs', loadChildren: () => import('../../components/front-office/programs/programs.module').then(m => m.ProgramsModule) },
    ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
