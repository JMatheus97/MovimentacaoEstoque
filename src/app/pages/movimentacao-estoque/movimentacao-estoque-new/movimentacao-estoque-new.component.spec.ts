import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoEstoqueNewComponent } from './movimentacao-estoque-new.component';

describe('MovimentacaoEstoqueNewComponent', () => {
  let component: MovimentacaoEstoqueNewComponent;
  let fixture: ComponentFixture<MovimentacaoEstoqueNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimentacaoEstoqueNewComponent]
    });
    fixture = TestBed.createComponent(MovimentacaoEstoqueNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
