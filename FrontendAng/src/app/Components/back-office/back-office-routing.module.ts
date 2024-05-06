import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office.component';
import { UserListComponent } from './UserList/UserList.component';
import { EditUserComponent } from './EditUser/EditUser.component';


const routes: Routes = [
  {
    path: '',
    component: BackOfficeComponent,
    children: [
      { path: 'programs', loadChildren: () => import('../../components/back-office/programs/programs.module').then(m => m.ProgramsModule) },
      { path: 'exercices', loadChildren: () => import('../../components/back-office/exercices/exercices.module').then(m => m.ExercicesModule) },
      { path: 'foods', loadChildren: () => import('../../components/back-office/foods/foods.module').then(m => m.FoodsModule) },
      { path: 'diets', loadChildren: () => import('../../components/back-office/diets/diets.module').then(m => m.DietsModule) },
      { path: 'reclamations', loadChildren: () => import('./reclamations/reclamations.module').then(m => m.ReclamationsModule) },
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: EditUserComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
