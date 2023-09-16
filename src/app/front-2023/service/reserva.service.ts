import { Injectable } from '@angular/core';

import { listadatos } from '../model/datos';
import { FiltroReserva, Reserva } from '../model/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  constructor() {}

  getReserva(id: number): Reserva {
    const reservas = JSON.parse(localStorage.getItem('reservas')) as Reserva[];
    const reserva = reservas.find((element) => element.idReserva === id);
    return reserva;
  }

  getReservas(filtros?: FiltroReserva): listadatos<Reserva> {
    const reservas: Reserva[] =
      JSON.parse(localStorage.getItem('reservas')) ?? [];

    if (filtros === undefined) {
      return {
        lista: reservas,
        totalDatos: reservas.length,
      };
    }

    let reservasFiltradas = reservas;
    for (const key in filtros) {
      if (!filtros[key]) continue;
      if (key == 'fechaInicio') {
        reservasFiltradas = reservasFiltradas.filter(
          (element: Reserva) => element.fecha >= filtros[key]
        );
        continue;
      }
      if (key == 'fechaFin') {
        reservasFiltradas = reservasFiltradas.filter(
          (element: Reserva) => element.fecha <= filtros[key]
        );
        continue;
      }
      reservasFiltradas = reservasFiltradas.filter(
        (element: Reserva) => element[key] === filtros[key]
      );
    }

    return {
      lista: reservasFiltradas,
      totalDatos: reservas.length,
    };
  }

  delReserva(id: number): Reserva {
    const reservas = JSON.parse(localStorage.getItem('reservas')) as Reserva[];
    const arrayId = reservas.findIndex((element) => element.idReserva === id);
    if (arrayId === -1) {
      return null;
    }
    const reserva = reservas[arrayId];
    reservas.splice(arrayId, 1);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    return reserva;
  }

  cancelarReserva(idReserva: number) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) as Reserva[];
    const arrayId = reservas.findIndex(
      (element) => element.idReserva === idReserva
    );
    if (arrayId === -1) {
      return null;
    }
    const reserva = reservas[arrayId];
    reserva.estado = 'Cancelada';
    reservas[arrayId] = reserva;
    localStorage.setItem('reservas', JSON.stringify(reservas));
    return reserva;
  }

  createReserva(p: Reserva) {
    const reservas =
      JSON.parse(localStorage.getItem('reservas')) ?? ([] as Reserva[]);
    p.idReserva = reservas.length + 1;
    p.estado = 'Activa';
    reservas.push(p);
    localStorage.setItem('reservas', JSON.stringify(reservas));
  }

  updateReserva(p: Reserva) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) as Reserva[];
    const arrayId = reservas.findIndex(
      (element) => element.idReserva === p.idReserva
    );
    if (arrayId === -1) {
      return false;
    }
    reservas[arrayId] = p;
    localStorage.setItem('reservas', JSON.stringify(reservas));
    return true;
  }
}

type GetReservaProps = {
  estado?: 'Activa' | 'Cancelada' | 'Finalizada';
};
