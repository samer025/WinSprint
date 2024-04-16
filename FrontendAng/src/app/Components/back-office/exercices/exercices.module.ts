import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercicesRoutingModule } from './exercices-routing.module';
import { ExercicesComponent } from './exercices.component';
import { ListExercicesComponent } from '../../../components/back-office/exercices/list-exercices/list-exercices.component';
import { FormExercicesComponent } from '../../../components/back-office/exercices/form-exercices/form-exercices.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ExercicesComponent,
    ListExercicesComponent,
    FormExercicesComponent
  ],
    imports: [
        CommonModule,
        ExercicesRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ExercicesModule { }
