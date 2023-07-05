import { evaluateFormula } from '@libs/index'

const generateCsvData = (
  colCount: number,
  rowCount: number,
  cells: { [address: string]: Cell },
) => {
  const headerRow = Array.from({ length: colCount }, (_, index) => {
    const columnLabel = String.fromCharCode(65 + index)
    return `${columnLabel}`
  })

  const dataRows = Array.from({ length: rowCount }, (_, rowIndex) => {
    return Array.from({ length: colCount }, (_, colIndex) => {
      const address = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`
      const value = cells[address]?.value || ''

      if (typeof value === 'string' && value.startsWith('=')) {
        const evaluatedValue = evaluateFormula(cells, value.substring(1))
        return evaluatedValue !== value ? evaluatedValue : value
      }

      return value
    })
  })

  const csvData = [headerRow, ...dataRows].map((row) => row.join(',')).join('\n')

  return csvData
}

export default generateCsvData
