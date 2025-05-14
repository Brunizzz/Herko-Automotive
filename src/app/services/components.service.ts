import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  private baseUrl = 'http://localhost:3000'; // Asegúrate de usar la URL correcta

  constructor(private http: HttpClient) {}

  // Obtiene productos paginados
  getProductosPorPagina(page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/productos?page=${page}`);
  }

  // Obtiene todas las marcas
  getMarca(): Observable<{ id_marca: number; nombre: string }[]> {
    return this.http.get<{ id_marca: number; nombre: string }[]>(`${this.baseUrl}/marca`);
  }

  // Obtiene los modelos filtrados por marca
  getModeloByMarca(marcaId: number): Observable<{ id_modelo: number; nombre: string }[]> {
    return this.http.get<{ id_modelo: number; nombre: string }[]>(`${this.baseUrl}/modelo/${marcaId}`);
  }

  // Obtiene los años filtrados por modelo
  getAnoByModelo(marcaId: number, modeloId: number): Observable<{ ano: number }[]> {
    return this.http.get<{ ano: number }[]>(`${this.baseUrl}/ano/${marcaId}/${modeloId}`);
  }

  // Obtiene los litros filtrados por año
  getLitrosByAno(marcaId: number, modeloId: number, ano: number): Observable<{ litros: number }[]> {
    return this.http.get<{ litros: number }[]>(`${this.baseUrl}/litros/${marcaId}/${modeloId}/${ano}`);
  }

  // Obtiene las partes filtradas por marca, modelo, año y litros
  getPartesFiltradas(marcaId: number, modeloId: number, ano: number, litros: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/partes/${marcaId}/${modeloId}/${ano}/${litros}`);
  }

  buscarProductosPorTermino(termino: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buscar?termino=${encodeURIComponent(termino)}`);
  }
}