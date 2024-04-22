import { Component, OnInit } from '@angular/core';
import {DietService} from "../../../../Core/Services/diet.service";
import {Diet} from "../../../../Core/Models/diet";


@Component({
  selector: 'app-list-diets',
  templateUrl: './list-diets.component.html',
  styleUrls: ['./list-diets.component.css']
})
export class ListDietsComponent implements OnInit {
  public diets!: Diet[];
  public pagedDiets!: Diet[];
  public pageSize = 4;
  public currentPage = 0;

  constructor(private dietService: DietService) { }

  ngOnInit(): void {
    this.loadDiets();
  }

  loadDiets() {
    this.dietService.getAllDiets().subscribe({
      next: (diets) => {
        this.diets = diets;
        this.updatePage();
        console.log(this.diets);
      },
      error: (error) => {
        console.log('Error loading diets:', error);
      }
    });
  }

  updatePage() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedDiets = this.diets.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.diets.length / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  protected readonly Array = Array;
}
