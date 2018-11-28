import { DropdownProps } from '../Dropdown/V2/Dropdown.types'
import * as React from 'react'
import Dropdown from '../Dropdown/DropdownV2'
import { isItemsEmpty } from '../Dropdown/V2/Dropdown.utils'
import { initialState } from '../Dropdown/V2/Dropdown.store'
import Keys from '../../constants/Keys'
import Text from '../Text'
import { noop } from '../../utilities/other'
import { classNames } from '../../utilities/classNames'
import { HeaderUI, InputUI, MenuUI, EmptyItemUI } from './ComboBox.css'

export interface ComboBoxProps extends DropdownProps {
  autoFocusInput: boolean
  customFilter?: (filterProps: Object, defaultFilter: any) => void
  onInputChange: (value: string) => void
  inputProps: any
  itemFilterKey: string
  placeholder: string
  noResultsLabel: string
  renderMenuStart?: () => void
  renderMenuEnd?: () => void
  renderFooter?: () => void
  resetInputValueDelay: number
}

export interface ComboBoxState {
  inputValue: string
}

export class ComboBox extends React.Component<ComboBoxProps, ComboBoxState> {
  static defaultProps = {
    ...initialState,
    onInputChange: noop,
    inputProps: {
      autoFocus: true,
      className: 'c-ComboBoxInput',
      onChange: noop,
      onKeyDown: noop,
      placeholder: 'Search',
      size: 'xssm',
    },
    itemFilterKey: 'value',
    innerWrapperRef: noop,
    maxHeight: 330,
    minWidth: 222,
    noResultsLabel: 'No results',
    resetInputValueDelay: 60,
  }

  state = {
    inputValue: '',
  }

  _isMounted: boolean
  menuWrapperNode: HTMLElement

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  safeSetState = (nextState, callback?) => {
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
  }

  onSelect = (selectedItem, props) => {
    this.resetInputValue()
    this.props.onSelect(selectedItem, props)
  }

  handleOnKeyDown = event => {
    if (event.keyCode === Keys.ENTER) {
      event.stopPropagation()
    }
    if (this.props.inputProps.onKeyDown) {
      this.props.inputProps.onKeyDown(event)
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
    this.scrollMenuToTop()
  }

  scrollMenuToTop = () => {
    if (!this.menuWrapperNode) return
    this.menuWrapperNode.scrollTop = 0
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

  getDropdownProps = () => {
    const { className } = this.props
    const { onInputChange, noResultsLabel, ...rest } = this.props
    const { inputValue } = this.state

    const componentClassName = classNames('c-ComboBox', className)

    return {
      ...rest,
      onMenuMount: this.onMenuMount,
      onMenuUnmount: this.onMenuUnmount,
      enableTabNavigation: false,
      className: componentClassName,
      inputValue,
      index: '0',
    }
  }

  renderEmpty = () => {
    const { noResultsLabel } = this.props
    const { inputValue } = this.state

    const message = inputValue
      ? `${noResultsLabel} for "${inputValue}"`
      : noResultsLabel
    return (
      <EmptyItemUI>
        <Text shade="muted">{message}</Text>
      </EmptyItemUI>
    )
  }

  renderMenuStart = () => {
    const { renderMenuStart } = this.props

    return renderMenuStart ? renderMenuStart() : null
  }

  renderMenuEnd = () => {
    const { renderMenuEnd } = this.props

    return renderMenuEnd ? renderMenuEnd() : null
  }

  renderFooter = () => {
    const { renderFooter } = this.props
    if (!renderFooter) return

    return (
      <Dropdown.Block className="c-ComboBoxFooter">
        {renderFooter()}
      </Dropdown.Block>
    )
  }

  setMenuWrapperNode = node => (this.menuWrapperNode = node)

  render() {
    const { inputProps } = this.props

    return (
      <Dropdown {...this.getDropdownProps()}>
        {dropdownProps => (
          <Dropdown.Card>
            <HeaderUI className="c-ComboBoxHeader">
              <InputUI
                {...inputProps}
                onChange={this.onInputChange}
                onKeyDown={this.handleOnKeyDown}
                value={this.state.inputValue}
              />
            </HeaderUI>
            <MenuUI
              className="c-ComboBoxMenu"
              innerWrapperRef={this.setMenuWrapperNode}
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

export default ComboBox
