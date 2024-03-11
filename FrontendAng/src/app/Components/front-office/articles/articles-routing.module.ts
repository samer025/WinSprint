import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListArticlesComponent} from "./list-articles/list-articles.component";

const routes: Routes = [{ path: '', component: ListArticlesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
