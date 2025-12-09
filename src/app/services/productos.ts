// src/app/services/productos.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  docData,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

export interface Producto {
  id?: string; // Firestore nos dará este id
  nombre: string;
  tipo: string;
  imagen: string;
  imagenAlt: string;
  coleccion: string;
  precio: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private colRef;

  constructor(private firestore: Firestore) {
    // Referencia a la colección "productos"
    this.colRef = collection(this.firestore, 'productos');
  }

  // Obtener todos los productos como stream (se actualiza en tiempo real)
  getProductos(): Observable<Producto[]> {
    return collectionData(this.colRef, { idField: 'id' }) as Observable<
      Producto[]
    >;
  }

  getProducto(id: string): Observable<Producto | undefined> {
    const ref = doc(this.firestore, `productos/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Producto | undefined>;
  }

  // Crear un producto nuevo
  addProducto(prod: Producto) {
    const { id, ...data } = prod; // ignorar id si viene
    return addDoc(this.colRef, data);
  }

  // Actualizar un producto existente
  updateProducto(id: string, data: Partial<Producto>) {
    const ref = doc(this.firestore, `productos/${id}`);
    return updateDoc(ref, data);
  }

  // Borrar un producto
  deleteProducto(id: string) {
    const ref = doc(this.firestore, `productos/${id}`);
    return deleteDoc(ref);
  }
}
