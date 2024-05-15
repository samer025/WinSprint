import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../Services/api.service';



const Client_ID='a94db26265a64129905079cd98bd5447';
const Client_secret='2eee92074dbd4e22bb3de553a4f75cdf';


@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit{

  @Output() trackSelected = new EventEmitter<{trackName: string, artistName: string}>();


  title = 'spotify_searcher';
  query: string='';
  searchResults: any[]=[];
  searched: any;
  errorMessage: any;
  accessToken: string = '';
  artistId: any;
  topTracks: any;

constructor(private authService: ApiService,private http: HttpClient) { }

ngOnInit(): void {
  this.authorize();
}


selectTrack(track: any) {
  // Update topTracks array with selected track
  this.topTracks = [track];
  
  // Log track title and artist name
  console.log('Track Title:', track.name);
  console.log('Artist Name:', track.artists[0].name);

  this.trackSelected.emit({trackName: track.name, artistName: track.artists[0].name});


}






playTrack(trackUri: string) {
  const requestBody = {
    uris: [trackUri]
  };

  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    })
  };

  this.http.put<any>('https://api.spotify.com/v1/me/player/play', requestBody, options)
    .subscribe(
      (data) => {
        console.log('Playback started:', data);
      },
      (error) => {
        console.error('Error starting playback:', error);
      }
    );
}




authorize() {
  const clientId = 'a94db26265a64129905079cd98bd5447';
  const clientSecret = '2eee92074dbd4e22bb3de553a4f75cdf';

  this.authService.authorize(clientId, clientSecret)
    .subscribe(
      (data) => {
        this.accessToken = data.access_token;
        console.log(data)

        console.log('Access Token:', this.accessToken);
        // Now you can use the access token for subsequent requests
      },
      (error) => {
        console.error('Error authorizing:', error);
      }
    );
}


//artist id
search(query: string) {
  console.log('Looking for ' + query);
  this.authService.getArtistId(this.accessToken, query).subscribe(
    (data: any) => {
      if (data && data.artists && data.artists.items && data.artists.items.length > 0) {
        this.artistId = data.artists.items[0].id;
        console.log('Artist ID:', this.artistId);
        
        // Fetch top tracks inside the subscription
        this.authService.getArtistTopTracks(this.artistId, this.accessToken)
          .subscribe(
            (tracksData) => {
              console.log('Top tracks:', tracksData);
              // Process the top tracks data here
              this.topTracks = tracksData.tracks; // Assuming 'tracks' is the key containing the top tracks
              console.log(this.topTracks);
            },
            (error) => {
              console.error('Error fetching top tracks:', error);
            }
          );
        
      } else {
        console.error('Artist not found or no items returned in response.');
      }
    },
    (error: any) => {
      console.error('Error fetching artist ID:', error);
    }
  );
}


 

}
