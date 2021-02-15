import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless'
import { noop } from '../../utilities/other'
import {
  flattenGroups,
  itemToString,
  isSplitButtonAction,
  isTogglerOfType,
  useWarnings,
} from './DropList.utils'
import { Button, SelectTag, SplitButton, ThreeDots } from './DropList.togglers'
import Animate from '../Animate'
import Combobox from './DropList.Combobox'
import Select from './DropList.Select'

function DropListManager({
  animate = {},
  autoSetComboboxAt = 0,
  closeOnSelection = true,
  customEmptyList = null,
  initialIsOpen = false,
  initialSelectedItem = null,
  items = [],
  onOpenedStateChange = noop,
  onSelect = noop,
  renderCustomListItem = null,
  tippy = {},
  toggler = {},
  variant = 'select',
  withMultipleSelection = false,
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

  const DropListVariant =
    variant === 'combobox' ||
    (autoSetComboboxAt > 0 && parsedItems.length >= autoSetComboboxAt)
      ? Combobox
      : Select

  return (
    <Tippy
      {...tippyProps}
      visible={isOpen}
      onClickOutside={(instance, { target }) => {
        if (!isSplitButtonAction({ el: target, toggler })) {
          toggleOpenedState(false)
        }
      }}
      onHidden={({ reference }) => {
        reference.focus()
      }}
      render={() => (
        <Animate {...animateProps} in={isOpen}>
          <DropListVariant
            closeOnSelection={closeOnSelection}
            initialSelectedItem={initialSelectedItem}
            isOpen={isOpen}
            items={parsedItems}
            onSelectionChange={onSelectionChange}
            renderCustomListItem={renderCustomListItem}
            customEmptyList={customEmptyList}
            toggleOpenedState={toggleOpenedState}
            withMultipleSelection={
              isTogglerOfType(toggler, SelectTag)
                ? false
                : withMultipleSelection
            }
          />
        </Animate>
      )}
    >
      {Toggler}
    </Tippy>
  )
}

DropListManager.propTypes = {
  /** Props to configure the DropList animation (see HSDS Animate) */
  animate: PropTypes.object,
  /** When the number of items is larger than this number, set the variant to combobox (make the DropList searchable) */
  autoSetComboboxAt: PropTypes.number,
  /** Whether to close the DropList when an item is selected */
  closeOnSelection: PropTypes.bool,
  /** Pass a React Element to render a custom message or style when the List is empty */
  customEmptyList: PropTypes.element,
  /** Should the DropList be open on mount */
  initialIsOpen: PropTypes.bool,
  /** An item or array of items to be selected on initial mount */
  initialSelectedItem: PropTypes.any,
  /** The array of items for the DropList */
  items: PropTypes.array,
  /** Callback that fires whenever the DropList opens and closes */
  onOpenedStateChange: PropTypes.func,
  /** Callback that fires whenever the selection in the DropList changes */
  onSelect: PropTypes.func,
  /** Render prop that allows you to render a custom List Item (should be avoided, justification to divert from the standard should be provided) */
  renderCustomListItem: PropTypes.func,
  /** Options to configure Tippy */
  tippy: PropTypes.object,
  /** A component to render as the "toggler" or "trigger", a set of built-in options are provided: Button, SelectTag, ThreeDots */
  toggler: PropTypes.object,
  /** The type of DropList, standard ("select") or searchable ("combobox") */
  variant: PropTypes.oneOf(['select', 'Select', 'combobox', 'Combobox']),
  /** Enable multiple selection of items */
  withMultipleSelection: PropTypes.bool,
}

export default DropListManager
