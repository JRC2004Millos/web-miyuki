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
  archivoNuevoPrincipal: File | null = null;
  archivoNuevoAlt: File | null = null;
  archivoEditarPrincipal: File | null = null;
  archivoEditarAlt: File | null = null;
  previewNuevoPrincipal: string | null = null;
  previewNuevoAlt: string | null = null;
  tiposExistentes: string[] = [];
  coleccionesExistentes: string[] = [];
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
    this.productos$ = this.productosService.getProductos();

    this.productos$.subscribe((productos) => {
      this.tiposExistentes = Array.from(
        new Set(productos.map((p) => p.tipo).filter(Boolean))
      );

      this.coleccionesExistentes = Array.from(
        new Set(productos.map((p) => p.coleccion).filter(Boolean))
      );
    });
  }

  seleccionarEditar(p: Producto) {
    this.editando = { ...p };
    this.archivoEditarPrincipal = null;
    this.archivoEditarAlt = null;
  }

  cancelarEditar() {
    this.editando = null;
  }

  async guardarEdicion() {
    try {
      if (!this.editando || !this.editando.id) return;

      let imagenUrl = this.editando.imagen;
      let imagenAltUrl = this.editando.imagenAlt;

      // Si sube una nueva principal, se reemplaza
      if (this.archivoEditarPrincipal) {
        imagenUrl = await this.subirImagen(this.archivoEditarPrincipal);

        // Si NO sube alt nueva, por defecto igualamos a principal
        if (!this.archivoEditarAlt) {
          imagenAltUrl = imagenUrl;
        }
      }

      // Si sube una nueva alt, se reemplaza (independiente)
      if (this.archivoEditarAlt) {
        imagenAltUrl = await this.subirImagen(this.archivoEditarAlt);
      }

      await this.productosService.updateProducto(this.editando.id, {
        nombre: this.editando.nombre,
        tipo: this.editando.tipo,
        precio: this.editando.precio,
        coleccion: this.editando.coleccion,
        imagen: imagenUrl,
        imagenAlt: imagenAltUrl,
      });

      this.editando = null;
      this.archivoEditarPrincipal = null;
      this.archivoEditarAlt = null;
    } catch (e) {
      console.error('Error guardando edición', e);
    }
  }

  async eliminar(p: Producto) {
    if (!confirm(`¿Eliminar ${p.nombre}?`)) return;
    if (p.id) await this.productosService.deleteProducto(p.id);
  }

  async crear() {
    try {
      if (!this.archivoNuevoPrincipal) {
        alert('Debes subir la imagen principal');
        return;
      }

      const imagenUrl = await this.subirImagen(this.archivoNuevoPrincipal);

      // ALT opcional: si no hay, usar la principal
      const imagenAltUrl = this.archivoNuevoAlt
        ? await this.subirImagen(this.archivoNuevoAlt)
        : imagenUrl;

      await this.productosService.addProducto({
        ...this.nuevo,
        imagen: imagenUrl,
        imagenAlt: imagenAltUrl,
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
      this.archivoNuevoPrincipal = null;
      this.archivoNuevoAlt = null;
      this.previewNuevoPrincipal = null;
      this.previewNuevoAlt = null;
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

  onArchivoNuevoPrincipalChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.archivoNuevoPrincipal = file;

    if (file) {
      this.previewNuevoPrincipal = URL.createObjectURL(file);

      // Si aún no hay alt seleccionada, que la alt muestre la principal
      if (!this.archivoNuevoAlt) {
        this.previewNuevoAlt = this.previewNuevoPrincipal;
      }
    }
  }

  onArchivoNuevoAltChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.archivoNuevoAlt = file;
    this.previewNuevoAlt = file
      ? URL.createObjectURL(file)
      : this.previewNuevoPrincipal;
  }

  onArchivoEditarPrincipalChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivoEditarPrincipal = input.files?.[0] ?? null;
  }

  onArchivoEditarAltChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivoEditarAlt = input.files?.[0] ?? null;
  }
}
