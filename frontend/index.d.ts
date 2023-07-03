interface IAppContextState {
  cells: { [address: string]: Cell }
  rowCount: number
  colCount: number
  loading: boolean
  error: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<string>>
  setRowCount: React.Dispatch<React.SetStateAction<number>>
  setColCount: React.Dispatch<React.SetStateAction<number>>
  getStatus: (statusId: string) => Promise<SpreadsheetResponse | undefined>
  saveSheet: (csvData: string) => Promise<SpreadsheetResponse | undefined>
  handleAutoSave: () => Promise<void>
  setCells: React.Dispatch<React.SetStateAction<{ [address: string]: Cell }>>
}

interface SpreadsheetResponse {
  id?: string
  status: 'IN_PROGRESS' | 'DONE'
  done_at?: string | number
}

interface Cell {
  value: string
  dependencies: string[]
}
