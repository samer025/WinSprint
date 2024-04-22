import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Food} from "../Models/food";


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseUrl = 'http://localhost:8082/SpringMVC/api/foods';

  constructor(private http: HttpClient) { }

  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.baseUrl}`);
  }

  addFood(food: FormData): Observable<Food> {
    return this.http.post<Food>(`${this.baseUrl}`, food);
  }

  getFoodById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.baseUrl}/${id}`);
  }

  updateFood(id: number, food: FormData): Observable<Food> {
    return this.http.put<Food>(`${this.baseUrl}/${id}`, food);
  }

  deleteFood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
