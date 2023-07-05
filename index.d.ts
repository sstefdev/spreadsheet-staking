interface IAppContextState {
  cells: { [address: string]: Cell }
  rowCount: number
  colCount: number
  saving: boolean
  error: CellError[]
  cellsToSave: CellToSave[]
  setSaving: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<CellError[]>>
  setRowCount: React.Dispatch<React.SetStateAction<number>>
  setColCount: React.Dispatch<React.SetStateAction<number>>
  handleAutoSave: (editingCell: string) => Promise<void>
  setCells: React.Dispatch<React.SetStateAction<{ [address: string]: Cell }>>
  setCellsToSave: React.Dispatch<React.SetStateAction<CellToSave[]>>
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

interface CellToSave {
  id?: string
  cell?: string
  done_at?: string | number
}

interface CellError {
  cell: string
  message: string
  resolved: boolean
}
