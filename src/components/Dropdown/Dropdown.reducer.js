// Deprecated
/* istanbul ignore file */
import actionTypes from './Dropdown.actionTypes'
import { initialState } from './Dropdown.store'
import isFunction from 'lodash.isfunction'

export const initialItemState = {
  index: null,
  previousIndex: null,
}

const reducer = (state = initialState, action = {}) => {
  let nextState
  const { payload } = action

  switch (action.type) {
    // Interactions
    case actionTypes.CHANGE_DIRECTION:
      nextState = {
        direction: state.direction === 'right' ? 'left' : 'right',
      }
      break

    case actionTypes.OPEN_DROPDOWN:
      nextState = {
        ...initialItemState,
        isOpen: true,
        ...payload,
      }
      break

    case actionTypes.CLOSE_DROPDOWN:
      nextState = {
        ...initialItemState,
        isOpen: false,
      }
      break

    case actionTypes.MENU_MOUNT:
      nextState = {
        isMounted: true,
      }
      break

    case actionTypes.MENU_UNMOUNT:
      nextState = {
        isMounted: false,
      }
      break

    case actionTypes.FOCUS_ITEM:
      nextState = { ...payload, previousIndex: state.index }
      break

    case actionTypes.SELECT_ITEM:
      nextState = {
        ...payload,
        isOpen: state.closeOnSelect ? false : state.isOpen,
        previousSelectedItem: state.selectedItem,
      }
      break

    case actionTypes.UPDATE_SELECTED_ITEM:
      nextState = {
        ...state,
        previousSelectedItem: state.selectedItem,
        selectedItem: payload.selectedItem,
      }
      break

    case actionTypes.CLEAR_SELECTION:
      nextState = {
        ...payload,
        previousSelectedItem: state.selectedItem,
        isOpen: state.closeOnSelect ? false : state.isOpen,
      }
      break

    // Node references
    case actionTypes.SET_MENU_NODE:
      nextState = { ...payload }
      break

    case actionTypes.SET_TRIGGER_NODE:
      nextState = { ...payload }
      break

    // Data
    case actionTypes.UPDATE_ITEMS:
      nextState = { ...payload }
      break

    case actionTypes.UPDATE_INPUT_VALUE:
      nextState = { ...payload }
      break

    case actionTypes.UPDATE_INDEX:
      nextState = { ...payload }
      break

    case actionTypes.UPDATE_OPEN:
      nextState = { ...payload }
      break

    case actionTypes.UPDATE_DROPUP:
      nextState = { ...payload }
      break
    // This prevents eslint errors
    default:
      break
  }

  const nextReducedState = {
    ...state,
    ...nextState,
  }

  if (isFunction(state.stateReducer)) {
    return state.stateReducer(nextReducedState, action)
  } else {
    return nextReducedState
  }
}

export default reducer
