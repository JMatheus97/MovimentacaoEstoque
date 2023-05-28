import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../shared/products.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent {
  public formProduct: FormGroup;


  @Output() newProduct: EventEmitter<Product> = new EventEmitter();

  constructor(private fb: FormBuilder, private toast: ToastrService, private productService: ProductsService){
    this.formProduct = this.buildFormProduct();
  }

  public buildFormProduct(): FormGroup {
    return this.fb.group({
      codigoDeBarra: [null, Validators.required],
      nome: [null, Validators.required],
      quantidadeMinima: [null, Validators.required],
      saldoInicial: [null, Validators.required]
    })
  }

  public isFormControlInvalid(controlName: string): boolean {
    return !!(this.formProduct.get(controlName)?.invalid && this.formProduct.get(controlName)?.touched)
  }


  public saveNewClient(): void {
    if (this.formProduct.valid) {
      const quantidadeMinima = this.formProduct.get('quantidadeMinima')!.value;
      const saldoInicial = this.formProduct.get('saldoInicial')!.value;

      if (quantidadeMinima === null) {
        this.toast.error("Informe a quantidade mínima");
        return;
      }

      if (saldoInicial === null) {
        this.toast.error("Informe o saldo total");
        return;
      }

      if (quantidadeMinima > saldoInicial) {
        this.toast.error("A quantidade mínima é maior que o saldo total");
        return;
      }

      const newProduct: Product = {
        codigoDeBarra: this.formProduct.get('codigoDeBarra')!.value,
        nome: this.formProduct.get('nome')!.value,
        quantidadeMinima: quantidadeMinima,
        saldoInicial: saldoInicial
      };

      this.productService.saveNew(newProduct).subscribe(
        res => {
          this.toast.success("Salvo com sucesso");
          this.formProduct.reset();
          this.newProduct.emit(res);
        },
        err => {
          this.toast.error(err.error.message);
        }
      );
    }
  }

}
