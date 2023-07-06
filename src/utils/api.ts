import { apiHandler, showToast } from '@libs/index'

export const getStatus = async (statusId: string) => {
  try {
    const response = await apiHandler<SpreadsheetResponse>(
      { method: 'get' },
      `get-status?id=${statusId}`,
    )
    return response
  } catch (error: any) {
    console.error('Error fetching spreadsheet status', error)
    showToast('error', 'Error getting the status of spreadsheet')
  }
}

export const saveSheet = async (
  csvData: string,
  editingCell: string,
  setError: React.Dispatch<React.SetStateAction<CellError[]>>,
) => {
  try {
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
    showToast('error', `Error saving ${editingCell} cell, please try again...`)
    setError((prevError) => [
      ...prevError,
      {
        cell: editingCell || '',
        message: error.message,
        resolved: false,
      },
    ])
  }
}
