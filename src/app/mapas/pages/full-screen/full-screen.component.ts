import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #mapa{
      height: 100%;
      width: 100%;
    }
    
    `
  
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -98.41978663411737 , 21.14458721360837    ],
      zoom: 13
    });

  }

}
