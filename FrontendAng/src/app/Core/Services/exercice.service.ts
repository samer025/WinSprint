import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Exercise} from "../Models/exercice";


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = 'http://localhost:8082/SpringMVC/api/exercises';

  constructor(private http: HttpClient) { }

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.baseUrl}`);
  }

  addExercise(exercise: Exercise, programId: number): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.baseUrl}/${programId}`, exercise);
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.baseUrl}/${id}`);
  }

  updateExercise(id: number, exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.baseUrl}/${id}`, exercise);
  }

  deleteExercise(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
