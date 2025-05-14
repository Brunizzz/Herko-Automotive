import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<string | null>(localStorage.getItem('usuario'));
  usuario$ = this.usuarioSubject.asObservable();

  login(nombre: string) {
    localStorage.setItem('usuario', nombre);
    this.usuarioSubject.next(nombre);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }

  getUsuario(): string | null {
    return this.usuarioSubject.getValue();
  }

  isLoggedIn(): boolean {
    return !!this.getUsuario();
  }
}
