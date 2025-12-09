import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Producto, ProductosService } from '../services/productos';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class ProductoComponent {
  producto$!: Observable<Producto | undefined>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // <-- AHORA ES STRING FIRESTORE ID
    if (id) {
      this.producto$ = this.productosService.getProducto(id);
    }
  }

  obtenerLinkWhatsApp(producto: Producto): string {
    const mensaje = `Hola, estoy interesado en el producto: ${
      producto.nombre
    } (${producto.tipo}) de la colección ${producto.coleccion ?? 'general'}`;
    return `https://wa.me/573185289607?text=${encodeURIComponent(mensaje)}`;
  }

  volver() {
    this.location.back();
  }
}
export type { Producto };
