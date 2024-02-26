import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficeComponent } from './back-office.component';
import { NavBarComponent } from '../../components/back-office/shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../components/back-office/shared/header/header.component';


@NgModule({
  declarations: [
    BackOfficeComponent,
    NavBarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule
  ]
})
export class BackOfficeModule { }
