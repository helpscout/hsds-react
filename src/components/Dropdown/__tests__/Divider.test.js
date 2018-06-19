import Divider from '../Divider'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-DropdownDivider',
  skipChildrenTest: true,
}

baseComponentTest(Divider, baseComponentOptions)
