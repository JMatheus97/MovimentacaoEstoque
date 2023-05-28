import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { MovimentacaoEstoque } from "./movimentacao-estoque.model";
import { environment } from "src/environments/environments";



@Injectable({
  providedIn: 'root',
})

export class MovimentacaoEstoqueService {

  constructor(private http: HttpClient){}


  public listAll(): Observable<MovimentacaoEstoque[]> {
    const url = `${environment.baseUrlBackend}/movimentecao`
    return this.http.get(url).pipe(
      map(this.mapToProducts)
    )
  }

  public getUltimo(id: number): Observable<MovimentacaoEstoque | null> {
    const url = `${environment.baseUrlBackend}/movimentecao/ultimo/${id}`;
    return this.http.get<MovimentacaoEstoque>(url).pipe(
      catchError(() => of(null))
    );
  }

  private mapToProducts(data: any): Array<MovimentacaoEstoque>{
    const listMovimentacaoEstoque: MovimentacaoEstoque[] = [];

    data.forEach((e: any) => listMovimentacaoEstoque.push(Object.assign(new MovimentacaoEstoque, e)))

    return listMovimentacaoEstoque;
  }

  public saveNew(newMovimentacaoEstoque: MovimentacaoEstoque ): Observable<MovimentacaoEstoque> {
    const url = `${environment.baseUrlBackend}/movimentecao`
      return this.http.post(url, newMovimentacaoEstoque).pipe(
        map(this.mapToMovimentacaoEstoque)
      )
  }

  private mapToMovimentacaoEstoque(data: any): MovimentacaoEstoque{
    return (Object.assign(new MovimentacaoEstoque, data))
  }
}
