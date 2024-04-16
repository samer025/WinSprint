import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office.component';


const routes: Routes = [
  {
    path: '',
    component: BackOfficeComponent,
    children: [
      { path: 'programs', loadChildren: () => import('../../components/back-office/programs/programs.module').then(m => m.ProgramsModule) },
      { path: 'exercices', loadChildren: () => import('../../components/back-office/exercices/exercices.module').then(m => m.ExercicesModule) }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
