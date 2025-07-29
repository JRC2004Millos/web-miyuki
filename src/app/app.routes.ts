import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Catalogo } from './catalogo/catalogo';
import { Producto } from './producto/producto';
import { Contacto } from './contacto/contacto';
import { Error } from './error/error';
import { ColeccionesMenu } from './colecciones-menu/colecciones-menu';
import { ColeccionesDetalle } from './colecciones-detalle/colecciones-detalle';
import { EnConstruccion } from './en-construccion/en-construccion';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'producto/:id', component: Producto },
  { path: 'contacto', component: Contacto },
  { path: 'colecciones', component: ColeccionesMenu },
  { path: 'colecciones/:nombre', component: ColeccionesDetalle },
  { path: 'construccion', component: EnConstruccion },
  // Ruta de error
  { path: 'error', component: Error },
  // Ruta comodín para 404
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
