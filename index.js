class Conta {
  constructor(titular, saldo) {
    this.titular = titular
    this._saldo = saldo
  }

  get saldo() {
    return this._saldo
  }

  depositar(valor) {
    this._saldo += valor
    console.log(`Depósito de ${valor} realizado. Novo saldo: ${this._saldo}`)
  }

  sacar(valor) {
    if (valor <= this._saldo) {
      this._saldo -= valor
      console.log(`Saque de ${valor} realizado. Novo saldo: ${this._saldo}`)
    } else {
      console.log("Saldo insuficiente.")
    }
  }

  realizarOperacao() {
    console.log("Realizando operação genérica")
  }
}

class ContaCorrente extends Conta {
  constructor(titular, saldo, limite) {
    super(titular, saldo)
    this.limite = limite
  }

  sacar(valor) {
    const saldoDisponivel = this._saldo + this.limite
    if (valor <= saldoDisponivel) {
      this._saldo -= valor
      console.log(`Saque de ${valor} realizado. Novo saldo: ${this._saldo}`)
    } else {
      console.log("Limite de saque excedido.")
    }
  }

  transferir(contaDestino, valor) {
    if (valor <= this._saldo) {
      this._saldo -= valor
      contaDestino.depositar(valor)
      console.log(`Transferência de ${valor} realizada para ${contaDestino.titular}`)
    } else {
      console.log("Saldo insuficiente para realizar a transferência.")
    }
  }

  realizarOperacao() {
    console.log("Realizando operação de conta corrente")
  }
}

class ContaPoupanca extends Conta {
  constructor(titular, saldo, taxaRendimento) {
    super(titular, saldo)
    this.taxaRendimento = taxaRendimento
  }

  calcularRendimento() {
    const rendimento = this._saldo * this.taxaRendimento
    this._saldo += rendimento
    console.log(`Rendimento de ${rendimento} aplicado. Novo saldo: ${this._saldo}`)
  }

  realizarOperacao() {
    console.log("Realizando operação de conta poupança")
  }
}

class OperacaoFinanceira {
  constructor(conta, valor) {
    this.conta = conta;
    this.valor = valor;
  }
}

class Deposito extends OperacaoFinanceira {
  executar() {
    this.conta.depositar(this.valor);
  }
}

class Saque extends OperacaoFinanceira {
  executar() {
    this.conta.sacar(this.valor);
  }
}

const contaExemplo = new Conta("João", 1000)

contaExemplo.saldo
contaExemplo.depositar(500)
contaExemplo.sacar(200)

const contaCorrenteExemplo = new ContaCorrente("Maria", 2000, 500)
const contaPoupancaExemplo = new ContaPoupanca("Carlos", 5000, 0.02)

contaCorrenteExemplo.sacar(300)
contaCorrenteExemplo.transferir(contaPoupancaExemplo, 1000)
contaCorrenteExemplo.realizarOperacao()

contaPoupancaExemplo.calcularRendimento()
contaPoupancaExemplo.realizarOperacao()

const contaExemploOperacoes = new Conta("João", 1000);

const deposito = new Deposito(contaExemploOperacoes, 500);
deposito.executar()

const saque = new Saque(contaExemploOperacoes, 200);
saque.executar()