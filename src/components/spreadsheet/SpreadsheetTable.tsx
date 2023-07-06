/* eslint-disable no-prototype-builtins */
import { useState } from 'react'
import { WriteIcon } from '@assets/svg'
import { useAppContext } from '@utils/useAppContext'
import { evaluateFormula, extractDependencies, removeLeadingZeros } from '@libs/index'
import SpreadsheetCell from './SpreadsheetCell'

const SpreadsheetTable = () => {
  const { cells, rowCount, colCount, handleAutoSave, setCells, setSaving } = useAppContext()
  const [editingCell, setEditingCell] = useState<string>('')

  const handleCellChange = (address: string, value: string) => {
    let formattedValue = value
    let dependencies: any[] = []

    if (typeof value === 'string' && value.startsWith('=')) {
      formattedValue = removeLeadingZeros(value)
      dependencies = value.substring(1).split(',')
    }

    setCells((prevCells) => {
      const cell = prevCells[address]

      if (cell?.value !== formattedValue) {
        return {
          ...prevCells,
          [address]: {
            ...cell,
            value: formattedValue,
            previousValue: cell?.value,
            dependencies: dependencies.length > 0 ? dependencies : cell?.dependencies,
          },
        }
      } else {
        return {
          ...prevCells,
          [address]: {
            ...cell,
            previousValue: cell?.previousValue,
          },
        }
      }
    })
  }

  const handleBlur = (address: string, expression: string) => {
    checkDependecies()
    setSaving(true)

    if (!expression.startsWith('=')) {
      handleCellChange(address, expression)
      handleAutoSave(editingCell)
      return
    }

    const result = evaluateFormula(cells, expression.substring(1))
    handleCellChange(address, result)
    handleAutoSave(editingCell)
  }

  const checkDependecies = () => {
    let dependenciesExtracted: string[] = []

    for (const cell in cells) {
      if (cells[cell]?.dependencies?.length > 0) {
        const dependencies = cells[cell].dependencies
        for (const dependency of dependencies) {
          dependenciesExtracted = extractDependencies(removeLeadingZeros(dependency))
        }

        for (const dependency of dependenciesExtracted) {
          const value = cells[dependency]?.value
          const previousValue = cells[dependency]?.previousValue

          if (value !== previousValue && previousValue !== undefined) {
            const result = evaluateFormula(cells, cells[cell]?.dependencies[0])
            setCells((prevCells) => {
              return {
                ...prevCells,
                [cell]: {
                  ...cells[cell],
                  value: result,
                },
              }
            })
          }
        }
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
