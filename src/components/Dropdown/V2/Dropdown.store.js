// Should be a .ts file
// Couldn't figure out how to make this play nicely with Jest.
import unistoreCreateStore from 'unistore'
import reducer from './Dropdown.reducer'
import { noop } from '../../../utilities/other'

export const initialState = {
  activeClassName: 'is-active',
  activeIndex: '',
  activeItem: null,
  closeOnSelect: true,
  clearOnSelect: true,
  direction: 'right',
  dropUp: false,
  enableTabNavigation: true,
  envNode: document,
  focusClassName: 'is-focused',
  index: null,
  isLoading: false,
  isOpen: false,
  isMounted: false,
  indexMap: [],
  previousInputValue: '',
  inputValue: '',
  items: [],
  lastInteractionType: undefined,
  maxHeight: 320,
  maxWidth: 360,
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
  previousIndex: null,
  previousSelectedIndex: '',
  selectedIndex: '',
  selectedItem: '',
  stateReducer: state => state,
  subscribe: noop,
  trigger: 'Dropdown',
  withScrollLock: true,
  zIndex: 1080,
}

// This ensures that every dropdown instance will have their own unique
// store/state. Creating the store and exporting it (like you normally would)
// would mean that all dropdowns share the same store. And we don't want that!

export const createStore = (props = initialState) => unistoreCreateStore(props)

export const dispatch = (state = {}, action = {}) => {
  return reducer(state, action)
}

export default createStore
