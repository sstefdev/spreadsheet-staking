import { FC } from 'react'

interface SpreadsheetCellProps {
  address: string
  value: string
  column: string
  icon?: JSX.Element
  handleBlur: (address: string, expression: string) => void
  handleCellChange: (address: string, value: string) => void
}

const SpreadsheetCell: FC<SpreadsheetCellProps> = ({
  address,
  value,
  icon,
  handleBlur,
  handleCellChange,
}) => (
  <div className='w-full relative'>
    <input
      className='w-full h-full text-center py-[20px] focus:outline-none'
      value={value}
      onBlur={(e) => handleBlur(address, e.target.value)}
      onChange={(e) => handleCellChange(address, e.target.value)}
    />
    {icon && <div className='absolute right-2 top-1/2 -translate-y-1/2 scale-[1.5]'>{icon}</div>}
  </div>
)

export default SpreadsheetCell
