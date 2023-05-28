import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environments";
import  { Product } from '../shared/product.model';


@Injectable({
  providedIn: 'root',
})

export class ProductsService {


    constructor(private http: HttpClient){}


    public listAll(): Observable<Product[]> {
      const url = `${environment.baseUrlBackend}/produto`
        return this.http.get(url).pipe(
          map(this.mapToProducts)
        )
    }

    public listById(id: number): Observable<Product> {
       const url = `${environment.baseUrlBackend}/produto/${id}`;
       return this.http.get(url).pipe(
        map(this.mapToProduct)
      )
    }

    private mapToProducts(data: any): Array<Product>{
      const listProducts: Product[] = [];

      data.forEach((e: any) => listProducts.push(Object.assign(new Product, e)))

      return listProducts;
    }

    public saveNew(newProduct: Product ): Observable<Product> {
      const url = `${environment.baseUrlBackend}/produto`
        return this.http.post(url, newProduct).pipe(
          map(this.mapToProduct)
        )
    }

    public update(product: Product): Observable<Product> {
      const url = `${environment.baseUrlBackend}/produto`
        return this.http.put(url, product).pipe(
          map(this.mapToProduct)
        )
    }


    private mapToProduct(data: any): Product{
      return (Object.assign(new Product, data))
    }
}
