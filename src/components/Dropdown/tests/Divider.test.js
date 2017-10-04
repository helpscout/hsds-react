import Divider from '../Divider'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-DropdownDivider',
  skipChildren: true
}

baseComponentTest(Divider, baseComponentOptions)
