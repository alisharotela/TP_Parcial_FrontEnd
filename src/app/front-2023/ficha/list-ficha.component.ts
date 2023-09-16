import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Ficha } from '../model/ficha.model';
import { FichaService } from '../service/ficha.service';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-ficha',
  templateUrl: './list-ficha.component.html',
  styleUrls: ['./list-ficha.component.css'],
})
export class ListFicha implements OnInit, AfterViewInit, OnDestroy {
  fichas: Ficha[] = [];
  title = 'Fichas';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    private servicioFicha: FichaService,
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
      headerRow: ['Id', 'Nombre', 'Apellido', 'Email', 'Telefono', 'Actions'],
      footerRow: ['Id', 'Nombre', 'Apellido', 'Email', 'Telefono', 'Actions'],
      dataRows: [],
    };

    this.fichas = this.servicioFicha.getFichas().lista;
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

  edit(p: Ficha) {
    this.router.navigate(['/ficha/edit/', p.idFicha]);
  }

  close(e: Ficha) {
    const tryDelete = () => {
      this.servicioFicha.delFicha(e.idFicha);
      this.fichas = this.servicioFicha.getFichas().lista;
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
}
