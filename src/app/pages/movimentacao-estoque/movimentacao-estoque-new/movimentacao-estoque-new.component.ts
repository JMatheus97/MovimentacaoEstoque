import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimentacaoEstoqueService } from '../shared/movimentacao-estoque.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../products/shared/products.service';
import { Product } from '../../products/shared/product.model';
import { MovimentacaoEstoque } from '../shared/movimentacao-estoque.model';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-movimentacao-estoque-new',
  templateUrl: './movimentacao-estoque-new.component.html',
  styleUrls: ['./movimentacao-estoque-new.component.css']
})
export class MovimentacaoEstoqueNewComponent {
  public formMovimentacaoEstoque: FormGroup;
  public listProducts: Array<Product> = [];

  @Output() newMovimentacao: EventEmitter<Product> = new EventEmitter();

  constructor(
                private fb: FormBuilder,
                private toast: ToastrService,
                 private movimentacaoEstoqueService: MovimentacaoEstoqueService,
                 private productService: ProductsService){
    this.formMovimentacaoEstoque = this.buildFormProduct();
  }


  ngOnInit(): void {
    this.productService.listAll().subscribe(
      res => {this.listProducts = res}
    )

}

  public buildFormProduct(): FormGroup {
    return this.fb.group({
      id:  [null, Validators.required],
      produto: [null, Validators.required],
      tipoMovimentacao: [null, Validators.required],
      quantidade:[null, Validators.required],
      data: [null, Validators.required],
      motivo: [null],
      documento: [null],
    })
  }

  public isFormControlInvalid(controlName: string): boolean {
    return !!(this.formMovimentacaoEstoque.get(controlName)?.invalid
                && this.formMovimentacaoEstoque.get(controlName)?.touched)
  }

  public saveNewMovimentacao(): void {
    if (this.formMovimentacaoEstoque) {
      const productId = Number(this.formMovimentacaoEstoque.get('produto')!.value);
      const quantidade = this.formMovimentacaoEstoque.get('quantidade')!.value;
      const productTrue = this.listProducts.find((p) => p.id === productId);
      const tipoMovimentacao =  this.formMovimentacaoEstoque.get('tipoMovimentacao')!.value;
      const dataString = this.formMovimentacaoEstoque.get('data')!.value;
      const data = new Date(dataString);


      if(tipoMovimentacao === null){
        this.toast.error("O tipo de movimentação não pode ser nulo");
        return;
      }

      if(quantidade < 0  || quantidade === null){
        this.toast.error("A quantidade não pode ser negativa e nem menor do zero");
        return;
      }

      if(data === null ){
        this.toast.error("A data não pode ser nula");
        return;
      }

      const newMovimentacaoEstoque: MovimentacaoEstoque = {
        produto: productTrue,
        tipoMovimentacao: tipoMovimentacao,
        quantidade: this.formMovimentacaoEstoque.get('quantidade')!.value,
        data: data,
        motivo: this.formMovimentacaoEstoque.get('motivo')!.value,
        documento: this.formMovimentacaoEstoque.get('documento')!.value
      };

      this.movimentacaoEstoqueService.saveNew(newMovimentacaoEstoque).subscribe(
        res => {
          this.toast.success("Salvo com sucesso");
          this.formMovimentacaoEstoque.reset();
          this.newMovimentacao.emit(res);
        },
        err => {
          console.log(err);
          this.toast.error(err.error.message);
        }
      );
  }
  }

  public getPerfil(): boolean {
    const perfil =  localStorage.getItem(environment.usuarioPefil);
    if(perfil === 'GERENTE') {
      return true;
    }else {
      return false;
    }
  }

  public getTipoMovimentacao(): boolean {
    const tipoMovimentacao = this.formMovimentacaoEstoque.get('tipoMovimentacao')!.value;
    if(tipoMovimentacao === 'ENTRADA'  || tipoMovimentacao === 'SAÍDA'){
        return true;
    }   else {
      return false;
    }
  }
}
