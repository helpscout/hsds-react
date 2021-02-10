import React, { useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import { noop } from '../../utilities/other'
import {
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

const regularItems = ItemSpec.generate(5)
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
  closeOnSelection = false,
  withMultipleSelection = true,
  onSelect = noop,
  animate = {},
  tippy = {},
  toggler = {},
}) {
  const [isDropdownOpen, setDropdownState] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useWarnings({ toggler, withMultipleSelection })

  const onSelectionChange = selection => {
    onSelect(selection)
    setSelectedItem(selection)
  }

  function openDropdwon(isOpen) {
    setDropdownState(isOpen)
  }

  const tippyProps = {
    interactive: true,
    placement: 'bottom-start',
    ...tippy,
  }

  const animateProps = {
    animateOnMount: false,
    duration: 200,
    easing: 'ease-in-out',
    sequence: 'fade down',
    unmountOnExit: false,
    ...animate,
  }

  let Toggler

  if (React.isValidElement(toggler)) {
    const { onClick } = toggler.props
    const props = {
      onClick: () => {
        onClick && onClick()
        setDropdownState(!isDropdownOpen)
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
          setDropdownState(!isDropdownOpen)
        }}
        text="Fallback Toggler"
      />
    )
  }

  return (
    <Tippy
      {...tippyProps}
      visible={isDropdownOpen}
      onClickOutside={() => {
        setDropdownState(false)
      }}
      onHidden={({ reference }) => {
        reference.focus()
      }}
      render={() => (
        <Animate {...animateProps} in={isDropdownOpen}>
          <Combobox
            withMultipleSelection={
              isSelectTypeToggler(toggler) ? false : withMultipleSelection
            }
            isDropdownOpen={isDropdownOpen}
            items={regularItems}
            closeOnSelection={closeOnSelection}
            openDropdwon={openDropdwon}
            onSelectionChange={onSelectionChange}
          />
        </Animate>
      )}
    >
      {Toggler}
    </Tippy>
  )
}

export default DropListManager
