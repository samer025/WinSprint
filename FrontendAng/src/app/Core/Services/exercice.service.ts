import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise, ExerciseType } from "../Models/exercice";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = 'http://localhost:8082/SpringMVC/api/exercises';

  constructor(private http: HttpClient) { }

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.baseUrl}`);
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.baseUrl}/${id}`);
  }

  addExercise(nom: string, type: ExerciseType, description: string, programId: number, file: File): Observable<Exercise> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('nom', nom);
    formData.append('type', type);
    formData.append('description', description);

    return this.http.post<Exercise>(`${this.baseUrl}/${programId}`, formData);
  }

  updateExercise(id: number, nom: string, type: ExerciseType, description: string, file: File): Observable<Exercise> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('nom', nom);
    formData.append('type', type);
    formData.append('description', description);

    return this.http.put<Exercise>(`${this.baseUrl}/${id}`, formData);
  }

  deleteExercise(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
