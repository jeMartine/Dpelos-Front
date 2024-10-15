export interface Page<T> {
  content: T[];   // Elementos de la pagina
  totalElements: number;  // Total de elementos en todas las paginas
  totalPages: number;   // Total de paginas
  size: number;   // Tamaño de la pagina 
  number: number;   //Pagina actual
}