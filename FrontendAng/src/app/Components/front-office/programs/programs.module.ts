import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';
import { ListProgramsComponent } from '../../../components/front-office/programs/list-programs/list-programs.component';
import { DetailProgramComponent } from '../../../components/front-office/programs/detail-program/detail-program.component';
import { DetailExerciceComponent } from '../../../components/front-office/programs/detail-exercice/detail-exercice.component';


@NgModule({
  declarations: [
    ProgramsComponent,
    ListProgramsComponent,
    DetailProgramComponent,
    DetailExerciceComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule
  ]
})
export class ProgramsModule { }
