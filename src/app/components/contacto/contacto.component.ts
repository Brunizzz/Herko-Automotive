import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  nombre = '';
  apellido = '';
  correo = '';
  descripcion = '';

  guardarFormulario() {
    const datos = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      descripcion: this.descripcion
    };

    localStorage.setItem('formularioContacto', JSON.stringify(datos));
    alert('¡Información guardada correctamente!');
    
    // Limpiar formulario
    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.descripcion = '';
  }
}
