import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Diet} from "../Models/diet";

@Injectable({
  providedIn: 'root'
})
export class DietService {
  private baseUrl = 'http://localhost:8082/SpringMVC/api/diets';

  constructor(private http: HttpClient) { }

  getAllDiets(): Observable<Diet[]> {
    return this.http.get<Diet[]>(`${this.baseUrl}`);
  }

  addDiet(diet: Diet): Observable<Diet> {
    return this.http.post<Diet>(`${this.baseUrl}`, diet);
  }

  getDietById(id: number): Observable<Diet> {
    return this.http.get<Diet>(`${this.baseUrl}/${id}`);
  }

  updateDiet(id: number, diet: Diet): Observable<Diet> {
    return this.http.put<Diet>(`${this.baseUrl}/${id}`, diet);
  }

  deleteDiet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
