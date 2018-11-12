import createStore from 'unistore'
import { noop } from '../../../utilities/other'

export interface DropdownState {
  activeItem?: HTMLElement | null
  activeIndex?: string
  closeOnSelect: boolean
  isOpen: boolean
  items: Array<any>
  direction: 'left' | 'right'
  dropUp: boolean
  onOpen: () => void
  onClose: () => void
  onSelect: (item: Object, props: Object) => void
}

export const initialState: DropdownState = {
  activeItem: null,
  activeIndex: '',
  closeOnSelect: true,
  items: [],
  isOpen: false,
  direction: 'right',
  dropUp: false,
  onOpen: noop,
  onClose: noop,
  onSelect: noop,
}

const store = createStore(initialState)

export default store
