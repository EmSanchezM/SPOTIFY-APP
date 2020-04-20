import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  topTracks: any[] = [];
  loadindArtist: boolean;

  constructor( private route: ActivatedRoute,
               private spotify: SpotifyService ) 
  { 
    
    this.loadindArtist = true;
    this.route.params.subscribe( params => {
      //console.log(params['id']);
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  ngOnInit(): void {
  }

  getArtista(id: string){
    this.loadindArtist = true;
    this.spotify.getArtista(id)
                .subscribe( artista => {
                  //console.log(artista);
                  this.artista = artista;
                  this.loadindArtist = false;
                })
  }

  getTopTracks( id:string ){
    this.spotify.getTopTracks(id)
                .subscribe(topTracks => {
                  //console.log(topTracks);
                  this.topTracks = topTracks;
                });

  }

}
