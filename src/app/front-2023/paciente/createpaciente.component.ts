import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { Paciente } from '../model/paciente';
import { PacienteService } from '../service/servicepaciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: 'createpaciente.component.html',
})
export class CreatePaciente {
  paciente: Paciente = new Paciente();
  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  createPaciente() {
    console.log(this.paciente);
    if (this.checkFields()) {
      this.pacienteService.createPaciente(this.paciente);
      swal
        .fire({
          title: 'Actualizado!',
          text: 'La nueva persona fue agregada exitosamente.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        })
        .then(() => {
          this.router.navigate(['/paciente']);
        });
    }
  }

  checkFields() {
    return true;
  }
}
