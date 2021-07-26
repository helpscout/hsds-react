import { getDisplayTableData } from './Table.utils'

export function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case 'updated-data':
      return {
        ...state,
        currentTableData: getDisplayTableData(payload),
      }

    case 'expand':
    case 'collapse':
      return {
        ...state,
        currentTableData: getDisplayTableData(payload),
      }

    case 'select-all':
      return {
        ...state,
        selectedRows: payload.data.map(d => d[payload.selectKey]),
      }

    case 'deselect-all':
      return {
        ...state,
        selectedRows: [],
      }

    case 'select-row':
      return {
        ...state,
        selectedRows: state.selectedRows.concat(payload.value),
      }

    case 'deselect-row':
      return {
        ...state,
        selectedRows: state.selectedRows.filter(row => row !== payload.value),
      }

    default:
      return state
  }
}
