import { Paciente } from './paciente';

export class Reserva {
  idReserva!: number;
  fecha!: Date;
  hora!: string;
  paciente!: Paciente;
  estado!: string;
}
