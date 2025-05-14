import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Registro {
  nombre: string;
  apellido: string;
  correo: string;
  descripcion: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registros: Registro[] = [];
  editIndex: number | null = null;
  edited: Registro = { nombre: '', apellido: '', correo: '', descripcion: '' };

  ngOnInit(): void {
  const data = localStorage.getItem('formularioContacto');
  if (data) {
    const parsed = JSON.parse(data);
    this.registros = Array.isArray(parsed) ? parsed : [parsed];
  } else {
    this.registros = [];
  }
  }
  
  eliminar(index: number): void {
    this.registros.splice(index, 1);
    this.actualizarStorage();
  }

  editar(index: number): void {
    this.editIndex = index;
    this.edited = { ...this.registros[index] };
  }

  guardarEdicion(): void {
    if (this.editIndex !== null) {
      this.registros[this.editIndex] = { ...this.edited };
      this.actualizarStorage();
      this.editIndex = null;
    }
  }

  cancelarEdicion(): void {
    this.editIndex = null;
  }

  private actualizarStorage(): void {
    localStorage.setItem('formularioContacto', JSON.stringify(this.registros));
  }
}
