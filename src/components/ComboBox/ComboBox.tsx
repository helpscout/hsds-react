import * as React from 'react'
import Dropdown from '../Dropdown/DropdownV2'
import { isItemsEmpty } from '../Dropdown/V2/Dropdown.utils'
import Input from '../Input'
import Text from '../Text'
import { noop } from '../../utilities/other'
import { HeaderUI, InputUI, MenuUI, EmptyItemUI } from './ComboBox.css'

export class ComboBox extends React.Component<any, any> {
  static defaultProps = {
    isLoading: false,
    isOpen: false,
    disabled: false,
    items: [],
    onInputChange: noop,
    onOpen: noop,
    onClose: noop,
    onSelect: noop,
    maxHeight: 330,
    minWidth: 222,
    noResultsLabel: 'No results',
  }

  state = {
    inputValue: '',
    selectedItem: undefined,
  }

  onInputChange = inputValue => {
    this.setState({
      inputValue,
    })

    this.props.onInputChange(inputValue)
  }

  onSelect = (selectedItem, props) => {
    this.setState({
      selectedItem,
    })
    this.resetInputValue()
    this.props.onSelect(selectedItem, props)
  }

  handleOnKeyDown = event => {
    if (event.keyCode === 13) {
      event.stopPropagation()
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
    if (!inputValue) return true

    return item.label.toLowerCase().includes(inputValue.toLowerCase())
  }

  resetInputValue = () => {
    this.setState({
      inputValue: '',
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
      return renderItemsAsGroups({ items: nextItems })
    } else {
      return renderItems({ items: nextItems })
    }
  }

  onClose = () => {
    this.resetInputValue()
    this.props.onClose()
  }

  getDropdownProps = () => {
    const {
      isOpen,
      items,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      onOpen,
    } = this.props
    const { inputValue } = this.state

    return {
      enableTabNavigation: false,
      inputValue,
      onClose: this.onClose,
      onOpen,
      isOpen,
      items,
      onSelect: this.onSelect,
      minWidth,
      minHeight,
      maxHeight,
      maxWidth,
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

    return <Dropdown.Block>{renderFooter()}</Dropdown.Block>
  }

  render() {
    return (
      <Dropdown
        {...this.getDropdownProps()}
        selectedItem={this.state.selectedItem}
      >
        {dropdownProps => (
          <Dropdown.Card>
            <HeaderUI>
              <InputUI
                placeholder="Search"
                size="xssm"
                autoFocus
                onChange={this.onInputChange}
                value={this.state.inputValue}
                onKeyDown={this.handleOnKeyDown}
              />
            </HeaderUI>
            <MenuUI>
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
