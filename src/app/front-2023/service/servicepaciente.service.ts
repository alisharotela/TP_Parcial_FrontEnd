import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { listadatos } from '../model/datos';
import { Paciente } from '../model/paciente';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  constructor() {}

  getPaciente(id: number): Paciente {
    const pacientes = JSON.parse(
      localStorage.getItem('pacientes')
    ) as Paciente[];
    const paciente = pacientes.find((element) => element.idPersona === id);
    return paciente;
  }
  
  getPacientes(filtros?: GetPacientesProps): listadatos<Paciente> {
    const pacientes =
      JSON.parse(localStorage.getItem('pacientes')) ?? ([] as Paciente[]);
    if (filtros === undefined) {
      return {
        lista: pacientes,
        totalDatos: pacientes.length,
      };
    }
    const { flag_es_doctor } = filtros ?? {};
    const pacientsFiltradas = pacientes.filter(
      (element: Paciente) => element.flag_es_doctor === flag_es_doctor
    );
    return {
      lista: pacientsFiltradas,
      totalDatos: pacientes.length,
    };
  }

  delPaciente(id: number): Paciente {
    const pacientes = JSON.parse(
      localStorage.getItem('pacientes')
    ) as Paciente[];
    const arrayId = pacientes.findIndex((element) => element.idPersona === id);
    if (arrayId === -1) {
      return null;
    }
    const paciente = pacientes[arrayId];
    pacientes.splice(arrayId, 1);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    return paciente;
  }

  createPaciente(p: Paciente) {
    const pacientes =
      JSON.parse(localStorage.getItem('pacientes')) ?? ([] as Paciente[]);
    p.idPersona = pacientes.length + 1;
    pacientes.push(p);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  updatePaciente(p: Paciente) {
    const pacientes = JSON.parse(
      localStorage.getItem('pacientes')
    ) as Paciente[];
    const arrayId = pacientes.findIndex(
      (element) => element.idPersona === p.idPersona
    );
    if (arrayId === -1) {
      return false;
    }
    pacientes[arrayId] = p;
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    return true;
  }
}


type GetPacientesProps = {
  flag_es_doctor?: boolean;
};