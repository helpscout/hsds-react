import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'unistore/react'
import FocusTrap from 'focus-trap-react'
import Artboard from '@helpscout/artboard'
import Dropdown from '../src/components/Dropdown/DropdownV2'
import Button from '../src/components/Button'
import Input from '../src/components/Input'
import styled from '../src/components/styled'
import store from '../src/components/Dropdown/V2/Dropdown.store'
import { createSpec, faker } from '@helpscout/helix'

const stories = storiesOf('DropdownV2/Filterable', module)
stories.addDecorator(storyFn => (
  <Artboard
    name="dropdown-v2"
    withCenterGuides={false}
    artboardWidth={480}
    artboardHeight={300}
  >
    <div
      style={{ boxSizing: 'border-box', width: 480, height: 300, padding: 30 }}
    >
      <Provider store={store}>{storyFn()}</Provider>
    </div>
  </Artboard>
))

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
})

const items = [
  {
    items: ItemSpec.generate(8),
    label: 'Group 1',
    value: 'thing',
    type: 'group',
  },
  {
    items: ItemSpec.generate(8),
    label: 'Group 2',
    type: 'group',
    value: 'thing2',
  },
]

stories.add('Custom Filterable', () => {
  const HeaderUI = styled('div')`
    position: sticky;
    z-index: 10;
    background: white;
    padding: 8px 10px 8px;
    top: 0;
    transform: translateY(-8px);
    border: 1px solid #eee;
  `
  class FilterableDropdown extends React.Component {
    static defaultProps = {
      isLoading: false,
      disabled: false,
    }

    state = {
      // items: ItemSpec.generate(30),
      items,
      inputValue: '',
      selectedItem: undefined,
    }

    onInputChange = inputValue => {
      this.setState({
        inputValue,
      })
    }

    onSelect = (selectedItem, props) => {
      this.setState({
        selectedItem,
      })
      this.resetInputValue()
    }

    filterGroupSearchResultFromItems = groups => {
      return groups.map(group => {
        return { ...group, items: group.items.filter(this.filterSearchResult) }
      })
    }

    filterSearchResult = item => {
      if (!this.state.inputValue) return true

      return item.label
        .toLowerCase()
        .includes(this.state.inputValue.toLowerCase())
    }

    handleOnKeyDown = event => {
      if (event.keyCode === 13) {
        event.stopPropagation()
      }
    }

    resetInputValue = () => {
      this.setState({
        inputValue: '',
      })
    }

    renderItems = dropdownProps => {
      const {
        items,
        renderItems,
        renderItemsAsGroups,
        hasGroups,
      } = dropdownProps

      if (hasGroups) {
        return renderItemsAsGroups({
          items: this.filterGroupSearchResultFromItems(items),
        })
      }

      return renderItems({ items: items.filter(this.filterSearchResult) })
    }

    render() {
      return (
        <Dropdown
          enableTabNavigation={false}
          items={this.state.items}
          selectedItem={this.state.selectedItem}
          minWidth={300}
          inputValue={this.state.inputValue}
          onSelect={this.onSelect}
          isOpen
          onClose={this.resetInputValue}
        >
          {dropdownProps => (
            <Dropdown.Card>
              <Dropdown.Block>
                <Input
                  placeholder="Search"
                  size="sm"
                  autoFocus
                  onChange={this.onInputChange}
                  value={this.state.inputValue}
                  onKeyDown={this.handleOnKeyDown}
                />
              </Dropdown.Block>
              <Dropdown.Menu>{this.renderItems(dropdownProps)}</Dropdown.Menu>
              <Dropdown.Block>
                <Button version={2} kind="primary" isBlock>
                  Button
                </Button>
              </Dropdown.Block>
            </Dropdown.Card>
          )}
        </Dropdown>
      )
    }
  }

  return <FilterableDropdown />
})
