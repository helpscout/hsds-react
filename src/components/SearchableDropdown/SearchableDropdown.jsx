import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../Dropdown'
import { isItemsEmpty, hasGroups } from '../Dropdown/Dropdown.utils'
import { initialState } from '../Dropdown/Dropdown.store'
import Keys from '../../constants/Keys'
import Text from '../Text'
import { noop } from '../../utilities/other'
import { classNames } from '../../utilities/classNames'
import { renderRenderPropComponent } from '../../utilities/component'
import {
  HeaderUI,
  InputUI,
  MenuUI,
  EmptyItemUI,
} from './SearchableDropdown.css'

const defaultInputProps = {
  autoFocus: true,
  className: 'c-SearchableDropdownInput',
  onOpen: noop,
  onClose: noop,
  onChange: noop,
  onKeyDown: noop,
  placeholder: 'Search',
  size: 'xssm',
}

// TODO: Create propTypes
export class SearchableDropdown extends React.Component {
  state = {
    isOpen: this.props.isOpen,
    inputValue: '',
  }

  _isMounted
  menuWrapperNode

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.isOpen !== this.props.isOpen) {
      this.setState({ isOpen: props.isOpen })
    }
  }

  shouldDropDirectionUpdate = positionProps => {
    if (this.state.inputValue) return false

    return this.props.shouldDropDirectionUpdate(positionProps)
  }

  safeSetState = (nextState, callback) => {
    if (this._isMounted) {
      this.setState(nextState, callback)
    }
  }

  onInputChange = inputValue => {
    if (inputValue === this.state.inputValue) return

    this.safeSetState({
      inputValue,
    })

    this.props.onInputChange(inputValue)

    if (this.props.inputProps.onChange) {
      this.props.inputProps.onChange(inputValue)
    }

    this.scrollMenuToTop()
  }

  onSelect = (selectedItem, props) => {
    this.resetInputValue()
    this.props.onSelect(selectedItem, props)
  }

  handleOnKeyDown = event => {
    if (event.keyCode === Keys.ENTER) {
      event.stopPropagation()
    }

    if (event.keyCode === Keys.TAB) {
      this.handleTabPress(event)
    }

    if (this.props.inputProps.onKeyDown) {
      this.props.inputProps.onKeyDown(event)
    }
  }

  handleTabPress(event) {
    if (this.props.closeOnInputTab) {
      event.stopPropagation()

      this.handleOnClose()
    }
  }

  filterGroupSearchResultFromItems = (groups, inputValue) => {
    return groups.map(group => {
      return {
        ...group,
        items: group.items.filter(item =>
          this.filterSearchResult(item, inputValue)
        ),
      }
    })
  }

  filterSearchResult = (item, inputValue) => {
    const { itemFilterKey } = this.props
    if (!inputValue) return true
    if (!item[itemFilterKey]) return false

    return item[itemFilterKey].toLowerCase().includes(inputValue.toLowerCase())
  }

  resetInputValue = () => {
    this.safeSetState({
      inputValue: '',
    })

    this.props.closeOnSelect && this.scrollMenuToTop()
  }

  scrollMenuToTop = () => {
    requestAnimationFrame(() => {
      if (!this.menuWrapperNode) return
      this.menuWrapperNode.scrollTop = 0
    })
  }

  defaultFilter = filterProps => {
    const { hasGroups, items, inputValue } = filterProps
    let nextItems

    // 1. Group filtering
    if (hasGroups) {
      nextItems = this.filterGroupSearchResultFromItems(items, inputValue)
    }
    // 2. Standard flat item filtering
    else {
      nextItems = items.filter(item =>
        this.filterSearchResult(item, inputValue)
      )
    }

    return nextItems
  }

  renderItems = dropdownProps => {
    const { items, renderItems, renderItemsAsGroups, hasGroups } = dropdownProps
    const { customFilter } = this.props
    const { inputValue } = this.state

    const filterProps = {
      items,
      hasGroups,
      inputValue,
    }

    let nextItems

    // 1. User defined custom filtering
    if (customFilter) {
      nextItems = customFilter(filterProps, this.defaultFilter)
    }
    // 2. Default filtering
    else {
      nextItems = this.defaultFilter(filterProps)
    }

    // Render empty state, if empty
    if (isItemsEmpty(nextItems)) {
      return this.renderEmpty()
    }

    // We need to render the items slightly differently for groups.
    // To do this, we'll rely on the function provided to use from Dropdown.
    if (hasGroups) {
      return renderItemsAsGroups({ items: nextItems, withIndex: !!inputValue })
    } else {
      return renderItems({ items: nextItems, withIndex: true })
    }
  }

  onMenuMount = () => {
    this.props.onMenuMount()
    this.resetInputValue()
  }

  onMenuUnmount = () => {
    this.props.onMenuUnmount()
    this.resetInputValue()
  }

  isInputActive() {
    const { showInput, autoInput, items, limit } = this.props

    if (autoInput) {
      let total = items.length

      if (hasGroups(items)) {
        total = items.reduce((p, c) => {
          if (c.type === 'group') {
            return p + c.items.length
          }
          return p + 1
        }, 0)
      }
      return total > limit
    }

    return showInput
  }

  getDropdownProps = () => {
    const {
      className,
      enableTabNavigation,
      noResultsLabel,
      onInputChange,
      ...rest
    } = this.props
    const { inputValue, isOpen } = this.state
    const isInputActive = this.isInputActive()
    const componentClassName = classNames('c-SearchableDropdown', className)
    const shouldEnableTabNavigation =
      enableTabNavigation || (enableTabNavigation && !isInputActive)

    return {
      ...rest,
      className: componentClassName,
      enableTabNavigation: shouldEnableTabNavigation,
      inputValue,
      isOpen,
      isSelectFirstItemOnOpen: true,
      onClick: this.handleOnClose,
      onMenuMount: this.onMenuMount,
      onMenuUnmount: this.onMenuUnmount,
      onOpen: this.handleOnOpen,
      onSelect: this.onSelect,
      shouldDropDirectionUpdate: this.shouldDropDirectionUpdate,
    }
  }

  getMenuClassName() {
    return classNames(
      'c-SearchableDropdownMenu',
      this.isInputActive() && 'is-withInput'
    )
  }

  handleOnOpen = () => {
    this.setState({
      isOpen: true,
    })
    this.props.onOpen()
  }

  handleOnClose = () => {
    this.setState({
      isOpen: false,
    })
    this.props.onClose()
  }

  renderEmpty = () => {
    const { renderEmpty, noResultsLabel } = this.props
    const { inputValue } = this.state

    if (renderEmpty) {
      return renderRenderPropComponent(renderEmpty)
    }

    const message = inputValue
      ? `${noResultsLabel} for "${inputValue}"`
      : noResultsLabel

    return (
      <EmptyItemUI className="c-SearchableDropdownEmpty">
        <Text shade="muted">{message}</Text>
      </EmptyItemUI>
    )
  }

  renderMenuStart = () => {
    const { renderMenuStart } = this.props

    return renderMenuStart ? renderRenderPropComponent(renderMenuStart) : null
  }

  renderMenuEnd = () => {
    const { renderMenuEnd } = this.props

    return renderMenuEnd ? renderRenderPropComponent(renderMenuEnd) : null
  }

  renderFooter = () => {
    const { renderFooter } = this.props
    if (!renderFooter) return

    return (
      <Dropdown.Block className="c-SearchableDropdownFooter">
        {renderRenderPropComponent(renderFooter)}
      </Dropdown.Block>
    )
  }

  setMenuWrapperNode = node => (this.menuWrapperNode = node)

  render() {
    const { inputProps } = this.props
    const isInputActive = this.isInputActive()

    return (
      <Dropdown {...this.getDropdownProps()}>
        {dropdownProps => (
          <Dropdown.Card>
            {isInputActive && (
              <HeaderUI className="c-SearchableDropdownHeader">
                <InputUI
                  {...{ ...defaultInputProps, ...inputProps }}
                  onChange={this.onInputChange}
                  onKeyDown={this.handleOnKeyDown}
                  value={this.state.inputValue}
                />
              </HeaderUI>
            )}

            <MenuUI
              className={this.getMenuClassName()}
              innerRef={this.setMenuWrapperNode}
            >
              {this.renderMenuStart()}
              {this.renderItems(dropdownProps)}
              {this.renderMenuEnd()}
            </MenuUI>
            {this.renderFooter()}
          </Dropdown.Card>
        )}
      </Dropdown>
    )
  }
}

SearchableDropdown.defaultProps = {
  ...initialState,
  autoInput: false,
  closeOnInputTab: true,
  'data-cy': 'SearchableDropdown',
  innerRef: noop,
  inputProps: {},
  itemFilterKey: 'value',
  limit: 15,
  maxHeight: 330,
  maxWidth: 222,
  minWidth: 222,
  noResultsLabel: 'No results',
  onInputChange: noop,
  showInput: true,
}

SearchableDropdown.propTypes = {
  ...Dropdown.propTypes,
  ...{
    /** Renders the search `Input` based on the limit and the number of items. */
    autoInput: PropTypes.bool,
    /** Closes `Dropdown` when `tab` is pressed within the `Input`. */
    closeOnInputTab: PropTypes.bool,
    /** Customize the item search filter results. */
    customFilter: PropTypes.func,
    /** Callback when the inputValue changes. */
    onInputChange: PropTypes.func,
    /** Custom props for the inner `Input` component. */
    inputProps: PropTypes.object,
    /** Key to filter the results against. */
    itemFilterKey: PropTypes.string,
    /** Text to display when there are no results. */
    noResultsLabel: PropTypes.string,
    /** Custom UI to render before the `Menu`. */
    renderMenuStart: PropTypes.func,
    /** Custom UI to render after the `Menu`. */
    renderMenuEnd: PropTypes.func,
    /** Custom UI to render in the `Dropdown` footer. */
    renderFooter: PropTypes.func,
    /** Renders the search `Input` component. */
    showInput: PropTypes.bool,
    /** Max number of items before the search input is displayed */
    limit: PropTypes.number,
  },
}

export default SearchableDropdown
