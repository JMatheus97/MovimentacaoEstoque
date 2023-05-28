import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoEstoqueRoutingModule } from './movimentacao-estoque-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovimentacaoEstoqueListComponent } from './movimentacao-estoque-list/movimentacao-estoque-list.component';
import { MovimentacaoEstoqueNewComponent } from './movimentacao-estoque-new/movimentacao-estoque-new.component';

@NgModule({
  declarations: [
    MovimentacaoEstoqueListComponent,
    MovimentacaoEstoqueNewComponent
  ],
  imports: [
    CommonModule,
    MovimentacaoEstoqueRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class MovimentacaoEstoqueModule { }
