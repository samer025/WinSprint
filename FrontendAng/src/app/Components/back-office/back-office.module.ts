import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficeComponent } from './back-office.component';
import { NavBarComponent } from '../../components/back-office/shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../components/back-office/shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './UserList/UserList.component';
import { FormsModule } from '@angular/forms';
import { EditUserComponent } from './EditUser/EditUser.component';


@NgModule({
  declarations: [
    BackOfficeComponent,
    NavBarComponent,
    HeaderComponent,
    UserListComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    HttpClientModule,
    FormsModule

  ]
})
export class BackOfficeModule { }
