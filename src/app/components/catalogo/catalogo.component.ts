import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, style, transition, animate } from '@angular/animations';

interface Auto {
  id: number;
  marcaId: number;
  modeloId: number;
  modeloNombre: string;
  ano: number;
  km: number;
  nombre: string;
  parte: string;
  imagen: string;
}

interface Marca {
  id: number;
  nombre: string;
}

interface Modelo {
  id_modelo: number;
  nombre: string;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CatalogoComponent implements OnInit {
  marcas: Marca[] = [
    { id: 1, nombre: 'Toyota' },
    { id: 2, nombre: 'Honda' },
    { id: 3, nombre: 'Ford' },
  ];

  modelos: Modelo[] = [];
  anos: { ano: number }[] = [];
  kilometrajes: { km: number }[] = [];

  allAutos: Auto[] = [
    {
      id: 1,
      marcaId: 1,
      modeloId: 1,
      modeloNombre: 'Corolla',
      ano: 2020,
      km: 50000,
      nombre: 'Toyota Corolla 2020',
      parte: 'ABC123',
      imagen: 'assets/autos/corolla.jpg',
    },
    {
      id: 2,
      marcaId: 1,
      modeloId: 2,
      modeloNombre: 'Hilux',
      ano: 2021,
      km: 30000,
      nombre: 'Toyota Hilux 2021',
      parte: 'HILX456',
      imagen: 'assets/autos/hilux.jpg',
    },
    {
      id: 3,
      marcaId: 2,
      modeloId: 3,
      modeloNombre: 'Civic',
      ano: 2019,
      km: 40000,
      nombre: 'Honda Civic 2019',
      parte: 'CIV789',
      imagen: 'assets/autos/civic.jpg',
    },
    {
      id: 4,
      marcaId: 3,
      modeloId: 4,
      modeloNombre: 'Focus',
      ano: 2020,
      km: 60000,
      nombre: 'Ford Focus 2020',
      parte: 'FOC321',
      imagen: 'assets/autos/focus.jpg',
    },
    {
      id: 5,
      marcaId: 2,
      modeloId: 5,
      modeloNombre: 'CR-V',
      ano: 2022,
      km: 10000,
      nombre: 'Honda CR-V 2022',
      parte: 'CRV654',
      imagen: 'assets/autos/crv.jpg',
    },
  ];

  productos: Auto[] = [];

  searchTerm: string = '';
  selectedMarca: number | null = null;
  selectedModelo: number | null = null;
  selectedAno: number | null = null;
  selectedKilometraje: number | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.resetFilters();
  }

  onMarcaChange(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    this.selectedMarca = id;
    this.selectedModelo = null;
    this.selectedAno = null;
    this.selectedKilometraje = null;

    this.updateModelos();
    this.filterProductos();
  }

  onModeloChange(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    this.selectedModelo = id;
    this.selectedAno = null;
    this.selectedKilometraje = null;

    this.updateAnos();
    this.filterProductos();
  }

  onAnoChange(event: Event) {
    const ano = Number((event.target as HTMLSelectElement).value);
    this.selectedAno = ano;
    this.selectedKilometraje = null;

    this.updateKilometrajes();
    this.filterProductos();
  }

  onKilometrajeChange(event: Event) {
    const km = Number((event.target as HTMLSelectElement).value);
    this.selectedKilometraje = km;
    this.filterProductos();
  }

  buscarProductosGeneral() {
    if (!this.searchTerm.trim()) {
      this.productos = [...this.allAutos];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.productos = this.allAutos.filter(a =>
      a.nombre.toLowerCase().includes(term) ||
      a.parte.toLowerCase().includes(term) ||
      a.modeloNombre.toLowerCase().includes(term)
    );
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedMarca = null;
    this.selectedModelo = null;
    this.selectedAno = null;
    this.selectedKilometraje = null;
    this.modelos = [];
    this.anos = [];
    this.kilometrajes = [];
    this.productos = [...this.allAutos];
  }

  verDetalles(producto: Auto) {
    alert(`Ver detalles de: ${producto.nombre}\nParte: ${producto.parte}\nAño: ${producto.ano}\nKilometraje: ${producto.km} km`);
  }

  private updateModelos() {
    if (!this.selectedMarca) return;
    
    const modelosFiltrados = this.allAutos.filter(a => a.marcaId === this.selectedMarca);
    const modeloIds = [...new Set(modelosFiltrados.map(a => a.modeloId))];
    this.modelos = modeloIds.map(id => {
      const auto = modelosFiltrados.find(a => a.modeloId === id);
      return {
        id_modelo: id,
        nombre: auto?.modeloNombre || 'Modelo'
      };
    });
  }

  private updateAnos() {
    if (!this.selectedMarca || !this.selectedModelo) return;
    
    const anosFiltrados = this.allAutos.filter(
      a => a.marcaId === this.selectedMarca && a.modeloId === this.selectedModelo
    );
    const anoUnicos = [...new Set(anosFiltrados.map(a => a.ano))];
    this.anos = anoUnicos.map(ano => ({ ano }));
  }

  private updateKilometrajes() {
    if (!this.selectedMarca || !this.selectedModelo || !this.selectedAno) return;
    
    const kmFiltrados = this.allAutos.filter(
      a => a.marcaId === this.selectedMarca &&
           a.modeloId === this.selectedModelo &&
           a.ano === this.selectedAno
    );
    const kmUnicos = [...new Set(kmFiltrados.map(a => a.km))];
    this.kilometrajes = kmUnicos.map(km => ({ km }));
  }

  private filterProductos() {
    let filtered = [...this.allAutos];
    
    if (this.selectedMarca) {
      filtered = filtered.filter(a => a.marcaId === this.selectedMarca);
    }
    if (this.selectedModelo) {
      filtered = filtered.filter(a => a.modeloId === this.selectedModelo);
    }
    if (this.selectedAno) {
      filtered = filtered.filter(a => a.ano === this.selectedAno);
    }
    if (this.selectedKilometraje) {
      filtered = filtered.filter(a => a.km === this.selectedKilometraje);
    }
    
    this.productos = filtered;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const elements = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
    elements.forEach((element: HTMLElement) => {
      if (this.isElementInViewport(element)) {
        element.classList.add('visible');
      }
    });
  }

  private isElementInViewport(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 100;
  }
}