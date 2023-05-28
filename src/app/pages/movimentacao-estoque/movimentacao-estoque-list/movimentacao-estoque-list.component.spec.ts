import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoEstoqueListComponent } from './movimentacao-estoque-list.component';

describe('MovimentacaoEstoqueListComponent', () => {
  let component: MovimentacaoEstoqueListComponent;
  let fixture: ComponentFixture<MovimentacaoEstoqueListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimentacaoEstoqueListComponent]
    });
    fixture = TestBed.createComponent(MovimentacaoEstoqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
