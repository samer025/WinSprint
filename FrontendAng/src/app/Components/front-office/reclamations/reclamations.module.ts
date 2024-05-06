import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamationsRoutingModule } from './reclamations-routing.module';
import {ReclamtionfrontComponent} from "./reclamtionfront/reclamtionfront.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ReclamtionfrontComponent
  ],
  imports: [
    CommonModule,
    ReclamationsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReclamationsModule { }
