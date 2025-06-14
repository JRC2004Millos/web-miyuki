import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productos } from '../catalogo/catalogo';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-producto',
  imports: [CommonModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto {
  producto: any;
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.producto = productos[id];
  }

  obtenerLinkWhatsApp(): string {
    const mensaje = `Hola, estoy interesado en el producto: ${
      this.producto.nombre
    } (${this.producto.tipo}) de la colección ${
      this.producto.coleccion ?? 'general'
    }`;
    return `https://wa.me/573185289607?text=${encodeURIComponent(mensaje)}`;
  }

  volver() {
    this.location.back();
  }
}
