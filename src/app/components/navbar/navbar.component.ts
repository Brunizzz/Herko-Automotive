import { Component, HostListener} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent {
  lineWidth: number = 80; // Ancho inicial de la línea (80%)
  usuario: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.usuario$.subscribe(u => this.usuario = u);
  }

  isLoggedIn(): boolean {
    return !!this.usuario;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // Escucha el evento de scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Calcula el nuevo ancho de la línea basado en el scroll
    const scrollY = window.scrollY || window.pageYOffset;
    const newWidth = 80 - (scrollY / 10); // Ajusta la división para controlar la velocidad del cambio

    // Limita el ancho entre 20% y 80%
    this.lineWidth = Math.max(20, Math.min(80, newWidth));
  }
}