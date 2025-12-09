import { Routes } from '@angular/router';
import { ProductoComponent } from './producto/producto';
import { Home } from './home/home';
import { Catalogo } from './catalogo/catalogo';
import { Contacto } from './contacto/contacto';
import { Error } from './error/error';
import { ColeccionesMenu } from './colecciones-menu/colecciones-menu';
import { ColeccionesDetalle } from './colecciones-detalle/colecciones-detalle';
import { EnConstruccion } from './en-construccion/en-construccion';
import { Login } from './login/login/login';
import { Admin } from './admin/admin/admin';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'contacto', component: Contacto },
  { path: 'colecciones', component: ColeccionesMenu },
  { path: 'colecciones/:nombre', component: ColeccionesDetalle },
  { path: 'construccion', component: EnConstruccion },
  { path: 'login', component: Login },
  { path: 'admin', component: Admin, canActivate: [authGuard] },
  // Ruta de error
  { path: 'error', component: Error },
  // Ruta comodín para 404
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
