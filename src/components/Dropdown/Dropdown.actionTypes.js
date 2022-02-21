// Deprecated
/* istanbul ignore file */

export const createActionTypes = (actionTypes = [], namespace = '@@HSDS') => {
  return actionTypes.reduce((types, type) => {
    return { ...types, [type]: `${namespace}/${type}` }
  }, {})
}

const actionTypes = [
  'CHANGE_DIRECTION',
  'CLEAR_SELECTION',
  'CLOSE_DROPDOWN',
  'FOCUS_ITEM',
  'MENU_MOUNT',
  'MENU_UNMOUNT',
  'MENU_REPOSITION',
  'OPEN_DROPDOWN',
  'SELECT_ITEM',
  'SET_MENU_NODE',
  'SET_TRIGGER_NODE',
  'UPDATE_DROPUP',
  'UPDATE_INDEX',
  'UPDATE_INPUT_VALUE',
  'UPDATE_ITEMS',
  'UPDATE_OPEN',
  'UPDATE_SELECTED_ITEM',
]

export default createActionTypes(actionTypes, '@@HSDS/DROPDOWN')
