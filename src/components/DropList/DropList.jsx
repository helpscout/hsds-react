import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import useDeepCompareEffect from 'use-deep-compare-effect'
import classNames from 'classnames'
import debounce from 'lodash.debounce'
import Tippy from '@tippyjs/react/headless'
import { DROPLIST_TOGGLER, VARIANTS } from './DropList.constants'
import { getAnimateProps, getTippyProps } from './DropList.config'
import {
  findItemInArray,
  flattenListItems,
  getDropListVariant,
  getItemContentKeyName,
  getMenuWidth,
  isItemAction,
  isItemRegular,
  isTogglerOfType,
  itemToString,
  parseSelectionFromProps,
  removeItemFromArray,
  requiredItemPropsCheck,
  useWarnings,
  isItemInert,
} from './DropList.utils'
import {
  SimpleButton,
  SelectTag,
  getTogglerPlacementProps,
} from './DropList.togglers'
import Animate from '../Animate'

const noop = () => undefined

function DropListManager({
  animateOptions = {},
  autoSetComboboxAt = 0,
  clearOnSelect = false,
  closeOnClickOutside = true,
  closeOnSelection = true,
  customEmptyList = null,
  customEmptyListItems,
  'data-cy': dataCy,
  enableLeftRightNavigation = false,
  focusTogglerOnMenuClose = true,
  getTippyInstance = noop,
  inputPlaceholder = 'Search',
  isMenuOpen = false,
  items = [],
  menuAriaLabel = '',
  menuCSS,
  menuWidth,
  onDropListLeave = noop,
  onInputChange = noop,
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
  const [parsedItems, setParsedItems] = useState(
    flattenListItems(items, withMultipleSelection)
  )

  const animateProps = getAnimateProps(animateOptions)
  const tippyProps = getTippyProps(tippyOptions)

  const Toggler = decorateUserToggler(toggler)
  const DropListVariant = getDropListVariant({
    autoSetComboboxAt,
    numberOfItems: parsedItems.filter(isItemRegular).length,
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
    setParsedItems(flattenListItems(items, withMultipleSelection))
  }, [items, withMultipleSelection])

  useEffect(() => {
    setOpenedState(isMenuOpen)
  }, [isMenuOpen])

  const debouncedOnDropListLeave = useMemo(
    () => debounce(onDropListLeave, 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  function decorateUserToggler(userToggler) {
    if (React.isValidElement(userToggler)) {
      const { className, onClick, onFocus, onBlur } = userToggler.props
      const togglerProps = {
        className: classNames(DROPLIST_TOGGLER, className),
        isActive: isOpen,
        onBlur: e => {
          onBlur && onBlur(e)
          if (!isOpen) {
            debouncedOnDropListLeave()
          }
        },
        onClick: e => {
          onClick && onClick(e)
          e.preventDefault()
          toggleOpenedState(!isOpen)
        },
        onFocus: e => {
          onFocus && onFocus(e)
          const { relatedTarget } = e

          if (
            isOpen &&
            relatedTarget &&
            relatedTarget.classList.contains('MenuList-Select')
          ) {
            toggleOpenedState(false)
          }
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

  function toggleOpenedState(shouldOpen) {
    setOpenedState(shouldOpen)
    onOpenedStateChange(shouldOpen)
  }

  function handleSelectedItemChange({ selectedItem }) {
    if (selectedItem == null) {
      setSelectedItem(null)
      return
    }

    if (selectedItem.isDisabled || isItemInert(selectedItem)) {
      return
    }

    if (isItemAction(selectedItem)) {
      onSelect(null, selectedItem)
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
        setSelectedItem(updatedSelection.length ? selectedItem : null)
        onSelect(updatedSelection, selectedItem)
      }
    } else {
      setSelectedItem(selectedItem || null)
      onSelect(selectedItem, selectedItem)
    }
  }

  function focusToggler() {
    tippyInstanceRef.current && tippyInstanceRef.current.reference.focus()
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

        toggleOpenedState(false)
        debouncedOnDropListLeave()
      }}
      render={() => (
        <Animate
          {...animateProps}
          in={isOpen}
          onEnter={e => {
            if (tippyInstanceRef.current) {
              tippyInstanceRef.current.show()

              if (tippyOptions.appendTo) {
                tippyInstanceRef.current.popper.classList.add('hsds-react')
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
            focusTogglerOnMenuClose && focusToggler()
          }}
          onExited={() => {
            tippyInstanceRef.current && tippyInstanceRef.current.hide()
          }}
        >
          <DropListVariant
            clearOnSelect={clearOnSelect}
            closeOnSelection={closeOnSelection}
            customEmptyList={customEmptyList}
            customEmptyListItems={customEmptyListItems}
            data-cy={dataCy}
            enableLeftRightNavigation={enableLeftRightNavigation}
            focusToggler={focusToggler}
            handleSelectedItemChange={handleSelectedItemChange}
            inputPlaceholder={inputPlaceholder}
            isOpen={isOpen}
            items={parsedItems}
            menuAriaLabel={menuAriaLabel}
            menuCSS={menuCSS}
            menuWidth={getMenuWidth(DropListVariant.name, menuWidth)}
            onDropListLeave={debouncedOnDropListLeave}
            onInputChange={onInputChange}
            onMenuBlur={onMenuBlur}
            onMenuFocus={onMenuFocus}
            onListItemSelectEvent={onListItemSelectEvent}
            renderCustomListItem={renderCustomListItem}
            selectedItem={selectedItem}
            selectedItems={selectedItems}
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
  /** Whether to close the DropList when clicking outside the droplist */
  closeOnClickOutside: PropTypes.bool,
  /** Whether to close the DropList when an item is selected */
  closeOnSelection: PropTypes.bool,
  /** Pass an Element to render a custom message or style when the List is empty */
  customEmptyList: PropTypes.any,
  /** To render "extra" items when the list is empty, as opposed to just customizing the rendering like `customEmptyList` does */
  customEmptyListItems: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, itemShape, dividerShape, groupShape])
  ),
  /** Data attr applied to the DropList for Cypress tests. By default one of 'DropList.Select' or 'DropList.Combobox' depending on the variant used */
  'data-cy': PropTypes.string,
  /** Enable navigation with Right and Left arrows (useful for horizontally rendered lists) */
  enableLeftRightNavigation: PropTypes.bool,
  /** Automatically moves the focus back to the toggler when the DropList is closed */
  focusTogglerOnMenuClose: PropTypes.bool,
  /** Retrieves the tippy instance */
  getTippyInstance: PropTypes.any,
  /** Customize the placeholder text on the combobox input */
  inputPlaceholder: PropTypes.string,
  /** Open/close the DropList externally */
  isMenuOpen: PropTypes.bool,
  /** Items to populate the list with */
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, itemShape, dividerShape, groupShape])
  ),
  /** Custom aria label for the Menu */
  menuAriaLabel: PropTypes.string,
  /** Custom css for the Menu */
  menuCSS: PropTypes.any,
  /** Custom width for the Menu */
  menuWidth: PropTypes.any,
  /** Callback that fires when combobox search input changes */
  onInputChange: PropTypes.func,
  /** Callback that fires when the menu loses focus */
  onMenuBlur: PropTypes.func,
  /** Callback that fires when the menu gets focus */
  onMenuFocus: PropTypes.func,
  /** Callback that fires when leaving the DropList entirely (including the toggler) */
  onDropListLeave: PropTypes.func,
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
