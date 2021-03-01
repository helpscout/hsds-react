import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless'
import { noop } from '../../utilities/other'
import { GlobalContext } from '../HSDS/Provider'
import { VARIANTS } from './DropList.constants'
import {
  flattenListItems,
  itemToString,
  isTogglerOfType,
  useWarnings,
} from './DropList.utils'
import {
  Button,
  SelectTag,
  getTogglerPlacementProps,
} from './DropList.togglers'
import Animate from '../Animate'
import Combobox from './DropList.Combobox'
import Select from './DropList.Select'

function DropListManager({
  animateOptions = {},
  autoSetComboboxAt = 0,
  closeOnClickOutside = true,
  closeOnSelection = true,
  customEmptyList = null,
  'data-cy': dataCy,
  initialIsOpen = false,
  initialSelectedItem = null,
  items = [],
  onOpenedStateChange = noop,
  onSelect = noop,
  renderCustomListItem = null,
  tippyOptions = {},
  toggler = {},
  variant = VARIANTS.SELECT,
  withMultipleSelection = false,
}) {
  const parsedItems = flattenListItems(items)
  const [isOpen, setOpenedState] = useState(initialIsOpen)
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem)
  const { getCurrentScope } = useContext(GlobalContext) || {}
  const scope = getCurrentScope ? getCurrentScope() : null

  useWarnings({ toggler, withMultipleSelection })

  function onSelectionChange(selection) {
    onSelect(selection)
    setSelectedItem(selection)
  }

  function toggleOpenedState(isOpen) {
    setOpenedState(isOpen)
    onOpenedStateChange(isOpen)
  }

  const animateProps = {
    duration: 200,
    easing: 'ease-in-out',
    sequence: 'fade down',
    ...animateOptions,
    // These shouldn't be overriden
    animateOnMount: true,
    mountOnEnter: false,
    unmountOnExit: false,
  }
  const tippyProps = {
    interactive: true,
    placement: 'bottom-start',
    ...tippyOptions,
  }
  let Toggler

  if (React.isValidElement(toggler)) {
    const { onClick } = toggler.props
    const togglerProps = {
      onClick: e => {
        onClick && onClick(e)
        toggleOpenedState(!isOpen)
      },
      isActive: isOpen,
    }

    if (toggler.type === SelectTag) {
      const { text } = toggler.props

      if (text == null) {
        togglerProps.text = itemToString(selectedItem)
      }
    }

    const { placement, offset } = getTogglerPlacementProps(toggler)
    tippyProps.placement = placement
    tippyProps.offset = offset

    Toggler = React.cloneElement(toggler, togglerProps)
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
    variant.toLowerCase() === VARIANTS.COMBOBOX ||
    (autoSetComboboxAt > 0 && parsedItems.length >= autoSetComboboxAt)
      ? Combobox
      : Select

  return (
    <Tippy
      {...tippyProps}
      visible={isOpen}
      onClickOutside={(instance, { target }) => {
        if (
          target.dataset.ignoreToggling &&
          target.dataset.ignoreToggling === 'true'
        ) {
          return
        }
        if (!closeOnClickOutside) {
          return
        }

        toggleOpenedState(false)
      }}
      onShow={({ popper }) => {
        if (scope && tippyOptions.appendTo) {
          popper.classList.add(scope)
        }
      }}
      onHidden={({ reference }) => {
        reference.focus()
      }}
      render={() => (
        <Animate {...animateProps} in={isOpen}>
          <DropListVariant
            closeOnSelection={closeOnSelection}
            customEmptyList={customEmptyList}
            data-cy={dataCy}
            initialSelectedItem={initialSelectedItem}
            isOpen={isOpen}
            items={parsedItems}
            onSelectionChange={onSelectionChange}
            renderCustomListItem={renderCustomListItem}
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

const itemShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
})
const dividerShape = PropTypes.shape({
  type: PropTypes.oneOf(['divider', 'Divider']).isRequired,
})
const groupShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['group', 'Group']).isRequired,
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, itemShape])),
})

DropListManager.propTypes = {
  /** Props to configure the DropList animation (see [HSDS Animate](/?path=/docs/utilities-animation-animate--default-story)) */
  animateOptions: PropTypes.object,
  /** When the number of items is larger than this number, automatically set the variant to combobox */
  autoSetComboboxAt: PropTypes.number,
  /** Whether to close the DropList when clicking outside the droplist */
  closeOnClickOutside: PropTypes.bool,
  /** Whether to close the DropList when an item is selected */
  closeOnSelection: PropTypes.bool,
  /** Pass a React Element to render a custom message or style when the List is empty */
  customEmptyList: PropTypes.element,
  /** Data attr applied to the DropList for Cypress tests. By default one of 'DropList.Select' or 'DropList.Combobox' depending on the variant used */
  'data-cy': PropTypes.string,
  /** Should the DropList be open on mount */
  initialIsOpen: PropTypes.bool,
  /** An item or array of items to be selected on initial mount */
  initialSelectedItem: PropTypes.oneOfType([
    PropTypes.string,
    itemShape,
    PropTypes.arrayOf(itemShape),
  ]),
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, itemShape, dividerShape, groupShape])
  ),
  /** Callback that fires whenever the DropList opens and closes */
  onOpenedStateChange: PropTypes.func,
  /** Callback that fires whenever the selection in the DropList changes */
  onSelect: PropTypes.func,
  /** Render prop that allows you to render a custom List Item */
  renderCustomListItem: PropTypes.func,
  /** Options to configure Tippy (https://atomiks.github.io/tippyjs/v6/all-props/)*/
  tippyOptions: PropTypes.object,
  /** A component to render as the "toggler" or "trigger", a set of built-in options are provided: Button, IconButton, Kebab, SelectTag, SplitButton */
  toggler: PropTypes.element,
  /** The type of DropList, standard ("select") or searchable ("combobox") */
  variant: PropTypes.oneOf(['select', 'Select', 'combobox', 'Combobox']),
  /** Enable multiple selection of items */
  withMultipleSelection: PropTypes.bool,
}

export default DropListManager
