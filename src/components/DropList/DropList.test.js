import React from 'react'
import { render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { css } from 'styled-components'
import DropList from './DropList'
import { SimpleButton, SelectTag, SplittedButton } from './DropList.togglers'
import {
  flattenListItems,
  getEnabledItemIndex,
  getMenuWidth,
} from './DropList.utils'
import {
  itemsWithDivider,
  groupAndDividerItems,
  simpleGroupedItems,
} from '../../utilities/specs/dropdown.specs'

jest.useFakeTimers()

const beatles = ['John', 'Paul', 'Ringo', 'George']
const someItems = [
  { label: 'John' },
  { label: 'Paul' },
  { label: 'Ringo' },
  { label: 'George' },
  { label: 'Bob' },
  { label: 'Jeff' },
  { label: 'David' },
]

describe('Render', () => {
  test('Should render a fallback toggler if none passed', () => {
    const { getByText } = render(<DropList items={[]} />)
    expect(getByText('Fallback Toggler')).toBeInTheDocument()
  })

  test('Should render passed toggler', () => {
    const { getByText } = render(
      <DropList items={[]} toggler={<SimpleButton text="Button Toggler" />} />
    )

    expect(getByText('Button Toggler')).toBeInTheDocument()
  })

  test('should render a menu list with string items', async () => {
    const { getByTestId, queryByText, queryByRole } = render(
      <DropList
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    expect(queryByRole('listbox')).not.toBeInTheDocument()

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()

      beatles.forEach(beatle => {
        expect(queryByText(beatle)).toBeInTheDocument()
      })
    })

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  test('should render a menu list with object items that include a label', () => {
    const { getByTestId, queryByText, queryByRole } = render(
      <DropList
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    expect(queryByRole('listbox')).not.toBeInTheDocument()

    user.click(toggler)

    expect(queryByRole('listbox')).toBeInTheDocument()

    someItems.forEach(item => {
      expect(queryByText(item.label)).toBeInTheDocument()
    })
  })

  test('should render a menu list with object items that include a value and no label', () => {
    const regularValueItems = someItems.map(item => {
      return { value: item.label }
    })
    const { getByTestId, queryByText, queryByRole } = render(
      <DropList
        items={regularValueItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    expect(queryByRole('listbox')).not.toBeInTheDocument()

    user.click(toggler)

    expect(queryByRole('listbox')).toBeInTheDocument()

    regularValueItems.forEach(item => {
      expect(queryByText(item.value)).toBeInTheDocument()
    })
  })

  test('should add a classname to the list item if present in the item', () => {
    const { getByTestId, queryByText } = render(
      <DropList
        items={someItems.map((item, index) => {
          if (index === 1) {
            return { className: 'paintItBlue', ...item }
          }
          return item
        })}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    user.click(toggler)

    expect(
      queryByText(someItems[1].label).parentElement.classList.contains(
        'paintItBlue'
      )
    ).toBeTruthy()
  })

  test('should render a menu list with dividers', () => {
    const { container, getByTestId, queryByRole } = render(
      <DropList
        items={itemsWithDivider}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    user.click(toggler)

    expect(queryByRole('listbox')).toBeInTheDocument()
    expect(container.querySelector('.DropListItem--divider')).toBeTruthy()
  })

  test('should render a menu list with groups', () => {
    const { container, getByTestId, queryByRole } = render(
      <DropList
        items={simpleGroupedItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    user.click(toggler)

    expect(queryByRole('listbox')).toBeInTheDocument()
    expect(container.querySelector('.DropListItem--groupLabel')).toBeTruthy()
  })

  test('should render a menu list with groups and dividers', () => {
    const { container, getByTestId, queryByRole } = render(
      <DropList
        items={groupAndDividerItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    user.click(toggler)

    expect(queryByRole('listbox')).toBeInTheDocument()
    expect(container.querySelector('.DropListItem--groupLabel')).toBeTruthy()
    expect(container.querySelector('.DropListItem--divider')).toBeTruthy()
  })

  test('should render an empty menu list if no items in the array', () => {
    const { getByTestId, queryByText, queryByRole } = render(
      <DropList items={[]} toggler={<SimpleButton text="Button Toggler" />} />
    )
    const toggler = getByTestId('DropList.ButtonToggler')
    expect(toggler.getAttribute('aria-expanded')).toBe('false')
    expect(queryByRole('listbox')).not.toBeInTheDocument()

    user.click(toggler)

    expect(toggler.getAttribute('aria-expanded')).toBe('true')
    expect(queryByRole('listbox')).toBeInTheDocument()
    expect(queryByText('No items')).toBeInTheDocument()
  })

  test('should render a custom empty menu list if no items in the array', () => {
    const { queryByText } = render(
      <DropList
        items={[]}
        customEmptyList={
          <div>My Empty List is Better Than Your Empty List</div>
        }
        isMenuOpen
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )

    expect(
      queryByText('My Empty List is Better Than Your Empty List')
    ).toBeInTheDocument()
  })

  test('should render empty menu list items if no items in the array and customEmptyListItems present (select)', () => {
    const { container } = render(
      <DropList
        items={[]}
        customEmptyListItems={[
          {
            label: 'No tags found',
            type: 'inert',
          },
          {
            type: 'divider',
          },
          {
            label: 'Create tag',
            type: 'action',
          },
        ]}
        isMenuOpen
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )

    expect(container.querySelectorAll('.DropListItem--divider').length).toBe(1)
    expect(container.querySelectorAll('.DropListItem').length).toBe(2)
  })

  test('should render empty menu list items if no items in the array and customEmptyListItems present (combobox)', () => {
    const { container } = render(
      <DropList
        variant="combobox"
        items={[]}
        customEmptyListItems={[
          {
            label: 'No tags found',
            type: 'inert',
          },
          {
            type: 'divider',
          },
          {
            label: 'Create tag',
            type: 'action',
          },
        ]}
        isMenuOpen
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )

    expect(container.querySelectorAll('.DropListItem--divider').length).toBe(1)
    expect(container.querySelectorAll('.DropListItem').length).toBe(2)
  })

  test('should render a the empty menu list if no items in the array (invalid custom element)', () => {
    const { queryByText } = render(
      <DropList
        items={[]}
        customEmptyList="something"
        isMenuOpen
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )

    expect(queryByText('No items')).toBeInTheDocument()
  })

  test('should render custom list items', () => {
    const { container, queryByText } = render(
      <DropList
        items={beatles}
        renderCustomListItem={({ item }) => (
          <span className="customized">{item}</span>
        )}
        isMenuOpen
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )

    beatles.forEach(beatle => {
      expect(queryByText(beatle)).toBeInTheDocument()
    })
    expect(container.querySelector('.DropListItem--custom')).toBeTruthy()
    expect(container.querySelector('.customized')).toBeTruthy()
  })

  test('should be able to render in given element via tippy options', () => {
    const { queryByText } = render(
      <DropList
        items={beatles}
        tippyOptions={{
          appendTo: () => document.body,
        }}
        toggler={<SimpleButton text="Click" />}
      />
    )

    user.click(queryByText('Click'))

    const tippyContainer = document.querySelector('body > div[id^="tippy"]')

    expect(tippyContainer).toBeTruthy()
    expect(tippyContainer.classList.contains('hsds-react')).toBeTruthy()
  })

  test('should be able to pass custom css to the menu when portaling', () => {
    const { queryByText } = render(
      <DropList
        items={beatles}
        tippyOptions={{
          appendTo: () => document.body,
        }}
        toggler={<SimpleButton text="Click" />}
        menuCSS={css`
          outline: '2px solid salmon';
        `}
      />
    )

    user.click(queryByText('Click'))

    const select = document.querySelector('.DropList__Select')

    expect(window.getComputedStyle(select).getPropertyValue('outline')).toBe(
      "'2px solid salmon'"
    )
  })

  test('should close on ESC', () => {
    const { container, getByRole } = render(
      <DropList
        items={beatles}
        isMenuOpen
        toggler={<SimpleButton text="Click" />}
      />
    )

    user.type(container, '{esc}')

    expect(getByRole('button').getAttribute('aria-expanded')).toBe('false')
  })

  test('should close on ESC on combobox', () => {
    const { getByPlaceholderText, getByRole } = render(
      <DropList
        items={beatles}
        isMenuOpen
        variant="combobox"
        toggler={<SimpleButton text="Click" />}
      />
    )

    user.type(getByPlaceholderText('Search'), '{esc}')

    expect(getByRole('button').getAttribute('aria-expanded')).toBe('false')
  })

  test('should close combobox on input blur', () => {
    const { getByRole } = render(
      <DropList
        items={beatles}
        isMenuOpen
        variant="combobox"
        toggler={<SimpleButton text="Click" />}
      />
    )

    user.tab()

    expect(getByRole('button').getAttribute('aria-expanded')).toBe('false')
  })
})

describe('Menu', () => {
  test('should be open if isMenuOpen is true', () => {
    const { queryByRole } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )

    expect(queryByRole('listbox')).toBeInTheDocument()
  })

  test('should close on menu blur', async () => {
    const onMenuBlur = jest.fn()
    const { getByRole } = render(
      <DropList
        items={beatles}
        isMenuOpen
        onMenuBlur={onMenuBlur}
        toggler={<SimpleButton text="Click" />}
      />
    )

    user.tab()

    await waitFor(() => {
      expect(getByRole('button').getAttribute('aria-expanded')).toBe('false')
      expect(onMenuBlur).toHaveBeenCalled()
    })
  })

  test('should render a combobox when autoSetComboboxAt is smaller than the number of items', () => {
    const { queryByRole, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        autoSetComboboxAt={3}
      />
    )

    expect(queryByRole('listbox')).toBeInTheDocument()
    expect(getByPlaceholderText('Search')).toBeInTheDocument()
    expect(
      window
        .getComputedStyle(getByPlaceholderText('Search').parentElement)
        .getPropertyValue('display')
    ).toBe('block')
  })

  test('should render a select when autoSetComboboxAt is larger than the number of items', () => {
    const { queryByRole, queryByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        autoSetComboboxAt={16}
      />
    )

    expect(queryByRole('listbox')).toBeInTheDocument()
    expect(queryByPlaceholderText('Search')).not.toBeInTheDocument()
  })

  test('should fire onMenuFocus and onMenuBlur (Combobox)', () => {
    const blurSpy = jest.fn()
    const focusSpy = jest.fn()
    const { queryByText } = render(
      <DropList
        onMenuBlur={blurSpy}
        onMenuFocus={focusSpy}
        items={someItems}
        toggler={<SimpleButton text="Click" />}
        variant="combobox"
      />
    )

    user.click(queryByText('Click'))

    expect(focusSpy).toHaveBeenCalled()

    user.tab()

    expect(blurSpy).toHaveBeenCalled()
  })

  test('should fire onMenuFocus and onMenuBlur (Select)', () => {
    const blurSpy = jest.fn()
    const focusSpy = jest.fn()
    const { queryByText } = render(
      <DropList
        onMenuBlur={blurSpy}
        onMenuFocus={focusSpy}
        items={someItems}
        toggler={<SimpleButton text="Click" />}
      />
    )

    user.click(queryByText('Click'))

    expect(focusSpy).toHaveBeenCalled()

    user.tab()

    expect(blurSpy).toHaveBeenCalled()
  })
})

describe('Combobox', () => {
  test('should render a combobox', () => {
    const { queryByRole, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    expect(queryByRole('listbox')).toBeInTheDocument()
    expect(getByPlaceholderText('Search')).toBeInTheDocument()
    expect(
      window
        .getComputedStyle(getByPlaceholderText('Search').parentElement)
        .getPropertyValue('display')
    ).toBe('block')
  })

  test('should focus input when open', () => {
    const { getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    expect(getByPlaceholderText('Search')).toHaveFocus()
  })

  test('should return input to onComboboxInputChange', () => {
    const onComboboxInputChangeSpy = jest.fn()
    const { getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
        onComboboxInputChange={onComboboxInputChangeSpy}
      />
    )

    user.type(getByPlaceholderText('Search'), 'Aoki')

    expect(onComboboxInputChangeSpy).toHaveBeenCalledWith('Aoki')
  })

  test('should hide the search input on combobox if list empty', () => {
    const { queryByRole, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={[]}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    expect(queryByRole('listbox')).toBeInTheDocument()
    expect(
      window
        .getComputedStyle(getByPlaceholderText('Search').parentElement)
        .getPropertyValue('display')
    ).toBe('none')
  })

  test('should filter items', () => {
    const { container, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    expect(container.querySelectorAll('.DropListItem').length).toBe(4)

    user.type(getByPlaceholderText('Search'), 'G')

    expect(container.querySelectorAll('.DropListItem').length).toBe(1)
  })

  test('should filter items to empty if none found', () => {
    const { container, getByText, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    expect(container.querySelectorAll('.DropListItem').length).toBe(4)

    user.type(getByPlaceholderText('Search'), 'Z')

    expect(container.querySelectorAll('.DropListItem').length).toBe(0)
    expect(getByText('No results for Z')).toBeInTheDocument()
  })
})

describe('Togglers', () => {
  test('Should run custom onclick callback', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <DropList
        items={[]}
        toggler={<SimpleButton onClick={onClick} text="Button Toggler" />}
      />
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    user.click(toggler)

    expect(onClick).toHaveBeenCalled()
  })

  test('Should pass the open/closed state to the toggler', () => {
    const { getByTestId } = render(
      <DropList items={[]} toggler={<SimpleButton text="Button Toggler" />} />
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    user.click(toggler)

    expect(toggler.classList.contains('is-active')).toBeTruthy()
  })

  test('Should pass the selected item text to the SelectTag toggler', () => {
    const { container, getByText } = render(
      <DropList items={beatles} toggler={<SelectTag />} isMenuOpen />
    )

    expect(container.querySelector('.SelectTagToggler').textContent).toBe('')

    user.click(getByText('John').parentElement)

    expect(container.querySelector('.SelectTagToggler').textContent).toBe(
      'John'
    )
  })

  describe('SelectTag error state', () => {
    test('Should show error when error provided to toggler', () => {
      const error = 'Some error'
      const { getByLabelText, getByTitle } = render(
        <DropList items={beatles} toggler={<SelectTag error={error} />} />
      )

      expect(getByTitle('alert')).toBeInTheDocument()
      expect(getByLabelText('toggle menu')).toHaveClass('is-error')
    })

    test('Should not show error when none', () => {
      const { getByLabelText, queryByTitle } = render(
        <DropList items={beatles} toggler={<SelectTag />} />
      )

      expect(getByLabelText('toggle menu')).not.toHaveClass('is-error')
      expect(queryByTitle('alert')).not.toBeInTheDocument()
    })
  })

  test('Should run action click callback on a SplittedButton', async () => {
    const onActionClick = jest.fn()
    const { getByText } = render(
      <DropList
        items={beatles}
        toggler={<SplittedButton text="Submit" onActionClick={onActionClick} />}
        isMenuOpen
      />
    )

    user.click(getByText('Submit'))

    await waitFor(() => {
      expect(onActionClick).toBeCalled()
    })
  })

  test('Should allow to change arrow direction when opened menu', async () => {
    const { container, getByRole } = render(
      <DropList
        items={beatles}
        toggler={
          <SplittedButton
            text="Submit"
            togglerButtonProps={{ flipChevron: true }}
          />
        }
      />
    )

    expect(
      container.querySelector('.is-iconName-caret-down')
    ).toBeInTheDocument()

    user.click(getByRole('button', { name: 'toggle menu' }))

    await waitFor(() => {
      expect(
        container.querySelector('.is-iconName-caret-down')
      ).not.toBeInTheDocument()
      expect(
        container.querySelector('.is-iconName-caret-up')
      ).toBeInTheDocument()
    })
  })
})

describe('Selection', () => {
  test('should select an item when clicked (string version)', () => {
    const onSelectSpy = jest.fn()
    const onListItemSelectEventSpy = jest.fn()
    const { getByText, getByTestId } = render(
      <DropList
        onSelect={onSelectSpy}
        onListItemSelectEvent={onListItemSelectEventSpy}
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    user.click(toggler)

    expect(toggler.getAttribute('aria-expanded')).toBe('true')

    user.click(getByText('Paul').parentElement)

    expect(
      getByText('Paul').parentElement.classList.contains('is-selected')
    ).toBeTruthy()
    expect(onSelectSpy).toHaveBeenCalledWith('Paul', 'Paul')
    expect(onListItemSelectEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({ type: 'click' }),
        listItemNode: getByText('Paul').parentElement,
      })
    )
    expect(toggler.getAttribute('aria-expanded')).toBe('false')

    user.click(getByText('Ringo').parentElement)

    expect(
      getByText('Paul').parentElement.classList.contains('is-selected')
    ).toBeFalsy()
    expect(
      getByText('Ringo').parentElement.classList.contains('is-selected')
    ).toBeTruthy()
    expect(onSelectSpy).toHaveBeenCalledWith('Ringo', 'Ringo')
    expect(toggler.getAttribute('aria-expanded')).toBe('false')
  })

  test('should select an item when clicked (object version)', () => {
    const onSelectSpy = jest.fn()
    const onListItemSelectEventSpy = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelectSpy}
        onListItemSelectEvent={onListItemSelectEventSpy}
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const itemToSelect = someItems[3]

    user.click(getByText(itemToSelect.label).parentElement)

    expect(
      getByText(itemToSelect.label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeTruthy()
    expect(onSelectSpy).toHaveBeenCalledWith(itemToSelect, itemToSelect)
    expect(onListItemSelectEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({ type: 'click' }),
        listItemNode: getByText(itemToSelect.label).parentElement,
      })
    )
  })

  test('should not select an action item when clicked but fire onSelect', () => {
    const onSelectSpy = jest.fn()
    const items = [
      {
        label: 'something',
        type: 'action',
      },
    ].concat(someItems)
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelectSpy}
        items={items}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const itemToSelect = items[0]
    user.click(getByText(itemToSelect.label).parentElement)

    expect(
      getByText(itemToSelect.label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeFalsy()
    expect(onSelectSpy).toHaveBeenCalledWith(null, itemToSelect)
  })

  test('should select an item when enter key pressed (object version)', () => {
    const onSelectSpy = jest.fn()
    const onListItemSelectEventSpy = jest.fn()
    const { container, getByText } = render(
      <DropList
        onSelect={onSelectSpy}
        onListItemSelectEvent={onListItemSelectEventSpy}
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
      />
    )
    const itemToSelect = someItems[1]

    user.type(container.querySelector('.MenuList'), '{arrowdown}')
    user.type(container.querySelector('.MenuList'), '{arrowdown}')
    user.type(container.querySelector('.MenuList'), '{enter}')

    expect(
      getByText(itemToSelect.label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeTruthy()
    expect(onSelectSpy).toHaveBeenCalledWith(itemToSelect, itemToSelect)
    expect(onListItemSelectEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({ type: 'keydown' }),
        listItemNode: getByText(itemToSelect.label).parentElement,
      })
    )
  })

  test('should select an item when space key pressed (object version)', () => {
    const onSelectSpy = jest.fn()
    const onListItemSelectEventSpy = jest.fn()
    const { container, getByText } = render(
      <DropList
        onSelect={onSelectSpy}
        onListItemSelectEvent={onListItemSelectEventSpy}
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
      />
    )
    const itemToSelect = someItems[1]

    user.type(container.querySelector('.MenuList'), '{arrowdown}')
    user.type(container.querySelector('.MenuList'), '{arrowdown}')
    user.type(container.querySelector('.MenuList'), '{space}')

    expect(
      getByText(itemToSelect.label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeTruthy()
    expect(onSelectSpy).toHaveBeenCalledWith(itemToSelect, itemToSelect)
    expect(onListItemSelectEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({ type: 'keydown' }),
        listItemNode: getByText(itemToSelect.label).parentElement,
      })
    )
  })

  test('should select an item when clicked (combobox string version)', () => {
    const onSelectSpy = jest.fn()
    const onListItemSelectEventSpy = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelectSpy}
        onListItemSelectEvent={onListItemSelectEventSpy}
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    user.click(getByText('Paul').parentElement)

    expect(
      getByText('Paul').parentElement.classList.contains('is-selected')
    ).toBeTruthy()
    expect(onSelectSpy).toHaveBeenCalledWith('Paul', 'Paul')
    expect(onListItemSelectEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({ type: 'click' }),
        listItemNode: getByText('Paul').parentElement,
      })
    )
  })

  test('should select an item when clicked (combobox object version)', () => {
    const onSelect = jest.fn()
    const onListItemSelectEventSpy = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelect}
        onListItemSelectEvent={onListItemSelectEventSpy}
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )
    const itemToSelect = someItems[3]

    user.click(getByText(itemToSelect.label).parentElement)

    expect(
      getByText(itemToSelect.label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeTruthy()
    expect(onSelect).toHaveBeenCalledWith(itemToSelect, itemToSelect)
    expect(onListItemSelectEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({ type: 'click' }),
        listItemNode: getByText(itemToSelect.label).parentElement,
      })
    )
  })

  test('should select an item when enter key pressed (combobox object version)', () => {
    const onSelectSpy = jest.fn()
    const onListItemSelectEventSpy = jest.fn()
    const { container, getByText } = render(
      <DropList
        variant="combobox"
        onSelect={onSelectSpy}
        onListItemSelectEvent={onListItemSelectEventSpy}
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
      />
    )
    const itemToSelect = someItems[1]

    user.type(container.querySelector('input'), '{arrowdown}')
    user.type(container.querySelector('input'), '{arrowdown}')
    user.type(container.querySelector('input'), '{enter}')

    expect(
      getByText(itemToSelect.label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeTruthy()
    expect(onSelectSpy).toHaveBeenCalledWith(itemToSelect, itemToSelect)
    expect(onListItemSelectEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({ type: 'keydown' }),
        listItemNode: getByText(itemToSelect.label).parentElement,
      })
    )
  })

  test('should clear selection if clearOnSelect is enabled (select)', () => {
    const onSelectSpy = jest.fn()
    const { getByText } = render(
      <DropList
        clearOnSelect
        onSelect={onSelectSpy}
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
      />
    )

    const itemToSelect = someItems[3]

    user.click(getByText(itemToSelect.label).parentElement)

    // Item should not have the selected styles
    expect(
      getByText(itemToSelect.label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeFalsy()

    // Click it again
    user.click(getByText(itemToSelect.label).parentElement)

    // Again, item should not have the selected styles
    expect(
      getByText(itemToSelect.label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeFalsy()

    // On normal circumstances onSelect only gets called once
    // if you select the same item, with clearOnSelect, it gets called
    // every time (twice in this case)
    expect(onSelectSpy).toHaveBeenCalledTimes(2)
  })

  test('should clear selection if clearOnSelect is enabled (combobox)', () => {
    const onSelectSpy = jest.fn()
    const { getByText } = render(
      <DropList
        variant="combobox"
        clearOnSelect
        onSelect={onSelectSpy}
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
      />
    )

    const itemToSelect = someItems[3]

    user.click(getByText(itemToSelect.label).parentElement)

    // Item should not have the selected styles
    expect(
      getByText(itemToSelect.label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeFalsy()

    // Click it again
    user.click(getByText(itemToSelect.label).parentElement)

    // Again, item should not have the selected styles
    expect(
      getByText(itemToSelect.label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeFalsy()

    // On normal circumstances onSelect only gets called once
    // if you select the same item, with clearOnSelect, it gets called
    // every time (twice in this case)
    expect(onSelectSpy).toHaveBeenCalledTimes(2)
  })

  test('should multi-select', () => {
    const onSelectSpy = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelectSpy}
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
        withMultipleSelection
      />
    )

    user.click(getByText('Paul').parentElement)

    expect(
      getByText('Paul').parentElement.classList.contains('is-selected')
    ).toBeTruthy()
    expect(
      window
        .getComputedStyle(
          getByText('Paul').parentElement.querySelector('.SelectedBadge')
        )
        .getPropertyValue('opacity')
    ).toBe('1')

    expect(onSelectSpy).toHaveBeenCalledWith(['Paul'], 'Paul')

    user.click(getByText('Ringo').parentElement)

    expect(
      getByText('Paul').parentElement.classList.contains('is-selected')
    ).toBeTruthy()
    expect(
      getByText('Ringo').parentElement.classList.contains('is-selected')
    ).toBeTruthy()
    expect(
      window
        .getComputedStyle(
          getByText('Ringo').parentElement.querySelector('.SelectedBadge')
        )
        .getPropertyValue('opacity')
    ).toBe('1')
    expect(onSelectSpy).toHaveBeenCalledWith(['Paul', 'Ringo'], 'Ringo')

    user.click(getByText('Ringo').parentElement)

    expect(
      getByText('Paul').parentElement.classList.contains('is-selected')
    ).toBeTruthy()
    expect(
      getByText('Ringo').parentElement.classList.contains('is-selected')
    ).toBeFalsy()
    expect(
      window
        .getComputedStyle(
          getByText('Ringo').parentElement.querySelector('.SelectedBadge')
        )
        .getPropertyValue('opacity')
    ).toBe('0')
    expect(onSelectSpy).toHaveBeenCalledWith(['Paul'], {
      label: 'Ringo',
      remove: true,
    })
  })

  test('should select when filtering and pressing enter on combobox', () => {
    const onSelectSpy = jest.fn()
    const { getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={beatles}
        onSelect={onSelectSpy}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    user.type(getByPlaceholderText('Search'), 'G')
    user.type(getByPlaceholderText('Search'), '{enter}')

    expect(onSelectSpy).toHaveBeenCalledWith('George', 'George')
  })

  test('should set an initial item as selected (single string version)', () => {
    const onSelectSpy = jest.fn()
    const { getByText } = render(
      <DropList
        onSelect={onSelectSpy}
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
        selection="Ringo"
      />
    )

    expect(
      getByText('Ringo').parentElement.classList.contains('is-selected')
    ).toBeTruthy()
  })

  test('should set an initial item as selected (single object version)', () => {
    const { getByText } = render(
      <DropList
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
        selection={someItems[2]}
      />
    )

    expect(
      getByText(someItems[2].label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeTruthy()
  })

  test('should set initial items as selected (multi object version)', () => {
    const { getByText } = render(
      <DropList
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
        selection={[someItems[0], someItems[2]]}
        withMultipleSelection
      />
    )

    expect(
      getByText(someItems[0].label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeTruthy()
    expect(
      getByText(someItems[2].label).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeTruthy()
  })
})

describe('Disabled Items', () => {
  const items = someItems.map((item, index) => ({
    ...item,
    isDisabled: index % 2 === 0,
  }))

  test('should set an item as disabled and do not allow to select it (select)', () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        onSelect={onSelect}
        items={items}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
      />
    )

    expect(getByText(someItems[2].label).parentElement).toHaveClass(
      'is-disabled'
    )
    expect(getByText(someItems[1].label).parentElement).not.toHaveClass(
      'is-disabled'
    )

    user.click(getByText(someItems[2].label))

    expect(onSelect).not.toHaveBeenCalled()
  })

  test('should set an item as disabled and do not allow to select it (combobox)', () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        onSelect={onSelect}
        items={items}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
        variant="combobox"
      />
    )

    expect(getByText(someItems[2].label).parentElement).toHaveClass(
      'is-disabled'
    )

    user.click(getByText(someItems[2].label))

    expect(onSelect).not.toHaveBeenCalled()
  })

  test('should set an item as disabled and do not allow to select it with custom list', () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        onSelect={onSelect}
        items={items}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
        renderCustomListItem={({ item, isDisabled }) => (
          <div className={isDisabled ? 'is-disabled' : ''}>{item.label}</div>
        )}
      />
    )

    const exampleItem = getByText(someItems[2].label)

    expect(exampleItem.parentElement).toHaveClass('is-disabled')

    user.click(exampleItem)

    expect(onSelect).not.toHaveBeenCalled()
    expect(exampleItem).toHaveClass('is-disabled')
  })

  test('should skip disabled items when navigating down', () => {
    const { getByPlaceholderText, getByText } = render(
      <DropList
        items={items}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
        variant="combobox"
      />
    )

    user.type(getByPlaceholderText('Search'), '{arrowdown}')

    expect(getByText(someItems[0].label).parentElement).not.toHaveClass(
      'is-highlighted'
    )
    expect(getByText(someItems[1].label).parentElement).toHaveClass(
      'is-highlighted'
    )

    user.type(getByPlaceholderText('Search'), '{arrowdown}')

    expect(getByText(someItems[1].label).parentElement).not.toHaveClass(
      'is-highlighted'
    )
    expect(getByText(someItems[2].label).parentElement).not.toHaveClass(
      'is-highlighted'
    )
    expect(getByText(someItems[3].label).parentElement).toHaveClass(
      'is-highlighted'
    )
  })

  test('should skip disabled items when navigating up', () => {
    const { getByPlaceholderText, getByText } = render(
      <DropList
        items={items}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
        variant="combobox"
      />
    )

    user.type(getByPlaceholderText('Search'), '{arrowup}')

    expect(getByText(someItems[0].label).parentElement).not.toHaveClass(
      'is-highlighted'
    )
    expect(
      getByText(someItems[someItems.length - 2].label).parentElement
    ).toHaveClass('is-highlighted')

    user.type(getByPlaceholderText('Search'), '{arrowup}')

    expect(
      getByText(someItems[someItems.length - 2].label).parentElement
    ).not.toHaveClass('is-highlighted')
    expect(
      getByText(someItems[someItems.length - 3].label).parentElement
    ).not.toHaveClass('is-highlighted')
    expect(
      getByText(someItems[someItems.length - 4].label).parentElement
    ).toHaveClass('is-highlighted')
  })
})

describe('getEnabledItemIndex', () => {
  test('Regular Items', () => {
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 0,
        nextHighlightedIndex: -1,
        items: someItems,
        arrowKey: 'DOWN',
      })
    ).toBe(-1)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: -1,
        nextHighlightedIndex: 0,
        items: someItems,
        arrowKey: 'DOWN',
      })
    ).toBe(0)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 0,
        nextHighlightedIndex: 1,
        items: someItems,
        arrowKey: 'DOWN',
      })
    ).toBe(1)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 6,
        nextHighlightedIndex: 6,
        items: someItems,
        arrowKey: 'DOWN',
      })
    ).toBe(0)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 0,
        nextHighlightedIndex: 0,
        items: someItems,
        arrowKey: 'UP',
      })
    ).toBe(6)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 1,
        nextHighlightedIndex: 0,
        items: someItems,
        arrowKey: 'UP',
      })
    ).toBe(0)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 5,
        nextHighlightedIndex: 4,
        items: someItems,
        arrowKey: 'UP',
      })
    ).toBe(4)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 0,
        nextHighlightedIndex: -1,
        items: someItems,
        arrowKey: 'UP',
      })
    ).toBe(-1)
  })

  test('Grouped and divider Items', () => {
    const items = flattenListItems(groupAndDividerItems)

    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: -1,
        nextHighlightedIndex: 0,
        items,
        arrowKey: 'DOWN',
      })
    ).toBe(1)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 2,
        nextHighlightedIndex: 3,
        items,
        arrowKey: 'DOWN',
      })
    ).toBe(4)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 5,
        nextHighlightedIndex: 6,
        items,
        arrowKey: 'DOWN',
      })
    ).toBe(8)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 9,
        nextHighlightedIndex: 10,
        items,
        arrowKey: 'DOWN',
      })
    ).toBe(1)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 5,
        nextHighlightedIndex: 4,
        items,
        arrowKey: 'UP',
      })
    ).toBe(4)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 4,
        nextHighlightedIndex: 3,
        items,
        arrowKey: 'UP',
      })
    ).toBe(2)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 1,
        nextHighlightedIndex: 0,
        items,
        arrowKey: 'UP',
      })
    ).toBe(9)
  })

  test('Inert items', () => {
    const items = [
      {
        label: '0004',
        value: '0004',
      },
      {
        label: '0005',
        value: '0005',
        type: 'inert',
      },
      {
        type: 'divider',
      },
      {
        label: '0005',
        value: '0005',
      },
    ]

    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: -1,
        nextHighlightedIndex: 0,
        items,
        arrowKey: 'DOWN',
      })
    ).toBe(0)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 1,
        nextHighlightedIndex: 2,
        items,
        arrowKey: 'DOWN',
      })
    ).toBe(3)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 3,
        nextHighlightedIndex: 2,
        items,
        arrowKey: 'UP',
      })
    ).toBe(0)
  })

  test('One highlightable item', () => {
    const items = [
      {
        label: '0005',
        value: '0005',
        type: 'inert',
      },
      {
        type: 'divider',
      },
      {
        label: '0005',
        value: '0005',
      },
    ]

    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: -1,
        nextHighlightedIndex: 0,
        items,
        arrowKey: 'DOWN',
      })
    ).toBe(2)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 2,
        nextHighlightedIndex: 0,
        items,
        arrowKey: 'DOWN',
      })
    ).toBe(2)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 2,
        nextHighlightedIndex: 0,
        items,
        arrowKey: 'UP',
      })
    ).toBe(2)
  })
})

describe('More open close behaviours', () => {
  afterEach(() => {
    jest.clearAllTimers()
  })
  test('selecting an item does not focus the toggler when closeOnSelection false', () => {
    const { getByTestId, getByText } = render(
      <DropList
        closeOnSelection={false}
        items={someItems}
        isMenuOpen
        toggler={<SimpleButton text="This is a select" />}
      />
    )

    user.click(getByText('Paul').parentElement)

    expect(getByTestId('DropList.ButtonToggler')).not.toHaveFocus()
  })

  test('selecting an item refocuses the toggler when closeOnSelection true and focusTogglerOnMenuClose is false', () => {
    const { getByTestId, getByText } = render(
      <DropList
        focusTogglerOnMenuClose={false}
        items={someItems}
        isMenuOpen
        toggler={<SimpleButton text="This is a select" />}
      />
    )

    user.click(getByText('Paul').parentElement)

    expect(getByTestId('DropList.ButtonToggler')).toHaveFocus()
  })

  test('pressing escape refocuses the toggler even if focusTogglerOnMenuClose is false', () => {
    const { getByTestId, queryByText, queryByRole } = render(
      <DropList
        focusTogglerOnMenuClose={false}
        items={someItems}
        toggler={<SimpleButton text="This is a select" />}
      />
    )

    const toggler = queryByText('This is a select')

    // open the droplist
    user.click(toggler)
    // click outside
    user.type(queryByRole('listbox'), '{esc}')

    expect(getByTestId('DropList.ButtonToggler')).toHaveFocus()
  })

  test('onDropListLeave: click outside', () => {
    const onDropListLeaveSpy = jest.fn()
    const { queryByText } = render(
      <DropList
        onDropListLeave={onDropListLeaveSpy}
        focusTogglerOnMenuClose={false}
        items={someItems}
        toggler={<SimpleButton text="This is a select" />}
      />
    )

    const toggler = queryByText('This is a select')

    // open the droplist
    user.click(toggler)
    // click outside
    user.click(document.body)

    expect(onDropListLeaveSpy).toHaveBeenCalled()
  })

  test('onDropListLeave: tab out of toggler (menu open)', () => {
    const onDropListLeaveSpy = jest.fn()
    const onBlurSpy = jest.fn()
    const { queryByText } = render(
      <div>
        <DropList
          onDropListLeave={onDropListLeaveSpy}
          focusTogglerOnMenuClose={false}
          items={someItems}
          tippyOptions={{
            appendTo: document.body,
          }}
          toggler={<SimpleButton onBlur={onBlurSpy} text="This is a select" />}
        />
        <button>Demo</button>
      </div>
    )
    const toggler = queryByText('This is a select')

    user.click(toggler)

    // Focus passes to the menu when we open it
    expect(onDropListLeaveSpy).not.toHaveBeenCalled()
    expect(onBlurSpy).toHaveBeenCalled()
  })

  test('onDropListLeave: blur out of menu', async () => {
    const onDropListLeaveSpy = jest.fn()
    const { queryByText, queryByRole } = render(
      <div>
        <DropList
          onDropListLeave={onDropListLeaveSpy}
          focusTogglerOnMenuClose={false}
          items={someItems}
          tippyOptions={{
            appendTo: document.body,
          }}
          toggler={<SimpleButton text="This is a select" />}
        />
        <button>Demo</button>
      </div>
    )
    const toggler = queryByText('This is a select')

    user.click(toggler)

    expect(queryByRole('listbox')).toHaveFocus()

    user.click(queryByText('Demo'))

    await waitFor(() => {
      expect(onDropListLeaveSpy).toHaveBeenCalled()
    })
  })

  test('onDropListLeave: tab out of toggler (menu closed)', async () => {
    const onDropListLeaveSpy = jest.fn()
    const { getByTestId } = render(
      <div>
        <DropList
          onDropListLeave={onDropListLeaveSpy}
          focusTogglerOnMenuClose={false}
          items={someItems}
          toggler={<SimpleButton text="This is a select" />}
        />
        <button>Demo</button>
      </div>
    )
    const toggler = getByTestId('DropList.ButtonToggler')

    // focus the toggler
    toggler.focus()

    expect(toggler).toHaveFocus()

    // leave the toggler
    user.tab()

    await waitFor(() => {
      expect(onDropListLeaveSpy).toHaveBeenCalled()
    })
  })
})

describe('getMenuWidth', () => {
  test('should return select default width', () => {
    expect(getMenuWidth('Select')).toBe('200px')
  })

  test('should return select default width', () => {
    expect(getMenuWidth('Combobox')).toBe('220px')
  })

  test('should return custom width if provided', () => {
    expect(getMenuWidth('Combobox', '400px')).toBe('400px')
  })
})
