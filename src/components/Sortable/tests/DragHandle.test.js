import React from 'react'
import DragHandle from '../DragHandle'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-SortableDragHandle',
  skipChildrenTest: true
}

baseComponentTest(DragHandle, baseComponentOptions)

describe('Sortable', () => {
  test('Uses SortableHandle HOC', () => {
    const wrapper = (<DragHandle />)

    expect(wrapper.type.displayName.toLowerCase()).toContain('sortablehandle')
  })
})
