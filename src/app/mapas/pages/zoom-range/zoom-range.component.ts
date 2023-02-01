import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom:50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
    
    `
  
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  //Sirve para tomar un elemento html y usar su propiedad
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomLevel: number = 10;
  center: [number,number] = [ -98.41978663411737 , 21.14458721360837    ]

  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {})
    this.mapa.off('zoomend', () => {})
    this.mapa.off('move', () => {})
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement ,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if( this.mapa.getZoom() > 18)
        this.mapa.zoomTo(18);
    });

    //Listener mapa movimientos
    this.mapa.on('move', (event) => {
      const target = event.target;
      //GET CENTER ES UN ARREGLO DE DOS ELEMENTOS. LOS DESESTRUCTURAMOS PARA SEPARARLOS
      const { lng , lat } = target.getCenter();
      this.center = [lng,lat];
    });

    //LOS EVENT LISTENER SON LAS PROIEDADES 'ON'
    //SIEMPRE QUE TENGAMOS UN EVENT LISTENER HAY QUE DESTRUIRLO CUANDO EL 
    //COMPONENTE SE DESTRUYA

  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio(valor:string){
    this.mapa.zoomTo( Number(valor) );
  }

}
