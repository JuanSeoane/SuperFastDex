import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokesearchComponent } from "./pokesearch/pokesearch.component";
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [PokesearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuperFastDex';

 
      









}
