import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8082/SpringMVC/api/test/';
  private USER_URL = 'http://localhost:8082/SpringMVC/api/users/';

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'all');
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
    return this.http.get<any>(this.USER_URL + id);
  }

  updateUserWithoutPass(data: any, id: number): Observable<any> {
    return this.http.put<any>(this.USER_URL + 'updateUser/' + id, data);
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
