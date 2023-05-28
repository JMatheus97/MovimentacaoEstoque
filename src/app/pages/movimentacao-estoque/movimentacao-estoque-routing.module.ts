import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimentacaoEstoqueListComponent } from './movimentacao-estoque-list/movimentacao-estoque-list.component';

const routes: Routes = [
  {path: '', component: MovimentacaoEstoqueListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacaoEstoqueRoutingModule { }
