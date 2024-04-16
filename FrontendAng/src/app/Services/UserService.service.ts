import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Core/Uset';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8082/SpringMVC/api/users/';
  private USER_URL = 'http://localhost:8082/SpringMVC/api/users';

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get<any>(this.USER_URL);
  }

  getUserBoard(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'user', { headers: this.authHeader() });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'mod', { headers: this.authHeader() });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'admin', { headers: this.authHeader() });
  }

  getOneUser(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + id);
  }

  updateUserWithoutPass(data: any, id: number): Observable<any> {
    return this.http.put<any>(this.API_URL + 'updateUser/' + id, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.API_URL + id);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.API_URL + id);
  }


  private authHeader(): HttpHeaders {
    const userString = localStorage.getItem('user');
    
    if (userString) {
      const user = JSON.parse(userString);
      if (user.accessToken) {
        return new HttpHeaders({ Authorization: 'Bearer ' + user.accessToken });
      }
    }
    
    return new HttpHeaders();
  }
  
}
