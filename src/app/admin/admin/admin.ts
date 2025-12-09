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
import { firstValueFrom, Observable } from 'rxjs';

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

  private async urlToFile(url: string, filename: string): Promise<File> {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  }

  private async migrarImagen(url: string, nombre: string): Promise<string> {
    const file = await this.urlToFile(url, nombre + '.jpg');
    return await this.subirImagen(file);
  }

  async migrarImagenes() {
    console.log('Iniciando migración de imágenes...');

    const productos = await firstValueFrom(this.productos$);

    for (const p of productos) {
      try {
        // Migrar imagen principal
        if (p.imagen.startsWith('assets')) {
          console.log('Migrando imagen:', p.nombre);
          const nuevaImagen = await this.migrarImagen(p.imagen, p.nombre);
          await this.productosService.updateProducto(p.id!, {
            imagen: nuevaImagen,
          });
        }

        // Migrar imagen alternativa
        if (p.imagenAlt && p.imagenAlt.startsWith('assets')) {
          console.log('Migrando imagen ALT:', p.nombre);
          const nuevaAlt = await this.migrarImagen(
            p.imagenAlt,
            p.nombre + '-alt'
          );
          await this.productosService.updateProducto(p.id!, {
            imagenAlt: nuevaAlt,
          });
        }
      } catch (e) {
        console.error('Error migrando el producto', p.nombre, e);
      }
    }

    console.log('Migración completa ✔');
  }
}
