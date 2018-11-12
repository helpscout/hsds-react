import createStore from 'unistore'

export const initialState = {
  activeItem: null,
  activeIndex: '',
  items: [],
  direction: 'right',
  dropUp: false,
}

const store = createStore(initialState)

export default store
