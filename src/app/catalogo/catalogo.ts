import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductosService, Producto } from '../services/productos'; // ajusta la ruta si hace falta

import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  // Ahora será un observable que viene de Firestore
  productos$!: Observable<Producto[]>;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productos$ = this.productosService.getProductos();
  }
}
