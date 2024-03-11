import {Component, OnInit} from '@angular/core';
import {Program} from "../../../../Core/Models/program";
import {Article} from "../../../../Core/Models/article";
import {ProgramService} from "../../../../Core/Services/program.service";
import {Router} from "@angular/router";
import {ArticleService} from "../../../../Core/Services/article.service";

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  public articles!: Article[];
  public pagedArticles!: Article[];
  public pageSize = 4;
  public currentPage = 0;

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  private loadArticles() {
    this.articleService.getAllArticles().subscribe({
      next: (params) => {
        this.articles = params;
        this.updatePage();
        console.log(this.articles);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  updatePage() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedArticles = this.articles.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.articles.length / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  protected readonly Array = Array;
}
