import actionTypes from './Dropdown.actionTypes'
import { initialState } from './Dropdown.store'

export const initialItemState = {
  activeItem: null,
  activeIndex: null,
  activeValue: null,
  activeId: null,
  index: null,
  previousIndex: null,
  selectedIndex: '',
  previousSelectedIndex: '',
}

const reducer = (state = initialState, action) => {
  let nextState
  const { payload } = action

  switch (action.type) {
    // Interactions
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
      nextState = { ...payload }
      break

    case actionTypes.SELECT_ITEM:
      nextState = { ...payload }
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
  }

  return state.stateReducer(
    {
      ...state,
      ...nextState,
    },
    action
  )
}

export default reducer
