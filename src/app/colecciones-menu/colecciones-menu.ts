import { Component } from '@angular/core';
import { productos } from '../catalogo/catalogo';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colecciones-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './colecciones-menu.html',
  styleUrl: './colecciones-menu.css',
})
export class ColeccionesMenu {
  colecciones = [
    {
      nombre: 'Navidad',
      imagen: 'assets/images/navidad.png',
    },
    {
      nombre: 'Halloween',
      imagen: 'assets/images/halloween.png',
    },
    {
      nombre: 'Colombia',
      imagen: 'assets/images/colombia.png',
    },
    {
      nombre: 'Flores',
      imagen: 'assets/images/flores.png',
    },
  ];
}
