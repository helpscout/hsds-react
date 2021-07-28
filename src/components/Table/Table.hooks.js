import { useMemo, useReducer, useCallback } from 'react'
import { getDisplayTableData } from './Table.utils'
import {
  UPDATE_TABLE_DATA,
  EXPAND_TABLE,
  COLLAPSE_TABLE,
  SELECT_ALL_ROWS,
  DESELECT_ALL_ROWS,
  SELECT_ROW,
  DESELECT_ROW,
} from './Table.actionTypes'
import reducer from './Table.reducer'

export function useTable(data = [], maxRowsToDisplay = null) {
  const initialDisplayTableData = useMemo(
    () =>
      getDisplayTableData({
        data,
        rowsToDisplay: maxRowsToDisplay,
      }),
    [data, maxRowsToDisplay]
  )

  const [state, dispatch] = useReducer(reducer, {
    selectedRows: [],
    currentTableData: initialDisplayTableData,
  })

  const updateTableData = useCallback(
    (data, rowsToDisplay) => {
      dispatch({
        type: UPDATE_TABLE_DATA,
        payload: {
          data,
          rowsToDisplay,
        },
      })
    },
    [dispatch]
  )

  const expandTable = useCallback(
    data => {
      dispatch({
        type: EXPAND_TABLE,
        payload: {
          data,
          rowsToDisplay: data.length,
        },
      })
    },
    [dispatch]
  )

  const collapseTable = useCallback(
    (data, rowsToDisplay) => {
      dispatch({
        type: COLLAPSE_TABLE,
        payload: {
          data,
          rowsToDisplay,
        },
      })
    },
    [dispatch]
  )

  const selectAllRows = useCallback(
    (data, selectionKey, sideEffect) => {
      dispatch({
        type: SELECT_ALL_ROWS,
        payload: {
          data,
          selectionKey,
        },
        opts: { sideEffect },
      })
    },
    [dispatch]
  )

  const deselectAllRows = useCallback(
    sideEffect => {
      dispatch({
        type: DESELECT_ALL_ROWS,
        opts: { sideEffect },
      })
    },
    [dispatch]
  )

  const selectRow = useCallback(
    (value, sideEffect) => {
      dispatch({
        type: SELECT_ROW,
        payload: {
          value,
        },
        opts: { sideEffect },
      })
    },
    [dispatch]
  )

  const deselectRow = useCallback(
    (value, sideEffect) => {
      dispatch({
        type: DESELECT_ROW,
        payload: {
          value,
        },
        opts: { sideEffect },
      })
    },
    [dispatch]
  )

  const actions = useMemo(() => {
    return {
      updateTableData,
      expandTable,
      collapseTable,
      selectAllRows,
      deselectAllRows,
      selectRow,
      deselectRow,
    }
  }, [
    updateTableData,
    expandTable,
    collapseTable,
    selectAllRows,
    deselectAllRows,
    selectRow,
    deselectRow,
  ])

  return [state, actions]
}
