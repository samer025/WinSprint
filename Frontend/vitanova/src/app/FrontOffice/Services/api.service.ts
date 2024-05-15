import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';




const Client_ID='a94db26265a64129905079cd98bd5447';
const Client_secret='2eee92074dbd4e22bb3de553a4f75cdf';

@Injectable({
  providedIn: 'root'
})

export class ApiService  {


  constructor(private http: HttpClient) { }

  authorize(clientId: string, clientSecret: string) {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', clientId);
    body.set('client_secret', clientSecret);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), options);
  }



  //get request using search to get the Artist id
  getArtistId(accessToken: string, query: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      })
    };
    return this.http.get<any>('https://api.spotify.com/v1/search?q=' + query + '&type=artist', options);
  }

  //get request with Artist Id grab all the top traks from that artist
  getArtistTopTracks(artistId: string, accessToken: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      })
    };
  
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;
    return this.http.get<any>(url, options);
  }


  //display those albums to the user


}
