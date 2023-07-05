import { ReactNode, createContext, useEffect, useState } from 'react'
import { showToast, generateCsvData } from '@libs/index'
import { saveSheet, getStatus } from './api'

export const StakingAppContext = createContext<Partial<IAppContextState>>({})

interface AppContextProviderProps {
  children: ReactNode
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [cells, setCells] = useState<{ [address: string]: Cell }>({})
  const [rowCount, setRowCount] = useState(14)
  const [colCount, setColCount] = useState(3)
  const [cellsToSave, setCellsToSave] = useState<CellToSave[]>([])
  const [saving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<CellError[]>([])

  const handleAutoSave = async (editingCell: string) => {
    try {
      const csvData = generateCsvData(colCount, rowCount, cells)
      const sheet = await saveSheet(csvData, editingCell, setError)

      if (sheet?.status === 'DONE') {
        showToast('success', 'Saved')
      }

      if (sheet?.id) {
        setCellsToSave((prevCells) => [
          ...prevCells,
          {
            id: sheet.id,
            cell: editingCell,
            done_at: sheet.done_at,
          },
        ])
      }
    } catch (error: any) {
      console.error('Error saving spreadsheet', error)
      showToast('error', error.message)
    }
  }

  useEffect(() => {
    // if (saving) {
    //   showToast('info', 'Saving, please wait...', {
    //     autoClose: false,
    //   })
    // }
    const checkAutoSave = async () => {
      let allCellsSaved = true

      if (cellsToSave.length === 0) {
        return
      }

      for (const cell of cellsToSave) {
        const now = new Date().getTime()
        const savedTime = new Date(cell.done_at as string).getTime()
        const timeDiff = now > savedTime

        if (timeDiff) {
          const status = await getStatus(cell.id as string)

          if (status?.status === 'DONE') {
            setCellsToSave((prevCells) => prevCells.filter((c) => c !== cell))
          } else {
            allCellsSaved = false
          }
        } else {
          allCellsSaved = false
        }
      }

      if (allCellsSaved) {
        setSaving(false)
        showToast('success', 'All cells saved successfully')
        setError([])
      }
    }

    const intervalId = setInterval(checkAutoSave, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [cellsToSave, saving])

  return (
    <StakingAppContext.Provider
      value={{
        cells,
        rowCount,
        colCount,
        saving,
        error,
        cellsToSave,
        setCells,
        setSaving,
        setError,
        setRowCount,
        setColCount,
        handleAutoSave,
        setCellsToSave,
      }}
    >
      {children}
    </StakingAppContext.Provider>
  )
}

export default AppContextProvider
