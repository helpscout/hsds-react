// Should be a .ts file
// Couldn't figure out how to make this play nicely with Jest.
import unistoreCreateStore from 'unistore'
import { noop } from '../../../utilities/other'

export const initialState = {
  activeClassName: 'is-active',
  activeIndex: '',
  activeItem: null,
  closeOnSelect: true,
  direction: 'right',
  dropUp: false,
  enableTabNavigation: true,
  focusClassName: 'is-focused',
  index: null,
  isLoading: false,
  isOpen: false,
  isMounted: false,
  indexMap: [],
  items: [],
  lastInteractionType: undefined,
  maxHeight: 320,
  maxWidth: 360,
  minHeight: 48,
  minWidth: 180,
  onClose: noop,
  onOpen: noop,
  onSelect: noop,
  openClassName: 'is-open',
  previousIndex: null,
  previousSelectedIndex: '',
  selectedIndex: '',
  selectedItem: '',
  zIndex: 1080,
}

// This ensures that every dropdown instance will have their own unique
// store/state. Creating the store and exporting it (like you normally would)
// would mean that all dropdowns share the same store. And we don't want that!

export const createStore = (props = initialState) => unistoreCreateStore(props)

export default createStore
