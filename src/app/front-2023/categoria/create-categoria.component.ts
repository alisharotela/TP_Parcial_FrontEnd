import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: 'create-categoria.component.html',
})
export class CreateCategoria {
  categoria = new Categoria();
  title: 'Crear Categoria';

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  create() {
    console.log(this.categoria);
    if (this.checkFields()) {
      this.categoriaService.createCategoria(this.categoria);
      swal
        .fire({
          title: 'Actualizado!',
          text: 'La nueva categoria fue agregada exitosamente.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        })
        .then(() => {
          this.router.navigate(['/categoria']);
        });
    }
  }

  checkFields() {
    return true;
  }
}
