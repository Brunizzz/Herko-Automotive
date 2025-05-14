import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent {
  displayedColumns: string[] = ['id_articulo', 'descripcion', 'linea', 'existencias']; // Cambiar clave a id_articulo
  filteredProducts: any[] = [];
  searchText = ''; // Texto de búsqueda

  constructor(
    public dialogRef: MatDialogRef<ProductSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { products: any[] }
  ) {
    this.filteredProducts = data.products || [];
  }

  applyFilter(): void {
    const lowerSearch = this.searchText.toLowerCase();
    this.filteredProducts = this.data.products.filter((product) =>
      Object.values(product)
        .join(' ')
        .toLowerCase()
        .includes(lowerSearch)
    );
  }

  selectProduct(product: any): void {
    this.dialogRef.close(product); // Devolver el producto completo
  }
}
