import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { HeaderComponent } from '../../components/front-office/shared/header/header.component';
import { FooterComponent } from '../../components/front-office/shared/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/Register/Register.component';
import { LoginComponent } from './components/Login/Login.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    FrontOfficeComponent,
    HeaderComponent,
    FooterComponent,

  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class FrontOfficeModule { }
