import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { Producto, ProductosService } from '../../services/productos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  productos$!: Observable<Producto[]>;
  editando: Producto | null = null;
  archivoNuevo: File | null = null;
  nuevo: Producto = {
    nombre: '',
    tipo: '',
    precio: 0,
    imagen: '',
    imagenAlt: '',
    coleccion: '',
  };

  constructor(
    private productosService: ProductosService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.productos$ = this.productosService.getProductos(); // 👈 sin subscribe
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
    try {
      let imagenUrl = this.nuevo.imagen; // por si quieres seguir permitiendo pegar una URL manual

      if (this.archivoNuevo) {
        imagenUrl = await this.subirImagen(this.archivoNuevo);
      }

      await this.productosService.addProducto({
        ...this.nuevo,
        imagen: imagenUrl,
      });

      // reset
      this.nuevo = {
        nombre: '',
        tipo: '',
        precio: 0,
        imagen: '',
        imagenAlt: '',
        coleccion: '',
      };
      this.archivoNuevo = null;
    } catch (e) {
      console.error('Error creando producto con imagen', e);
    }
  }

  onArchivoNuevoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoNuevo = input.files[0];
    } else {
      this.archivoNuevo = null;
    }
  }

  private async subirImagen(file: File): Promise<string> {
    const filePath = `productos/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url; // URL pública para usar en <img>
  }
}
