export class OrderDtoHw10 {
  income: number | null
  debt: number | null
  age: number | null
  employed: boolean
  loanAmount: number | null
  loanPeriod: number | null

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }
  static calculateRiskScoreWithRandomData(): OrderDtoHw10 {
    const income = Math.floor(Math.random() * 10000) + 1
    const debt = Math.floor(Math.random() * 5000)
    const age = Math.floor(Math.random() * 50) + 17
    const employed = Math.random() > 0.5
    const loanAmount = Math.floor(Math.random() * 10000) + 100
    const loanPeriodOptions = [3, 6, 9, 12, 18, 24, 30, 36]
    const loanPeriod = loanPeriodOptions[Math.floor(Math.random() * loanPeriodOptions.length)]

    return new OrderDtoHw10(income, debt, age, employed, loanAmount, loanPeriod)
  }
}
