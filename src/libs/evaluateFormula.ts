import { create, all } from 'mathjs'

const math = create(all)

const evaluateFormula = (cells: { [address: string]: Cell }, expression: string) => {
  try {
    const replacedExpression = expression.replace(/([A-Z]+)(\d+)/g, (_, column, row) => {
      const address = `${column}${row}`
      return cells[address]?.value
    })

    const result = math.evaluate(replacedExpression)
    return result
  } catch (error) {
    return expression
  }
}

export default evaluateFormula
