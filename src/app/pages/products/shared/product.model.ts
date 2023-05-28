export class Product {
  constructor(
    public id?: Number | null,
    public codigoDeBarra?: String | null,
    public nome?: String | null,
    public quantidadeMinima?: Number | null,
    public saldoInicial?: Number | null
    ){}
}
