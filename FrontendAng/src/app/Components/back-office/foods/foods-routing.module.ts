import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FoodsFormComponent} from "./foods-form/foods-form.component";
import {ListFoodsComponent} from "./list-foods/list-foods.component";


const routes: Routes = [
  { path: '', component: ListFoodsComponent },
  { path: 'add', component: FoodsFormComponent },
  { path: 'edit/:id', component: FoodsFormComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule { }
