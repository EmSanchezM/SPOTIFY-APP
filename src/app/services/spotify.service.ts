import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { }

  getQuery(query: string){

    const URL = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBKeN011RguTYqo8QU0OtnYnf_H4jpbRQj5t6LKCUA_zrdc_Iv_4aoTIzBg9LpX53bEcCLBbNO4aDSqK_Y'
    });

    return this.http.get(URL, {headers});

  }

  getNewRealese(){

    return this.getQuery('browse/new-releases')
               .pipe(map(data => data['albums'].items ));
                    
  }

  getArtistas( termino: string ){
   
    return this.getQuery(`search?q=${termino}&type=artist&limit=10`)
               .pipe( map( data => data['artists'].items ));
  }

  
  getArtista( id: string ){
   
    return this.getQuery(`artists/${id}`);
               //.pipe( map( data => data['artists'].items ));
  }

  getTopTracks( id: string ){
   
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
               .pipe(map(data => data['tracks']));
  }
}
