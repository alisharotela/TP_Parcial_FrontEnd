import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Reserva } from '../model/reserva';
import { ReservaService } from '../service/reserva.service';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { PacienteService } from '../service/servicepaciente.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-reserva',
  templateUrl: './list-reserva.component.html',
  styleUrls: ['./list-reserva.component.css'],
})
export class ListReserva implements OnInit, AfterViewInit, OnDestroy {
  title = 'Reservas';
  reservas: Reserva[] = [];
  doctores = [];
  pacientes = [];
  doctor = null;
  paciente = null;
  fechaInicio = null;
  fechaFin = null;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    private servicioReserva: ReservaService,
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'All'],
      ],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search records',
      },
    };
    this.dataTable = {
      headerRow: ['Fecha', 'Hora', 'Doctor', 'Paciente', 'Actions'],
      footerRow: ['Fecha', 'Hora', 'Doctor', 'Paciente', 'Actions'],
      dataRows: [],
    };

    this.getReservasDelDia();

    this.doctores = this.pacienteService.getPacientes({
      flag_es_doctor: true,
    }).lista;

    this.pacientes = this.pacienteService.getPacientes({
      flag_es_doctor: false,
    }).lista;
  }

  public dataTable: DataTable;

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  edit(p: Reserva) {
    this.router.navigate(['/reserva/edit/', p.idReserva]);
  }

  close(e: Reserva) {
    const tryDelete = () => {
      this.servicioReserva.cancelarReserva(e.idReserva);
      this.getReservasDelDia();
    };

    swal
      .fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción!',
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        confirmButtonText: 'Si, cancelar!',
        cancelButtonText: 'No, cancelar!',
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          tryDelete();
        }
      });
  }

  filtrar() {
    this.reservas = this.servicioReserva.getReservas({
      doctor: this.doctor,
      paciente: this.paciente,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
    }).lista;
  }

  limpiar() {
    this.doctor = null;
    this.paciente = null;
    this.fechaInicio = null;
    this.fechaFin = null;
    this.getReservasDelDia();
  }

  getPersonaName(id: number) {
    const persona = this.pacienteService.getPaciente(id);
    return persona.nombre + ' ' + persona.apellido;
  }

  getReservasDelDia() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // El mes es 0-indexado, por lo que sumamos 1 y formateamos.
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    this.reservas = this.servicioReserva.getReservas({
      fecha: formattedDate,
    }).lista;
  }
}
