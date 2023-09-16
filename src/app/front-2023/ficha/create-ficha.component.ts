import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { Ficha } from '../model/ficha.model';
import { FichaService } from '../service/ficha.service';
import { PacienteService } from '../service/servicepaciente.service';
import { ReservaService } from '../service/reserva.service';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-ficha',
  templateUrl: 'create-ficha.component.html',
})
export class CreateFicha {
  title = 'Crear Ficha';
  ficha = new Ficha();
  pacientes = [];
  doctores = [];
  reservas = [];
  categorias = [];

  constructor(
    private fichaService: FichaService,
    private pacienteService: PacienteService,
    private reservaService: ReservaService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pacientes = this.pacienteService.getPacientes({
      flag_es_doctor: false,
    }).lista;
    this.doctores = this.pacienteService.getPacientes({
      flag_es_doctor: true,
    }).lista;
    this.reservas = this.reservaService.getReservas().lista;
    this.categorias = this.categoriaService.getCategorias().lista;
  }

  create() {
    console.log(this.ficha);
    if (this.checkFields()) {
      this.fichaService.createFicha(this.ficha);
      swal
        .fire({
          title: 'Actualizado!',
          text: 'La nueva ficha fue agregado exitosamente.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        })
        .then(() => {
          this.router.navigate(['/ficha']);
        });
    }
  }

  checkFields() {
    return true;
  }
}
