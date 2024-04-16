import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Program} from "../Models/program";


@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private baseUrl = 'http://localhost:8082/SpringMVC/api/programs';

  constructor(private http: HttpClient) { }

  getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.baseUrl}`);
  }

  addProgram(program: Program, userId: number): Observable<Program> {
    return this.http.post<Program>(`${this.baseUrl}/${userId}`, program);
  }

  getProgramById(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.baseUrl}/${id}`);
  }

  updateProgram(id: number, program: Program): Observable<Program> {
    return this.http.put<Program>(`${this.baseUrl}/${id}`, program);
  }


  deleteProgram(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
