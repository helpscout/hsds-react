import createStore from 'unistore'

export interface DropdownState {
  activeItem?: HTMLElement | null
  activeIndex?: string
  closeOnSelect: boolean
  isOpen: boolean
  items: Array<any>
  direction: 'left' | 'right'
  dropUp: boolean
}

export const initialState: DropdownState = {
  activeItem: null,
  activeIndex: '',
  closeOnSelect: true,
  items: [],
  isOpen: false,
  direction: 'right',
  dropUp: false,
}

const store = createStore(initialState)

export default store
