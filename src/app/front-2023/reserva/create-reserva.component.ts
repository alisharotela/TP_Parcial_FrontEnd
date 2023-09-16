import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { Reserva } from '../model/reserva';
import { ReservaService } from '../service/reserva.service';
import { PacienteService } from '../service/servicepaciente.service';

@Component({
  selector: 'app-reserva',
  templateUrl: 'create-reserva.component.html',
})
export class CreateReserva {
  reserva = new Reserva();
  pacientes = [];
  doctores = [];
  //   09:00 a 10:00, 10:00 a 11:00,
  // etc y así hasta las 20:00 a 21:00
  horas = [];
  constructor(
    private reservaService: ReservaService,
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pacientes = this.pacienteService.getPacientes({
      flag_es_doctor: false,
    }).lista;
    this.doctores = this.pacienteService.getPacientes({
      flag_es_doctor: true,
    }).lista;
    for (let i = 9; i < 21; i++) {
      this.horas.push(i + ':00 a ' + (i + 1) + ':00');
    }
  }

  createReserva() {
    console.log(this.reserva);
    if (this.checkFields()) {
      this.reservaService.createReserva(this.reserva);
      swal
        .fire({
          title: 'Actualizado!',
          text: 'La nueva reserva fue agregado exitosamente.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        })
        .then(() => {
          this.router.navigate(['/reserva']);
        });
    }
  }

  checkFields() {
    return true;
  }
}
