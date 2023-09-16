import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.css'],
})
export class ListCategoria implements OnInit, AfterViewInit, OnDestroy {
  title = 'Listado de Categorias';
  categorias: Categoria[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    private servicioCategoria: CategoriaService,
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
      headerRow: ['Id', 'Descripcion', 'Actions'],
      footerRow: ['Id', 'Descripcion', 'Actions'],
      dataRows: [],
    };

    this.categorias = this.servicioCategoria.getCategorias().lista;
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

  edit(p: Categoria) {
    this.router.navigate(['/categoria/edit/', p.idCategoria]);
  }

  close(e: Categoria) {
    const tryDelete = () => {
      this.servicioCategoria.delCategoria(e.idCategoria);
      this.categorias = this.servicioCategoria.getCategorias().lista;
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
