import { Paciente } from './paciente';

export class Reserva {
  idReserva!: number;
  fecha!: Date;
  hora!: string;
  paciente!: Paciente;
  doctor!: Paciente;
  estado!: string;
}

export class FiltroReserva {
  idReserva?: number;
  fechaInicio?: Date;
  fechaFin?: Date;
  fecha?: string;
  hora?: string;
  paciente?: Paciente;
  doctor?: Paciente;
  estado?: string;
}
