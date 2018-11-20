// Should be a .ts file
// Couldn't figure out how to make this play nicely with Jest.
import unistoreCreateStore from 'unistore'
import { noop } from '../../../utilities/other'

export const initialState = {
  activeItem: null,
  activeIndex: '',
  closeOnSelect: true,
  items: [],
  isOpen: false,
  isLoading: false,
  direction: 'right',
  dropUp: false,
  minWidth: 180,
  maxWidth: 360,
  minHeight: 48,
  maxHeight: 320,
  onOpen: noop,
  onClose: noop,
  onSelect: noop,
  selectedItem: '',
  zIndex: 1080,
}

// This ensures that every dropdown instance will have their own unique
// store/state. Creating the store and exporting it (like you normally would)
// would mean that all dropdowns share the same store. And we don't want that!

export const createStore = (props = initialState) => unistoreCreateStore(props)

export default createStore
