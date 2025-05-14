import { Routes, provideRouter, withRouterConfig } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { NuestrosServiciosComponent } from './components/nuestros-servicios/nuestros-servicios.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'buscador', component: CatalogoComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'quienes-somos', component: QuienesSomosComponent },
    { path: 'servicios', component: NuestrosServiciosComponent },
    { path: '', redirectTo: '/buscador', pathMatch: 'full' },
    { path: '**', redirectTo: '/buscador' },
];

