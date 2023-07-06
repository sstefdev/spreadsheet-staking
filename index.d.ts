/**
 * Represents the state of the application context.
 * @interface IAppContextState
 * @property {Object.<string, Cell>} cells - The cells in the application, indexed by address.
 * @property {number} rowCount - The number of rows in the spreadsheet.
 * @property {number} colCount - The number of columns in the spreadsheet.
 * @property {boolean} saving - Indicates whether saving is in progress.
 * @property {CellError[]} error - The errors associated with the cells.
 * @property {CellToSave[]} cellsToSave - The cells that need to be saved.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setSaving - Setter function for the saving state.
 * @property {React.Dispatch<React.SetStateAction<CellError[]>>} setError - Setter function for the error state.
 * @property {React.Dispatch<React.SetStateAction<number>>} setRowCount - Setter function for the row count.
 * @property {React.Dispatch<React.SetStateAction<number>>} setColCount - Setter function for the column count.
 * @property {(editingCell: string) => Promise<void>} handleAutoSave - Handles auto-saving of the editing cell.
 * @property {React.Dispatch<React.SetStateAction<{ [address: string]: Cell }>>} setCells - Setter function for the cells state.
 * @property {React.Dispatch<React.SetStateAction<CellToSave[]>>} setCellsToSave - Setter function for the cells to save state.
 */
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

/**
 * Represents a spreadsheet response.
 * @interface SpreadsheetResponse
 * @property {string|undefined} id - The ID of the spreadsheet.
 * @property {'IN_PROGRESS' | 'DONE'} status - The status of the spreadsheet.
 * @property {string|number|undefined} done_at - The timestamp indicating when the spreadsheet was done.
 */
interface SpreadsheetResponse {
  id?: string
  status: 'IN_PROGRESS' | 'DONE'
  done_at?: string | number
}

/**
 * Represents a cell in the spreadsheet.
 * @interface Cell
 * @property {string} value - The value of the cell.
 * @property {string[]} dependencies - The dependencies of the cell.
 */
interface Cell {
  value: string
  previousValue: string
  dependencies: string[]
}

/**
 * Represents an error associated with a cell.
 * @interface CellError
 * @property {string} cell - The address of the cell.
 * @property {string} message - The error message.
 * @property {boolean} resolved - Indicates whether the error is resolved.
 */
interface CellError {
  cell: string
  message: string
  resolved: boolean
}

/**
 * Represents a cell that needs to be saved.
 * @interface CellToSave
 * @property {string|undefined} id - The ID of the cell.
 * @property {string|undefined} cell - The address of the cell.
 * @property {string|number|undefined} done_at - The timestamp indicating when the cell was done.
 */
interface CellToSave {
  id?: string
  cell?: string
  done_at?: string | number
}
