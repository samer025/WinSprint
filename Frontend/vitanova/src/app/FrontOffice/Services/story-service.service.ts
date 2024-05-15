import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class StoryServiceService {

  




  constructor(private http: HttpClient) { }

  createNewStory(data: FormData): Observable<any> {
  
    return this.http.post(BASIC_URL + "post/saveStory", data);
  }
 




  
  
  
  


  getAllStories(): Observable<any> {
    return this.http.get(BASIC_URL + "story/getAll");
  }


}
