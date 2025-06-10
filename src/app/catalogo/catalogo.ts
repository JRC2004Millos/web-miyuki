import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.html',
  imports: [CommonModule],
  styleUrls: ['./catalogo.css']
})
export class Catalogo {
  productos = [
  {
    nombre: 'Pulsera Aurora',
    precio: 25000,
    imagen: 'assets/images/AretesRombo.jpg',
    imagenAlt: 'assets/images/AretesColombia.jpg'
  },
  {
    nombre: 'Aretes Florales',
    precio: 30000,
    imagen: 'assets/images/AretesColombia.jpg',
    imagenAlt: 'assets/images/producto2_alt.jpg'
  },
  {
    nombre: 'Collar Cielo Pastel',
    precio: 40000,
    imagen: 'assets/images/AretesMujer.jpg',
    imagenAlt: 'assets/images/producto3_alt.jpg'
  },
  {
    nombre: 'Anillo Estrella',
    precio: 35000,
    imagen: 'assets/images/AretesRombo.jpg',
    imagenAlt: 'assets/images/producto4_alt.jpg'
  },
  {
    nombre: 'Pendientes Lunares',
    precio: 28000,
    imagen: 'assets/images/AretesColombia.jpg',
    imagenAlt: 'assets/images/producto5_alt.jpg'
  },
  {
    nombre: 'Collar Brillante',
    precio: 45000,
    imagen: 'assets/images/AretesMujer.jpg',
    imagenAlt: 'assets/images/producto6_alt.jpg'
  }
];

}
