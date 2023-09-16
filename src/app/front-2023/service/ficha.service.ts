import { Injectable } from '@angular/core';

import { listadatos } from '../model/datos';
import { Ficha, FiltroFicha } from '../model/ficha.model';

@Injectable({
  providedIn: 'root',
})
export class FichaService {
  constructor() {}

  getFicha(id: number): Ficha {
    const fichas = JSON.parse(localStorage.getItem('fichas')) as Ficha[];
    const ficha = fichas.find((element) => element.idFicha === id);
    return ficha;
  }

  getFichas(filtros?: FiltroFicha): listadatos<Ficha> {
    const fichas =
      JSON.parse(localStorage.getItem('fichas')) ?? ([] as Ficha[]);
      
    if (filtros === undefined) {
      return {
        lista: fichas,
        totalDatos: fichas.length,
      };
    }

    let fichasFiltradas = fichas;
    for (const key in filtros) {
      if (!filtros[key]) continue;
      if (key == 'fechaInicio') {
        fichasFiltradas = fichasFiltradas.filter(
          (element: Ficha) => element.fecha >= filtros[key]
        );
        continue;
      }
      if (key == 'fechaFin') {
        fichasFiltradas = fichasFiltradas.filter(
          (element: Ficha) => element.fecha <= filtros[key]
        );
        continue;
      }
      fichasFiltradas = fichasFiltradas.filter(
        (element: Ficha) => element[key] === filtros[key]
      );
    }

    return {
      lista: fichasFiltradas,
      totalDatos: fichas.length,
    };
  }

  delFicha(id: number): Ficha {
    const fichas = JSON.parse(localStorage.getItem('fichas')) as Ficha[];
    const arrayId = fichas.findIndex((element) => element.idFicha === id);
    if (arrayId === -1) {
      return null;
    }
    const ficha = fichas[arrayId];
    fichas.splice(arrayId, 1);
    localStorage.setItem('fichas', JSON.stringify(fichas));
    return ficha;
  }

  createFicha(p: Ficha) {
    const fichas =
      JSON.parse(localStorage.getItem('fichas')) ?? ([] as Ficha[]);
    p.idFicha = fichas.length + 1;
    fichas.push(p);
    localStorage.setItem('fichas', JSON.stringify(fichas));
  }

  updateFicha(p: Ficha) {
    const fichas = JSON.parse(localStorage.getItem('fichas')) as Ficha[];
    const arrayId = fichas.findIndex(
      (element) => element.idFicha === p.idFicha
    );
    if (arrayId === -1) {
      return false;
    }
    fichas[arrayId] = p;
    localStorage.setItem('fichas', JSON.stringify(fichas));
    return true;
  }
}
