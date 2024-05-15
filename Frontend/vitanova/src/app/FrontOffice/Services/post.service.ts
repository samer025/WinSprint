import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../Models/post';
const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})


export class PostService {

  constructor(private http: HttpClient) { }

  createNewPost(data: FormData): Observable<any> {
  
    return this.http.post(BASIC_URL + "post/savePost", data);
  }
 




  
  
  
  


  getAllPosts(): Observable<any> {
    return this.http.get(BASIC_URL + "post/getall");
  }

  getPostById(id:string): Observable<any> {
    return this.http.get(BASIC_URL + `post/${id}`);
  }
  likePost(id:string): Observable<any> {
    return this.http.put(BASIC_URL + `post/${id}/like`,{});
  }

  getPostByPostedBy(postedBy:string): Observable<any> {
    return this.http.get(BASIC_URL + `post/search/${postedBy}`);
  }
  deletePost(id:string):Observable<any>{
    return this.http.delete(BASIC_URL+`post/delete/${id}`);
}

}

