import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import useDeepCompareEffect from 'use-deep-compare-effect'
import debounce from 'lodash.debounce'
import classNames from 'classnames'
import Tippy from '@tippyjs/react/headless'
import { noop } from '../../utilities/other'
import { GlobalContext } from '../HSDS/Provider'
import { DROPLIST_TOGGLER, VARIANTS } from './DropList.constants'
import { getAnimateProps, getTippyProps } from './DropList.config'
import {
  findItemInArray,
  flattenListItems,
  getDropListVariant,
  getItemContentKeyName,
  isTogglerOfType,
  itemToString,
  parseSelectionFromProps,
  removeItemFromArray,
  requiredItemPropsCheck,
  useWarnings,
} from './DropList.utils'
import {
  SimpleButton,
  SelectTag,
  getTogglerPlacementProps,
} from './DropList.togglers'
import Animate from '../Animate'

const DEBOUNCE_TIME = process.env.NODE_ENV !== 'test' ? 10 : 0

function DropListManager({
  animateOptions = {},
  autoSetComboboxAt = 0,
  clearOnSelect = false,
  closeOnBlur = true,
  closeOnClickOutside = true,
  closeOnSelection = true,
  customEmptyList = null,
  'data-cy': dataCy,
  enableLeftRightNavigation = false,
  focusTogglerOnMenuClose = true,
  getTippyInstance = noop,
  isMenuOpen = false,
  items = [],
  menuCSS,
  onMenuBlur = noop,
  onMenuFocus = noop,
  onListItemSelectEvent = noop,
  onOpenedStateChange = noop,
  onSelect = noop,
  renderCustomListItem = null,
  selection = null,
  tippyOptions = {},
  toggler = {},
  variant = VARIANTS.SELECT,
  withMultipleSelection = false,
}) {
  const [isOpen, setOpenedState] = useState(false)
  const tippyInstanceRef = useRef(null)
  const parsedSelection = parseSelectionFromProps({
    withMultipleSelection,
    selection,
  })
  const [selectedItem, setSelectedItem] = useState(parsedSelection)
  const [selectedItems, setSelectedItems] = useState(
    withMultipleSelection ? parsedSelection : []
  )
  const [parsedItems, setParsedItems] = useState(flattenListItems(items))

  const { getCurrentScope } = useContext(GlobalContext) || {}
  const scope = getCurrentScope ? getCurrentScope() : null

  const animateProps = getAnimateProps(animateOptions)
  const tippyProps = getTippyProps(tippyOptions)

  const Toggler = decorateUserToggler(toggler)
  const DropListVariant = getDropListVariant({
    autoSetComboboxAt,
    numberOfItems: parsedItems.length,
    variant,
  })

  useWarnings({ toggler, withMultipleSelection, menuCSS, tippyOptions })

  useDeepCompareEffect(() => {
    if (withMultipleSelection) {
      setSelectedItems(parsedSelection)
    } else {
      setSelectedItem(parsedSelection)
    }
  }, [{ state: parsedSelection }, withMultipleSelection])

  useDeepCompareEffect(() => {
    setParsedItems(flattenListItems(items))
  }, [items])

  useEffect(() => {
    setOpenedState(isMenuOpen)
  }, [isMenuOpen])

  function decorateUserToggler(userToggler) {
    if (React.isValidElement(userToggler)) {
      const { onClick, className } = userToggler.props
      const togglerProps = {
        className: classNames(DROPLIST_TOGGLER, className),
        isActive: isOpen,

        onClick: e => {
          onClick && onClick(e)
          debouncedTogglerFn(!isOpen)
        },
      }

      if (userToggler.type === SelectTag) {
        const { text } = userToggler.props

        if (text == null) {
          togglerProps.text = itemToString(selectedItem)
        }
      }

      const { placement, offset } = getTogglerPlacementProps(
        userToggler,
        tippyOptions
      )

      tippyProps.placement = placement
      tippyProps.offset = offset

      return React.cloneElement(userToggler, togglerProps)
    }

    return <SimpleButton text="Fallback Toggler" />
  }

  const debouncedTogglerFn = debounce(function toggleOpenedState(shouldOpen) {
    setOpenedState(shouldOpen)
    onOpenedStateChange(shouldOpen)
  }, DEBOUNCE_TIME)

  function handleSelectedItemChange({ selectedItem }) {
    if (selectedItem == null) {
      setSelectedItem(null)
      return
    }

    if (selectedItem.isDisabled) {
      return
    }

    if (withMultipleSelection) {
      if (selectedItem) {
        const { remove } = selectedItem
        let updatedSelection = []

        if (!Boolean(remove)) {
          updatedSelection = selectedItems.concat(selectedItem)
        } else {
          const contentKey = getItemContentKeyName(selectedItem)
          const itemToRemove = findItemInArray({
            arr: selectedItems,
            item: selectedItem,
            key: contentKey,
          })

          if (Boolean(itemToRemove)) {
            updatedSelection = removeItemFromArray({
              arr: selectedItems,
              item: itemToRemove,
              key: contentKey,
            })
          }
        }

        setSelectedItems(updatedSelection)
        onSelect(updatedSelection, selectedItem)
      }
    } else {
      setSelectedItem(selectedItem || null)
      onSelect(selectedItem, selectedItem)
    }
  }

  return (
    <Tippy
      {...tippyProps}
      onCreate={instance => {
        tippyInstanceRef.current = instance
        instance.popper && instance.popper.classList.add('DropList-Tippy')
        getTippyInstance(instance)
      }}
      onDestroy={() => {
        tippyInstanceRef.current = null
      }}
      showOnCreate={isMenuOpen}
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

        debouncedTogglerFn(false)
      }}
      render={() => (
        <Animate
          {...animateProps}
          in={isOpen}
          onEnter={e => {
            if (tippyInstanceRef.current) {
              tippyInstanceRef.current.show()

              if (tippyOptions.appendTo) {
                tippyInstanceRef.current.popper.classList.add(
                  scope ? scope : 'hsds-react'
                )
              }
            }
          }}
          onEntered={element => {
            const dropListEventDriverNode = element.querySelector(
              '[data-event-driver]'
            )
            dropListEventDriverNode && dropListEventDriverNode.focus()
          }}
          onExiting={() => {
            if (tippyInstanceRef.current) {
              focusTogglerOnMenuClose &&
                tippyInstanceRef.current.reference.focus()
            }
          }}
          onExited={() => {
            if (tippyInstanceRef.current) {
              tippyInstanceRef.current.hide()
            }
          }}
        >
          <DropListVariant
            clearOnSelect={clearOnSelect}
            closeOnBlur={closeOnBlur}
            closeOnSelection={closeOnSelection}
            customEmptyList={customEmptyList}
            data-cy={dataCy}
            enableLeftRightNavigation={enableLeftRightNavigation}
            handleSelectedItemChange={handleSelectedItemChange}
            isOpen={isOpen}
            items={parsedItems}
            menuCSS={menuCSS}
            onMenuBlur={onMenuBlur}
            onMenuFocus={onMenuFocus}
            onListItemSelectEvent={onListItemSelectEvent}
            renderCustomListItem={renderCustomListItem}
            selectedItem={selectedItem}
            selectedItems={selectedItems}
            toggleOpenedState={debouncedTogglerFn}
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
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisabled: PropTypes.bool,
  label: requiredItemPropsCheck,
  value: requiredItemPropsCheck,
  type: PropTypes.string,
})

const dividerShape = PropTypes.shape({
  type: PropTypes.oneOf(['divider', 'Divider']).isRequired,
})

const groupShape = PropTypes.shape({
  label: requiredItemPropsCheck,
  value: requiredItemPropsCheck,
  type: PropTypes.oneOf(['group', 'Group']).isRequired,
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, itemShape])),
})

DropListManager.propTypes = {
  /** Props to configure the DropList animation (see [HSDS Animate](/?path=/docs/utilities-animation-animate--default-story)) */
  animateOptions: PropTypes.object,
  /** When the number of items is larger than this number, automatically set the variant to combobox */
  autoSetComboboxAt: PropTypes.number,
  /** Clears selected item on select */
  clearOnSelect: PropTypes.bool,
  /** Whether to close the DropList on blur (useful when debugging) */
  closeOnBlur: PropTypes.bool,
  /** Whether to close the DropList when clicking outside the droplist */
  closeOnClickOutside: PropTypes.bool,
  /** Whether to close the DropList when an item is selected */
  closeOnSelection: PropTypes.bool,
  /** Pass a React Element to render a custom message or style when the List is empty */
  customEmptyList: PropTypes.any,
  /** Data attr applied to the DropList for Cypress tests. By default one of 'DropList.Select' or 'DropList.Combobox' depending on the variant used */
  'data-cy': PropTypes.string,
  /** Enable navigation with Right and Left arrows (useful for horizontally rendered lists) */
  enableLeftRightNavigation: PropTypes.bool,
  /** Automatically moves the focus back to the toggler when the DropList is closed */
  focusTogglerOnMenuClose: PropTypes.bool,
  /** Retrieves the tippy instance */
  getTippyInstance: PropTypes.any,
  /** Open/close the DropList externally */
  isMenuOpen: PropTypes.bool,
  /** Items to populate the list with */
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, itemShape, dividerShape, groupShape])
  ),
  /** Custom css for the Menu */
  menuCSS: PropTypes.any,
  /** Callback that fires when the menu loses focus */
  onMenuBlur: PropTypes.func,
  /** Callback that fires when the menu gets focus */
  onMenuFocus: PropTypes.func,
  /** Downshift does not provide the event on select, this callback fires when selecting an item (clicking, keydown enter (and space on Select variant)), gives you the DOM selected item as listItemNode and the original event */
  onListItemSelectEvent: PropTypes.func,
  /** Callback that fires whenever the DropList opens and closes */
  onOpenedStateChange: PropTypes.func,
  /** Callback that fires whenever the selection in the DropList changes, signature: `onSelect(selection, clickedItem)` */
  onSelect: PropTypes.func,
  /** Render prop that allows you to render a custom List Item */
  renderCustomListItem: PropTypes.func,
  /** An item or array of items to be selected */
  selection: PropTypes.oneOfType([
    PropTypes.string,
    itemShape,
    PropTypes.arrayOf(itemShape),
  ]),
  /** Options to configure Tippy (https://atomiks.github.io/tippyjs/v6/all-props/)*/
  tippyOptions: PropTypes.object,
  /** A component to render as the "toggler" or "trigger", a set of built-in options are provided: Button, IconButton, MeatButton, SelectTag, SplitButton */
  toggler: PropTypes.element,
  /** The type of DropList, standard ("select") or searchable ("combobox") */
  variant: PropTypes.oneOf(['select', 'Select', 'combobox', 'Combobox']),
  /** Enable multiple selection of items */
  withMultipleSelection: PropTypes.bool,
}

export default DropListManager
