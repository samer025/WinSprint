import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8082/SpringMVC/api/auth/';
  private API_URLL = 'http://localhost:8082/SpringMVC/';
  private isLoggedInUrl = 'http://localhost:8082/SpringMVC/api/auth/isLoggedIn';


  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.API_URL + 'signin', { username, password });
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.API_URL + 'signup', { username, email, password });
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post<any>(this.API_URLL + 'upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(this.isLoggedInUrl);
  }

}
