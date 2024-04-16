import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { ListArticlesComponent } from '../../../components/front-office/articles/list-articles/list-articles.component';


@NgModule({
  declarations: [
    ArticlesComponent,
    ListArticlesComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
