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
  placeholder: string
  noResultsLabel: string
  renderMenuStart?: () => void
  renderMenuEnd?: () => void
  renderFooter?: () => void
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
    maxHeight: 330,
    minWidth: 222,
    noResultsLabel: 'No results',
  }

  state = {
    inputValue: '',
  }

  onInputChange = inputValue => {
    this.setState({
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
    const { onInputChange, noResultsLabel, ...rest } = this.props
    const { inputValue } = this.state

    return {
      ...rest,
      inputValue,
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

  render() {
    const { className, inputProps } = this.props
    const componentClassName = classNames('c-ComboBox', className)

    return (
      <Dropdown
        {...this.getDropdownProps()}
        enableTabNavigation={false}
        className={componentClassName}
      >
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
            <MenuUI className="c-ComboBoxMenu">
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
