// @flow
import createContext from '@helpscout/react-utils/dist/createContext'
import { noop } from '../../utilities/other'

const Context = createContext({
  closeModal: noop,
})

export default Context
