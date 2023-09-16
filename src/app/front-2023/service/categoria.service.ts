import { Injectable } from '@angular/core';

import { listadatos } from '../model/datos';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor() {}

  getCategoria(id: number): Categoria {
    const categorias = JSON.parse(localStorage.getItem('categorias')) as Categoria[];
    const categoria = categorias.find((element) => element.idCategoria === id);
    return categoria;
  }

  getCategorias(): listadatos<Categoria> {
    const categorias =
      JSON.parse(localStorage.getItem('categorias')) ?? ([] as Categoria[]);
    return {
      lista: categorias,
      totalDatos: categorias.length,
    };
  }

  delCategoria(id: number): Categoria {
    const categorias = JSON.parse(localStorage.getItem('categorias')) as Categoria[];
    const arrayId = categorias.findIndex((element) => element.idCategoria === id);
    if (arrayId === -1) {
      return null;
    }
    const categoria = categorias[arrayId];
    categorias.splice(arrayId, 1);
    localStorage.setItem('categorias', JSON.stringify(categorias));
    return categoria;
  }

  createCategoria(p: Categoria) {
    const categorias =
      JSON.parse(localStorage.getItem('categorias')) ?? ([] as Categoria[]);
    p.idCategoria = categorias.length + 1;
    categorias.push(p);
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }

  updateCategoria(p: Categoria) {
    const categorias = JSON.parse(localStorage.getItem('categorias')) as Categoria[];
    const arrayId = categorias.findIndex(
      (element) => element.idCategoria === p.idCategoria
    );
    if (arrayId === -1) {
      return false;
    }
    categorias[arrayId] = p;
    localStorage.setItem('categorias', JSON.stringify(categorias));
    return true;
  }
}
