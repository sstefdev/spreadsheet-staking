import { useAppContext } from '@utils/useAppContext'

const GenerateTable = () => {
  const { rowCount, colCount, setRowCount, setColCount } = useAppContext()

  return (
    <div>
      <h2 className='flex gap-[10px]'>
        Generate
        <input
          className='max-w-[30px] bg-[#c5c5c5] rounded-[4px] text-center focus:outline-none'
          type='text'
          value={rowCount}
          onChange={(e) =>
            setRowCount(
              Number(e.target.value) > 100 ? 100 : Number(e.target.value.replace(/^0+(?=\d)/, '')),
            )
          }
        />
        rows and
        <input
          className='max-w-[30px] bg-[#c5c5c5] rounded-[4px] text-center focus:outline-none'
          type='text'
          value={colCount}
          onChange={(e) =>
            setColCount(
              Number(e.target.value) > 14 ? 14 : Number(e.target.value.replace(/^0+(?=\d)/, '')),
            )
          }
        />
        columns
      </h2>
    </div>
  )
}

export default GenerateTable
