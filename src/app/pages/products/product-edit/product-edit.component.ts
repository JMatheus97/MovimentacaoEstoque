import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductsService } from '../shared/products.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../shared/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {

  public formProduct: FormGroup;

  constructor(
                  private fb: FormBuilder,
                  private productService: ProductsService,
                  private activedRoute: ActivatedRoute,
                   private toast: ToastrService,
                   private router: Router){
    this.formProduct = this.buildFormProduct();
  }


  ngOnInit():void {
      const productId = Number(this.activedRoute.snapshot.paramMap.get('id'));

      this.productService.listById(productId).subscribe(
        res => {
          this.formProduct.patchValue(res)
        },
        err=> {
          this.toast.error(err);
        }
      )
  }

  public buildFormProduct(): FormGroup {
    return this.fb.group({
      id: [null, [Validators.required]],
      codigoDeBarra: [null, Validators.required],
      nome: [null, Validators.required],
      quantidadeMinima: [null, Validators.required],
      saldoInicial: [null]
    })
  }

  public updateProdut(){
    const product: Product = this.formProduct.value as Product;

    this.productService.update(product).subscribe(
      res => {
        this.formProduct.reset();
        this.toast.success("Produto editado com sucesso");
        this.router.navigate(['products']);
      },
      err => {
        this.toast.error("Não foi possível atualizar produto");
      }
    )
  }


  public isFormControlInvalid(controlName: string): boolean {
    return !!(this.formProduct.get(controlName)?.invalid && this.formProduct.get(controlName)?.touched)
  }


}
