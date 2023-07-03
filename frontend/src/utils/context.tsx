/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useState } from 'react'
import { apiHandler, evaluateFormula } from '@libs/index'

export const StakingAppContext = createContext<Partial<IAppContextState>>({})

interface AppContextProviderProps {
  children: ReactNode
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [cells, setCells] = useState<{ [address: string]: Cell }>({})
  const [rowCount, setRowCount] = useState(14)
  const [colCount, setColCount] = useState(3)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const getStatus = async (statusId: string) => {
    try {
      setLoading(true)
      const response = await apiHandler<SpreadsheetResponse>(
        { method: 'get' },
        `get-status?id=${statusId}`,
      )
      return response
    } catch (error: any) {
      console.error('Error fetching spreadsheet status', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const saveSheet = async (csvData: string) => {
    try {
      setLoading(true)
      const response = await apiHandler<SpreadsheetResponse>(
        {
          method: 'post',
          data: JSON.stringify(csvData),
        },
        'save',
      )
      return response
    } catch (error: any) {
      console.error('Error saving spreadsheet', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAutoSave = async () => {
    if (!loading) {
      try {
        const csvData = generateCSVData()
        const sheet = await saveSheet(csvData)
        const status = sheet && (await getStatus(sheet.id ?? ''))
      } catch (error: any) {
        console.error('Error saving spreadsheet', error)
        setError(error.message)
      }
    }
  }

  const generateCSVData = () => {
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

  return (
    <StakingAppContext.Provider
      value={{
        cells,
        rowCount,
        colCount,
        loading,
        error,
        setCells,
        setLoading,
        setError,
        getStatus,
        saveSheet,
        setRowCount,
        setColCount,
        handleAutoSave,
      }}
    >
      {children}
    </StakingAppContext.Provider>
  )
}

export default AppContextProvider
