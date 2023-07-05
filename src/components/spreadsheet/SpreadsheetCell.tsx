import { FC } from 'react'
import { useAppContext } from '@utils/useAppContext'
import { ClassicSpinner } from 'react-spinners-kit'

interface SpreadsheetCellProps {
  value: string
  column: string
  address: string
  icon?: JSX.Element
  isEditing: boolean
  handleBlur: (address: string, expression: string) => void
  handleCellChange: (address: string, value: string) => void
  setCurrentEditingCell: () => void
}

const SpreadsheetCell: FC<SpreadsheetCellProps> = ({
  icon,
  value,
  address,
  isEditing,
  handleBlur,
  handleCellChange,
  setCurrentEditingCell,
}) => {
  const { error, cellsToSave } = useAppContext()
  const isCellSaving = cellsToSave.some((cell) => cell.cell === address)
  const hasCellError = error.some((error) => error.cell === address)

  return (
    <div
      className={`flex items-center w-full relative  transition-all bg-gray-100  ${
        isEditing && 'drop-shadow-2xl border-3 border-gray-300'
      }`}
    >
      <input
        className={`w-full h-full text-center py-[20px] focus:outline-none bg-gray-100 pr-[8px] ${
          isEditing && '!bg-slate-100'
        } ${hasCellError && '!bg-red-200'}`}
        value={value}
        onBlur={(e) => handleBlur(address, e.target.value)}
        onChange={(e) => handleCellChange(address, e.target.value)}
        onClick={setCurrentEditingCell}
      />
      {icon && !isCellSaving && (
        <div className='absolute right-2 top-1/2 -translate-y-1/2 scale-[1.5]'>{icon}</div>
      )}
      <div className='absolute right-2 top-1/2 -translate-y-1/2'>
        <ClassicSpinner size={20} color='#0A0A0A' loading={isCellSaving} />
      </div>
    </div>
  )
}

export default SpreadsheetCell
