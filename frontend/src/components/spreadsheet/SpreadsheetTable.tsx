/* eslint-disable no-prototype-builtins */
import { WriteIcon } from '@assets/svg'
import { useAppContext } from '@utils/useAppContext'
import { debounce, evaluateFormula } from '@libs/index'
import SpreadsheetCell from './SpreadsheetCell'

const SpreadsheetTable = () => {
  const { cells, rowCount, colCount, handleAutoSave, setCells } = useAppContext()
  const debouncedSaveSheet = debounce(handleAutoSave, 2000)

  const handleCellChange = (address: string, value: string) => {
    setCells((prevCells) => ({
      ...prevCells,
      [address]: {
        ...prevCells[address],
        value,
      },
    }))
  }

  const handleBlur = (address: string, expression: string) => {
    if (!expression.startsWith('=')) {
      handleCellChange(address, expression)
      debouncedSaveSheet()
      return
    } else {
      const result = evaluateFormula(cells, expression.substring(1))
      handleCellChange(address, result)
      debouncedSaveSheet()
    }

    for (const dependentAddress in cells) {
      if (
        cells.hasOwnProperty(dependentAddress) &&
        cells[dependentAddress].dependencies?.includes(address)
      ) {
        handleBlur(dependentAddress, `=${cells[dependentAddress].value}`)
      }
    }
  }

  const renderCell = (address: string) => {
    const column = address.charAt(0)

    return (
      <td key={address}>
        <SpreadsheetCell
          column={column}
          icon={<WriteIcon />}
          address={address}
          value={cells[address]?.value || ''}
          handleBlur={handleBlur}
          handleCellChange={handleCellChange}
        />
      </td>
    )
  }

  const generateTable = () => {
    const columns = Array.from({ length: colCount }, (_, index) => String.fromCharCode(65 + index))
    const rows = Array.from({ length: rowCount }, (_, index) => index + 1)

    return (
      <>
        <thead>
          <tr>
            {columns.map((column, columnIndex) => (
              <th key={`col-${columnIndex}`} className='py-[10px]  text-l font-normal'>
                {column.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`row-${row}`}>{columns.map((column) => renderCell(`${column}${row}`))}</tr>
          ))}
        </tbody>
      </>
    )
  }

  return (
    <table className='text-center w-full overflow-hidden rounded-[5px] border-collapse bg-[#EFEFEF]'>
      {generateTable()}
    </table>
  )
}

export default SpreadsheetTable
