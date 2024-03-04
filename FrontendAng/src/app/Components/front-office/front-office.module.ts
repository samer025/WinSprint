import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { HeaderComponent } from '../../components/front-office/shared/header/header.component';
import { FooterComponent } from '../../components/front-office/shared/footer/footer.component';
import { HomeComponent } from '../../components/front-office/shared/home/home.component';



@NgModule({
  declarations: [
    FrontOfficeComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule
  ]
})
export class FrontOfficeModule { }
