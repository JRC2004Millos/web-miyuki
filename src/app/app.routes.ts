import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Catalogo } from './catalogo/catalogo';
import { Producto } from './producto/producto';
import { Contacto } from './contacto/contacto';
import { Error } from './error/error';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'producto/:id', component: Producto },
  { path: 'contacto', component: Contacto },
  // Ruta de error
  { path: 'error', component: Error },
  // Ruta comodín para 404
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
