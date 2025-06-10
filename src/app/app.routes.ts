import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Catalogo } from './catalogo/catalogo';
import { Producto } from './producto/producto';
import { Contacto } from './contacto/contacto';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'producto/:id', component: Producto },
  { path: 'contacto', component: Contacto }
];

