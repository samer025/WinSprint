import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodsRoutingModule } from './foods-routing.module';
import { FoodsComponent } from './foods.component';
import { ListFoodsComponent } from '../../../components/back-office/foods/list-foods/list-foods.component';
import { FoodsFormComponent } from '../../../components/back-office/foods/foods-form/foods-form.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FoodsComponent,
    ListFoodsComponent,
    FoodsFormComponent
  ],
    imports: [
        CommonModule,
        FoodsRoutingModule,
        ReactiveFormsModule
    ]
})
export class FoodsModule { }
