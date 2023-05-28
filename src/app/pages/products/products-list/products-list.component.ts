import { Component } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { Product } from '../shared/product.model';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  public listProducts: Array<Product> = [];

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
      this.productService.listAll().subscribe(
        res => {this.listProducts = res}
      )

  }

  public removerProduct(produtId: any){
    console.log("Remove produto", produtId)
  }

  updateList($event: Product){
    this.listProducts.push($event)
  }

  public getPerfil(): boolean {
    const perfil =  localStorage.getItem(environment.usuarioPefil);
    if(perfil === 'GERENTE') {
      return true;
    }else {
      return false;
    }
  }

}
