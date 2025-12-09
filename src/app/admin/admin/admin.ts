import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto, ProductosService } from '../../services/productos';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  productos: Producto[] = [];
  editando: Producto | null = null;
  nuevo: Producto = {
    nombre: '',
    tipo: '',
    precio: 0,
    imagen: '',
    imagenAlt: '',
    coleccion: '',
  };

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.getProductos().subscribe((prods) => {
      this.productos = prods;
    });
  }

  seleccionarEditar(p: Producto) {
    this.editando = { ...p };
  }

  cancelarEditar() {
    this.editando = null;
  }

  async guardarEdicion() {
    if (!this.editando || !this.editando.id) return;
    const { id, ...data } = this.editando;
    await this.productosService.updateProducto(id, data);
    this.editando = null;
  }

  async eliminar(p: Producto) {
    if (!confirm(`¿Eliminar ${p.nombre}?`)) return;
    if (p.id) await this.productosService.deleteProducto(p.id);
  }

  async crear() {
    await this.productosService.addProducto(this.nuevo);
    this.nuevo = {
      nombre: '',
      tipo: '',
      precio: 0,
      imagen: '',
      imagenAlt: '',
      coleccion: '',
    };
  }
}
