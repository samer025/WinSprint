import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';
import { FormProgramsComponent } from '../../../components/back-office/programs/form-programs/form-programs.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProgramsComponent,
    FormProgramsComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProgramsModule { }
