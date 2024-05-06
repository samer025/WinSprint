import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamationsRoutingModule } from './reclamations-routing.module';
import { ReclamationsComponent } from './reclamations.component';
import {ReclamtionadminComponent} from "./reclamtionadmin/reclamtionadmin.component";


@NgModule({
  declarations: [
    ReclamationsComponent,
    ReclamtionadminComponent
  ],
  imports: [
    CommonModule,
    ReclamationsRoutingModule
  ]
})
export class ReclamationsModule { }
