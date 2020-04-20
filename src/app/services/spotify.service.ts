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
      'Authorization': 'Bearer BQA3oSZ6ic-ib-vASzZovPVnoTsxCFrmR9aWT_EKIxCWmWcYIIv9iMtxNZ6QXzcUB9_pdtSex3XugrrySeg'
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
