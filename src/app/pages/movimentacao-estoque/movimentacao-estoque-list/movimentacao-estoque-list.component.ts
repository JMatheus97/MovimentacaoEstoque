import { Component } from '@angular/core';
import { MovimentacaoEstoque } from '../shared/movimentacao-estoque.model';
import { MovimentacaoEstoqueService } from '../shared/movimentacao-estoque.service';

@Component({
  selector: 'app-movimentacao-estoque-list',
  templateUrl: './movimentacao-estoque-list.component.html',
  styleUrls: ['./movimentacao-estoque-list.component.css']
})
export class MovimentacaoEstoqueListComponent {
  public listMovimentacaoEstoque: Array<MovimentacaoEstoque> = [];
  public listMovimentacaoEstoqueFiltrada: MovimentacaoEstoque[] = [];
  public filtroProduto: string = '';
  public filtroData: string = '';
  public filtroTipoMovimentacao: string = '';
  private listMovimentacaoEstoqueOriginal: MovimentacaoEstoque[] = [];
  public sortColumn: string = 'data';
  public sortDirection: string = 'asc';

  constructor(private movimentacaoEstoqueService: MovimentacaoEstoqueService ) {}

  ngOnInit(): void {
    this.movimentacaoEstoqueService.listAll().subscribe(
      res => {
        this.listMovimentacaoEstoque = res;
        this.listMovimentacaoEstoqueOriginal = [...res];
        this.getSaldo();
        this.filtrarMovimentacoesEstoque();
      }
    );
  }

  getSaldo(): void {
    const quantidadeTotalPorProduto: { [key: string]: number } = {};

    for (const movimentacaoEstoque of this.listMovimentacaoEstoque) {
      const produtoId = movimentacaoEstoque.produto?.id;
      const quantidade = movimentacaoEstoque.quantidade as number;

      if (produtoId !== undefined && quantidade !== undefined) {
        const produtoIdStr = String(produtoId);

        quantidadeTotalPorProduto[produtoIdStr] = (quantidadeTotalPorProduto[produtoIdStr] ?? 0) + quantidade;
      }
    }

    const listaProdutosRepetidos = [];
    for (const produtoId in quantidadeTotalPorProduto) {
      if (quantidadeTotalPorProduto.hasOwnProperty(produtoId)) {
        const quantidadeTotal = quantidadeTotalPorProduto[produtoId];
        listaProdutosRepetidos.push({ id: parseInt(produtoId), quantidadeTotal });
      }
    }

    for (const movimentacaoEstoque of this.listMovimentacaoEstoque) {
      const produtoId = movimentacaoEstoque.produto?.id;
      if (produtoId !== undefined) {
        const produtoIdStr = String(produtoId);
        const quantidadeTotal = quantidadeTotalPorProduto[produtoIdStr];
        movimentacaoEstoque.saldo = quantidadeTotal;
      }
    }
  }

  verificaQuantidadeMinima(movimentacaoEstoque: MovimentacaoEstoque): boolean {
    if (
      movimentacaoEstoque &&
      movimentacaoEstoque.produto &&
      movimentacaoEstoque.saldo !== undefined &&
      movimentacaoEstoque.produto.quantidadeMinima !== undefined &&
      movimentacaoEstoque.produto.quantidadeMinima !== null
    ) {
      const saldo: number = +movimentacaoEstoque.saldo;
      const quantidadeMinima: number = +movimentacaoEstoque.produto.quantidadeMinima;
      return saldo < quantidadeMinima;
    }
    return false;
  }


  public ordenarPor(coluna: string): void {
    if (this.sortColumn === coluna) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = coluna;
      this.sortDirection = 'asc';
    }
    this.ordenarMovimentacoesEstoque();
    console.log(this.listMovimentacaoEstoque)
  }

  private ordenarMovimentacoesEstoque(): void {
    this.listMovimentacaoEstoque.sort((a, b) => {
      const valorA = this.getValorOrdenacao(a, this.sortColumn);
      const valorB = this.getValorOrdenacao(b, this.sortColumn);
      if (valorA === null) return 1;
      if (valorB === null) return -1;
      if (valorA < valorB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valorA > valorB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private getValorOrdenacao(movimentacao: MovimentacaoEstoque, coluna: string): string | number | Date | null | '' {
    switch (coluna) {
      case 'data':
        return movimentacao.data ? new Date(movimentacao.data) : null;
        case 'produto':
          const nome = movimentacao.produto?.nome;
          return nome !== null && nome !== undefined ? nome.toString() : null;
      default:
        return null;
    }
  }

  public filtrarMovimentacoesEstoque(): void {
    this.listMovimentacaoEstoqueFiltrada = this.listMovimentacaoEstoque.filter(movimentacaoEstoque => {
      if (this.filtroProduto && movimentacaoEstoque.produto?.nome) {
        return movimentacaoEstoque.produto.nome.toLowerCase().includes(this.filtroProduto.toLowerCase());
      }
      if (this.filtroData) {
        const dataMovimentacao = movimentacaoEstoque.data ? new Date(movimentacaoEstoque.data) : null;
        const dataFiltro = new Date(this.filtroData);
        return dataMovimentacao?.toDateString() === dataFiltro.toDateString();
      }
      if (this.filtroTipoMovimentacao && movimentacaoEstoque.tipoMovimentacao) {
        return movimentacaoEstoque.tipoMovimentacao.toLowerCase().includes(this.filtroTipoMovimentacao.toLowerCase());
      }
      return true;
    });
  }

  public limparFiltros(): void {
    this.filtroProduto = '';
    this.filtroData = '';
    this.filtroTipoMovimentacao = '';

    this.aplicarFiltros();
  }

  public aplicarFiltros(): void {
    this.filtrarMovimentacoesEstoque();

    if (this.filtroProduto || this.filtroData || this.filtroTipoMovimentacao) {
      this.listMovimentacaoEstoque = [...this.listMovimentacaoEstoqueFiltrada];
    } else {
      this.listMovimentacaoEstoque = [...this.listMovimentacaoEstoqueOriginal];
  }
}

updateList($event: MovimentacaoEstoque){
  this.listMovimentacaoEstoque.push($event)
}

}
