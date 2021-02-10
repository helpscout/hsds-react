import React, { useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import { noop } from '../../utilities/other'
import {
  flattenGroups,
  itemToString,
  isSelectTypeToggler,
  useWarnings,
} from './DropList.utils'
import {
  ItemSpec,
  itemsWithDivider,
  groupedItems,
} from '../../utilities/specs/dropdown.specs'

import { Button, SelectTag, ThreeDots } from './DropList.togglers'
import Animate from '../Animate'
import Combobox from './DropList.Combobox'
import Select from './DropList.Select'

const regularItems = ItemSpec.generate(15)
const plainItems = [
  'hello',
  'hola',
  'goodbye',
  'adios',
  'alo',
  'arrivederci',
  'gutten tag',
]
function DropListManager({
  closeOnSelection = true,
  initialIsOpen = false,
  initialSelectedItem = groupedItems[0].items[3],
  items = groupedItems,
  withMultipleSelection = true,
  onOpenedStateChange = noop,
  onSelect = noop,
  animate = {},
  tippy = {},
  toggler = {},
}) {
  const parsedItems = flattenGroups(items)
  const [isOpen, setOpenedState] = useState(initialIsOpen)
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem)

  useWarnings({ toggler, withMultipleSelection })

  const onSelectionChange = selection => {
    onSelect(selection)
    setSelectedItem(selection)
  }

  function toggleOpenedState(isOpen) {
    setOpenedState(isOpen)
    onOpenedStateChange(isOpen)
  }

  const tippyProps = {
    interactive: true,
    placement: 'bottom-start',
    ...tippy,
  }

  const animateProps = {
    duration: 200,
    easing: 'ease-in-out',
    sequence: 'fade down',
    ...animate,
    // These shouldn't be overriden
    animateOnMount: true,
    mountOnEnter: false,
    unmountOnExit: false,
  }

  let Toggler

  if (React.isValidElement(toggler)) {
    const { onClick } = toggler.props
    const props = {
      onClick: () => {
        onClick && onClick()
        toggleOpenedState(!isOpen)
      },
    }

    if (toggler.type === SelectTag) {
      const { text } = toggler.props

      if (text == null) {
        props.text = itemToString(selectedItem)
      }
    }

    if (toggler.type === ThreeDots) {
      tippyProps.placement = 'bottom-end'
      tippyProps.offset = [0, 3]
    }

    Toggler = React.cloneElement(toggler, props)
  } else {
    Toggler = (
      <Button
        onClick={() => {
          toggleOpenedState(!isOpen)
        }}
        text="Fallback Toggler"
      />
    )
  }

  return (
    <Tippy
      {...tippyProps}
      visible={isOpen}
      onClickOutside={() => {
        toggleOpenedState(false)
      }}
      onHidden={({ reference }) => {
        reference.focus()
      }}
      render={() => (
        <Animate {...animateProps} in={isOpen}>
          <Combobox
            closeOnSelection={closeOnSelection}
            initialSelectedItem={initialSelectedItem}
            isOpen={isOpen}
            items={parsedItems}
            onSelectionChange={onSelectionChange}
            toggleOpenedState={toggleOpenedState}
            withMultipleSelection={
              isSelectTypeToggler(toggler) ? false : withMultipleSelection
            }
          />
        </Animate>
      )}
    >
      {Toggler}
    </Tippy>
  )
}

export default DropListManager
