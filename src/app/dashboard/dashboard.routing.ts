import { Routes } from '@angular/router';
import { CreatePaciente } from '../front-2023/paciente/createpaciente.component';
import { EditPaciente } from '../front-2023/paciente/editpaciente.component';
import { PacienteComponent } from '../front-2023/paciente/paciente.component';

import { DashboardComponent } from './dashboard.component';
import { ListReserva } from '../front-2023/reserva/list-reserva.component';
import { CreateReserva } from '../front-2023/reserva/create-reserva.component';
import { ListCategoria } from '../front-2023/categoria/list-categoria.component';
import { CreateCategoria } from '../front-2023/categoria/create-categoria.component';
import { EditCategoria } from '../front-2023/categoria/edit-categoria.component';
import { ListFicha } from '../front-2023/ficha/list-ficha.component';
import { CreateFicha } from '../front-2023/ficha/create-ficha.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'paciente',
        component: PacienteComponent,
      },
      {
        path: 'paciente/create',
        component: CreatePaciente,
      },
      {
        path: 'paciente/edit/:id',
        component: EditPaciente,
      },
      {
        path: 'reserva',
        component: ListReserva,
      },
      {
        path: 'reserva/create',
        component: CreateReserva,
      },
      {
        path: 'categoria',
        component: ListCategoria,
      },
      {
        path: 'categoria/create',
        component: CreateCategoria,
      },
      {
        path: 'categoria/edit/:id',
        component: EditCategoria,
      },
      {
        path: 'ficha',
        component: ListFicha,
      },
      {
        path: 'ficha/create',
        component: CreateFicha,
      },
    ],
  },
];
