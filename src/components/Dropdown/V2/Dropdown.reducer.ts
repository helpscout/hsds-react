import actionTypes from './Dropdown.actionTypes'
import { initialState } from './Dropdown.store'
import { processSelectionOfItem } from './Dropdown.utils'
import { isFunction } from '../../../utilities/is'

export const initialItemState = {
  index: null,
  previousIndex: null,
}

const reducer = (state = initialState, action: any = {}) => {
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

    case actionTypes.CLEAR_SELECTION:
      nextState = {
        selectedItem: payload.selectedItem,
        previousSelectedItem: state.selectedItem,
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
