// Deprecated
/* istanbul ignore file */
import unistoreCreateStore from '@helpscout/wedux'
import reducer from './Dropdown.reducer'

function noop() {}

export const initialState = {
  activeClassName: 'is-active',
  clearOnSelect: true,
  closeOnSelect: true,
  direction: 'right',
  dropUp: false,
  enableTabNavigation: true,
  enableLeftRightArrowNavigation: false,
  envNode: document,
  focusClassName: 'is-focused',
  forceDropDown: false,
  getState: noop,
  index: null,
  indexMap: [],
  inputValue: '',
  isLoading: false,
  isMounted: false,
  isOpen: false,
  isFocusSelectedItemOnOpen: false,
  isSelectFirstItemOnOpen: false,
  items: [],
  lastInteractionType: undefined,
  maxHeight: 320,
  maxWidth: 360,
  menuOffsetTop: 0,
  minHeight: 48,
  minWidth: 180,
  onBlur: noop,
  onClose: noop,
  onFocus: noop,
  onMenuMount: noop,
  onMenuUnmount: noop,
  onOpen: noop,
  onSelect: noop,
  openClassName: 'is-open',
  positionFixed: false,
  previousIndex: null,
  selectedItem: '',
  shouldDropDirectionUpdate: () => true,
  shouldRefocusOnClose: () => true,
  stateReducer: state => state,
  subscribe: noop,
  trigger: 'Dropdown',
  triggerProps: {},
  triggerStyle: {},
  withScrollLock: true,
  zIndex: 1080,
}

// This ensures that every dropdown instance will have their own unique
// store/state. Creating the store and exporting it (like you normally would)
// would mean that all dropdowns share the same store. And we don't want that!

export const createStore = (props = initialState) => unistoreCreateStore(props)

export const dispatch = (state = initialState, action = {}) => {
  return reducer(state, action)
}

export default createStore
