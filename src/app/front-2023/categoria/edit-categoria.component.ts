import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: 'edit-categoria.component.html',
})
export class EditCategoria implements OnInit {
  categoria: Categoria = new Categoria();
  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id']; // (+) converts string 'id' to a number
      this.categoria.idCategoria = id;
      this.categoria = this.categoriaService.getCategoria(id);
    });
  }

  save() {
    console.log(this.categoria);
    if (this.checkFields()) {
      const res = this.categoriaService.updateCategoria(this.categoria);
      if (res)
        swal
          .fire({
            title: 'Actualizado!',
            text: 'La nueva categoría fue actualizada exitosamente.',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-success',
            },
            buttonsStyling: false,
          })
          .then(() => {
            this.router.navigate(['/categoria']);
          });
      else {
        let message = 'La categoría no pudo ser actualizada. \n';
        swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
      }
    }
  }

  checkFields() {
    return true;
  }
}
