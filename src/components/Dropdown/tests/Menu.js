import Menu from '../Menu'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-DropdownMenu',
  skipChildren: true
}

baseComponentTest(Menu, baseComponentOptions)
