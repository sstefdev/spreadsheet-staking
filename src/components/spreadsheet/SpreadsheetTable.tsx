/* eslint-disable no-prototype-builtins */
import { useState } from 'react'
import { WriteIcon } from '@assets/svg'
import { useAppContext } from '@utils/useAppContext'
import { evaluateFormula } from '@libs/index'
import SpreadsheetCell from './SpreadsheetCell'

const SpreadsheetTable = () => {
  const { cells, rowCount, colCount, handleAutoSave, setCells, setSaving } = useAppContext()
  const [editingCell, setEditingCell] = useState<string>('')

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
    setSaving(true)
    if (!expression.startsWith('=')) {
      handleCellChange(address, expression)
      handleAutoSave(editingCell)
      return
    } else {
      const result = evaluateFormula(cells, expression.substring(1))
      handleCellChange(address, result)
      handleAutoSave(editingCell)
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
    const isEditing = editingCell === address

    return (
      <td key={address}>
        <SpreadsheetCell
          column={column}
          icon={<WriteIcon />}
          address={address}
          value={cells[address]?.value || ''}
          handleBlur={handleBlur}
          handleCellChange={handleCellChange}
          setCurrentEditingCell={() => setEditingCell(address)}
          isEditing={isEditing}
        />
      </td>
    )
  }

  const generateTable = () => {
    const columns = Array.from({ length: colCount }, (_, index) => String.fromCharCode(65 + index))
    const rows = Array.from({ length: rowCount }, (_, index) => index + 1)

    return (
      <table className='text-center w-full rounded-[5px] bg-[#EFEFEF]'>
        <thead>
          <tr>
            {columns.map((column, columnIndex) => (
              <th key={`col-${columnIndex}`} className='py-[10px] text-l font-normal'>
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
      </table>
    )
  }

  return generateTable()
}

export default SpreadsheetTable
