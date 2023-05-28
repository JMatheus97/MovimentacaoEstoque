import { Product } from "../../products/shared/product.model";

export class MovimentacaoEstoque {
  constructor(
    public id?: Number | null,
    public produto?: Product | null,
    public tipoMovimentacao?: String | null,
    public quantidade?: Number | null,
    public data?: Date | null,
    public motivo?: String | null,
    public documento?: String | null,
    public saldo?: number
  ){}
}
