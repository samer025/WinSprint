import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office.component';
import { UserListComponent } from './UserList/UserList.component';
import { EditUserComponent } from './EditUser/EditUser.component';

const routes: Routes = [{ path: '', component: BackOfficeComponent  ,   children: [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: EditUserComponent }

]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
