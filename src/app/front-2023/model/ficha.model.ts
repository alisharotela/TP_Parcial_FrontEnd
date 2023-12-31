import { Categoria } from './categoria.model';
import { Paciente } from './paciente';
import { Reserva } from './reserva';

export class Ficha {
  idFicha!: number;
  paciente!: Paciente;
  doctor!: Paciente;
  fecha!: string;
  motivo_consulta!: string;
  diagnostico!: string;
  categoria!: Categoria;
  reserva!: Reserva;
}

export class FiltroFicha {
  idFicha?: number;
  paciente?: Paciente;
  doctor?: Paciente;
  fechaInicio?: string;
  fechaFin?: string;
  motivo_consulta?: string;
  diagnostico?: string;
  categoria?: Categoria;
  reserva?: Reserva;
}
