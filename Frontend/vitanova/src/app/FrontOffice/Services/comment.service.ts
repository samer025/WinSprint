import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }



  createComment(postId: string, postedBy: string, content: string): Observable<any> {
    const params = new HttpParams()
        .set('postId', postId)
        .set('postedBy', postedBy);
  
    return this.http.post<any>(BASIC_URL + `comment/add`, content, { params });
  }

  getAllCommentsByPost(id:String):Observable<any>{
    return this.http.get(BASIC_URL+`comment/${id}`);
  }
  

  
}
