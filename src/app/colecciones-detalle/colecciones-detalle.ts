import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ProductosService, Producto } from '../services/productos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-colecciones-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './colecciones-detalle.html',
  styleUrl: './colecciones-detalle.css',
})
export class ColeccionesDetalle {
  nombreColeccion!: string;
  productos$!: Observable<Producto[]>;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.nombreColeccion = this.route.snapshot.paramMap.get('nombre') ?? '';
    this.productos$ = this.productosService.getProductosPorColeccion(
      this.nombreColeccion
    );
  }

  volver() {
    this.location.back();
  }
}
