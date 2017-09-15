import List from '../List'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-SortableList',
  skipChildrenTest: true
}

baseComponentTest(List, baseComponentOptions)
