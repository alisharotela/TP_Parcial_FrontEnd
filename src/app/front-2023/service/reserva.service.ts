import { Injectable } from '@angular/core';

import { listadatos } from '../model/datos';
import { Reserva } from '../model/reserva';

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

  getReservas(filtros?: GetReservaProps): listadatos<Reserva> {
    const { estado = 'Activa' } = filtros ?? {};
    const reservas: Reserva[] =
      JSON.parse(localStorage.getItem('reservas')) ?? [];
    const reservasFiltradas = reservas.filter(
      (element: Reserva) => element.estado === estado
    );
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
