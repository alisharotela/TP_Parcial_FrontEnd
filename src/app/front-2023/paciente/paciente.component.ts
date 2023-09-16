import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Paciente } from '../model/paciente';
import { PacienteService } from '../service/servicepaciente.service';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent implements OnInit, AfterViewInit, OnDestroy {
  pacientes: Paciente[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    private servicioPaciente: PacienteService,
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
      headerRow: [
        'Id',
        'Nombre',
        'Apellido',
        'Email',
        'Telefono',
        'Paciente/Doctor',
        'Actions',
      ],
      footerRow: [
        'Id',
        'Nombre',
        'Apellido',
        'Email',
        'Telefono',
        'Paciente/Doctor',
        'Actions',
      ],
      dataRows: [],
    };

    this.pacientes = this.servicioPaciente.getPacientes().lista;
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

  edit(p: Paciente) {
    this.router.navigate(['/paciente/edit/', p.idPersona]);
  }

  close(e: Paciente) {
    const deleteOk = () => {
      const toDelete = this.pacientes.findIndex(
        (x) => x.idPersona == e.idPersona
      );
      this.pacientes.splice(toDelete, 1);

      this.rerender();

      swal.fire({
        title: 'Deleted!',
        text: 'Your register has been deleted.',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false,
      });
    };

    const deleteError = (error) => {
      //first letter in uppercase
      const errorMessage =
        error.error.charAt(0).toUpperCase() + error.error.slice(1) + '.';
      swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false,
      });
    };

    const tryDelete = () => {
      this.servicioPaciente.delPaciente(e.idPersona);
      this.pacientes = this.servicioPaciente.getPacientes().lista;
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
        confirmButtonText: 'Si, borrarlo!',
        cancelButtonText: 'No, cancelar!',
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          tryDelete();
        }
      });
  }
}
