import { getDisplayTableData } from './Table.utils'
import {
  UPDATE_TABLE_DATA,
  EXPAND_TABLE,
  COLLAPSE_TABLE,
  SELECT_ALL_ROWS,
  DESELECT_ALL_ROWS,
  SELECT_ROW,
  DESELECT_ROW,
  UPDATE_COLUMNS,
  RESET_COLUMNS,
} from './Table.actionTypes'

export default function reducer(state, { type, payload, opts = {} }) {
  switch (type) {
    case UPDATE_TABLE_DATA:
      return {
        ...state,
        currentTableData: getDisplayTableData(payload),
      }

    case EXPAND_TABLE:
    case COLLAPSE_TABLE:
      return {
        ...state,
        currentTableData: getDisplayTableData(payload),
      }

    case SELECT_ALL_ROWS:
      const allRows = payload.data.map(d => d[payload.selectionKey])
      opts.sideEffect && opts.sideEffect(allRows)

      return {
        ...state,
        selectedRows: allRows,
      }

    case DESELECT_ALL_ROWS:
      const noRows = []
      opts.sideEffect && opts.sideEffect(noRows)

      return {
        ...state,
        selectedRows: noRows,
      }

    case SELECT_ROW:
      const addedToSelection = state.selectedRows.concat(payload.value)
      opts.sideEffect && opts.sideEffect(addedToSelection)

      return {
        ...state,
        selectedRows: addedToSelection,
      }

    case DESELECT_ROW:
      const removedFromSelection = state.selectedRows.filter(
        row => row !== payload.value
      )
      opts.sideEffect && opts.sideEffect(removedFromSelection)

      return {
        ...state,
        selectedRows: removedFromSelection,
      }

    case UPDATE_COLUMNS:
      return { ...state, columns: payload.columns }

    case RESET_COLUMNS:
      console.log(payload)
      return { ...state }

    default:
      return state
  }
}
