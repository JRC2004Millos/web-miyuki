import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { productos } from '../catalogo/catalogo';
import { CommonModule, Location } from '@angular/common';

type ProductoConIndice = (typeof productos)[0] & { index: number };

@Component({
  selector: 'app-colecciones-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './colecciones-detalle.html',
  styleUrl: './colecciones-detalle.css',
})
export class ColeccionesDetalle {
  productosFiltrados: ProductoConIndice[] = [];
  nombreColeccion = '';

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.nombreColeccion = params['nombre'];
      this.productosFiltrados = productos
        .map((p, index) => ({ ...p, index }))
        .filter((p) => p.coleccion === this.nombreColeccion);
    });
  }

  volver() {
    this.location.back();
  }
}
