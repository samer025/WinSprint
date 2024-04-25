import {Component, OnInit} from '@angular/core';
import {Article} from "../../../../Core/Models/article";
import {ArticleService} from "../../../../Core/Services/article.service";
import {Router} from "@angular/router";
import {Recipe} from "../../../../Core/Models/recipe";
import {RecipeService} from "../../../../Core/Services/recipe.service";

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css']
})
export class ListRecipesComponent implements OnInit {
    public recipes!: Recipe[];
    public pagedRecipes!: Recipe[];
    public pageSize = 4;
    public currentPage = 0;

    constructor(private recipeService: RecipeService, private router: Router) {}

    ngOnInit(): void {
        this.loadRecipes();
    }

    private loadRecipes() {
        this.recipeService.getAllArticles().subscribe({
            next: (params) => {
                this.recipes = params;
                this.updatePage();
                console.log(this.recipes);
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
        this.pagedRecipes = this.recipes.slice(startIndex, startIndex + this.pageSize);
    }

    get totalPages(): number {
        return Math.ceil(this.recipes.length / this.pageSize);
    }

    changePage(page: number) {
        this.currentPage = page;
        this.updatePage();
    }

    protected readonly Array = Array;
}
