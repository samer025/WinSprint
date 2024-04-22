import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {Food} from "../../../../Core/Models/food";
import {FoodService} from "../../../../Core/Services/food.service";

@Component({
  selector: 'app-list-foods',
  templateUrl: './list-foods.component.html',
  styleUrls: ['./list-foods.component.css']
})
export class ListFoodsComponent implements OnInit {
  public foods: Food[] = [];

  constructor(private foodService: FoodService, private router: Router) { }

  ngOnInit(): void {
    this.loadFoods();
  }

  private loadFoods() {
    this.foodService.getAllFoods().subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (error) => {
        console.log('Error fetching foods:', error);
      }
    });
  }

  deleteFood(id: number) {
    const result = window.confirm('Are you sure you want to delete this food?');
    if (result) {
      this.foodService.deleteFood(id).subscribe({
        next: () => {
          console.log('Food deleted successfully');
          this.foods = this.foods.filter(f => f.id !== id);
        },
        error: (error) => {
          console.log('Error deleting food:', error);
        }
      });
    }
  }
}
