import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService  ) {
    this.error = false;
    this.loading = true;

    this.spotify.getNewRealese()
        .subscribe( (data: any) => {
          //console.log(data);
          this.nuevasCanciones = data;
          this.loading = false;
        }, (errorServicio) => {
          this.error = true;
          this.loading = false;
          console.log(errorServicio);
          this.mensajeError = errorServicio.error.error.message;

        })
  }

  ngOnInit(): void {
  }

}
