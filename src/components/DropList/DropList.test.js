import React from 'react'
import { render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { css } from 'styled-components'
import DropList from './DropList'
import { SimpleButton, SelectTag, SplittedButton } from './DropList.togglers'
import { flattenListItems, getEnabledItemIndex } from './DropList.utils'
import {
  itemsWithDivider,
  groupAndDividerItems,
  simpleGroupedItems,
} from '../../utilities/specs/dropdown.specs'

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
    const { getByRole, queryByText, queryByRole } = render(
      <DropList
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByRole('button')

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

  test('should render a menu list with object items that include a label', async () => {
    const { getByRole, queryByText, queryByRole } = render(
      <DropList
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByRole('button')

    expect(queryByRole('listbox')).not.toBeInTheDocument()

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()

      someItems.forEach(item => {
        expect(queryByText(item.label)).toBeInTheDocument()
      })
    })

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  test('should render a menu list with object items that include a value and no label', async () => {
    const regularValueItems = someItems.map(item => {
      return { value: item.label }
    })
    const { getByRole, queryByText, queryByRole } = render(
      <DropList
        items={regularValueItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByRole('button')

    expect(queryByRole('listbox')).not.toBeInTheDocument()

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()

      regularValueItems.forEach(item => {
        expect(queryByText(item.value)).toBeInTheDocument()
      })
    })

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  test('should add a classname to the list item if present in the item', async () => {
    const { getByRole, queryByText } = render(
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
    const toggler = getByRole('button')

    user.click(toggler)

    await waitFor(() => {
      expect(
        queryByText(someItems[1].label).parentElement.classList.contains(
          'paintItBlue'
        )
      ).toBeTruthy()
    })
  })

  test('should render a menu list with dividers', async () => {
    const { container, getByRole, queryByRole } = render(
      <DropList
        items={itemsWithDivider}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByRole('button')

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()
      expect(container.querySelector('.DropListItem--divider')).toBeTruthy()
    })
  })

  test('should render a menu list with groups', async () => {
    const { container, getByRole, queryByRole } = render(
      <DropList
        items={simpleGroupedItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByRole('button')

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()
      expect(container.querySelector('.DropListItem--groupLabel')).toBeTruthy()
    })
  })

  test('should render a menu list with groups and dividers', async () => {
    const { container, getByRole, queryByRole } = render(
      <DropList
        items={groupAndDividerItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByRole('button')

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()
      expect(container.querySelector('.DropListItem--groupLabel')).toBeTruthy()
      expect(container.querySelector('.DropListItem--divider')).toBeTruthy()
    })
  })

  test('should render an empty menu list if no items in the array', async () => {
    const { getByRole, queryByText, queryByRole } = render(
      <DropList items={[]} toggler={<SimpleButton text="Button Toggler" />} />
    )
    const toggler = getByRole('button')
    expect(toggler.getAttribute('aria-expanded')).toBe('false')
    expect(queryByRole('listbox')).not.toBeInTheDocument()

    user.click(toggler)

    await waitFor(() => {
      expect(toggler.getAttribute('aria-expanded')).toBe('true')
      expect(queryByRole('listbox')).toBeInTheDocument()
      expect(queryByText('No items')).toBeInTheDocument()
    })

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  test('should render a custom empty menu list if no items in the array', async () => {
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

    await waitFor(() => {
      expect(
        queryByText('My Empty List is Better Than Your Empty List')
      ).toBeInTheDocument()
    })
  })

  test('should render a the empty menu list if no items in the array (invalid custom element)', async () => {
    const { queryByText } = render(
      <DropList
        items={[]}
        customEmptyList="something"
        isMenuOpen
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )

    await waitFor(() => {
      expect(queryByText('No items')).toBeInTheDocument()
    })
  })

  test('should render custom list items', async () => {
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

    await waitFor(() => {
      beatles.forEach(beatle => {
        expect(queryByText(beatle)).toBeInTheDocument()
      })
      expect(container.querySelector('.DropListItem--custom')).toBeTruthy()
      expect(container.querySelector('.customized')).toBeTruthy()
    })
  })

  test('should be able to render in given element via tippy options', async () => {
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

    await waitFor(() => {
      const tippyContainer = document.querySelector('body > div[id^="tippy"]')

      expect(tippyContainer).toBeTruthy()
      expect(tippyContainer.classList.contains('hsds-react')).toBeTruthy()
    })
  })

  test('should be able to pass custom css to the menu when portaling', async () => {
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

    await waitFor(() => {
      const select = document.querySelector('.DropList__Select')

      expect(window.getComputedStyle(select).getPropertyValue('outline')).toBe(
        "'2px solid salmon'"
      )
    })
  })

  test('should close on ESC', async () => {
    const { container, getByRole } = render(
      <DropList
        items={beatles}
        isMenuOpen
        toggler={<SimpleButton text="Click" />}
      />
    )

    user.type(container, '{esc}')

    await waitFor(() => {
      expect(getByRole('button').getAttribute('aria-expanded')).toBe('false')
    })
  })

  test('should close on ESC on combobox', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <DropList
        items={beatles}
        isMenuOpen
        variant="combobox"
        toggler={<SimpleButton text="Click" />}
      />
    )

    user.type(getByPlaceholderText('Search'), '{esc}')

    await waitFor(() => {
      expect(getByRole('button').getAttribute('aria-expanded')).toBe('false')
    })
  })

  test('should close combobox on input blur', async () => {
    const { getByRole } = render(
      <DropList
        items={beatles}
        isMenuOpen
        variant="combobox"
        toggler={<SimpleButton text="Click" />}
      />
    )

    user.tab()

    await waitFor(() => {
      expect(getByRole('button').getAttribute('aria-expanded')).toBe('false')
    })
  })
})

describe('Menu', () => {
  test('should be open if isMenuOpen is true', async () => {
    const { queryByRole } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()
    })
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

  test('should render a combobox when autoSetComboboxAt is smaller than the number of items', async () => {
    const { queryByRole, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        autoSetComboboxAt={3}
      />
    )

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()
      expect(getByPlaceholderText('Search')).toBeInTheDocument()
      expect(
        window
          .getComputedStyle(getByPlaceholderText('Search').parentElement)
          .getPropertyValue('display')
      ).toBe('block')
    })
  })

  test('should render a select when autoSetComboboxAt is larger than the number of items', async () => {
    const { queryByRole, queryByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        autoSetComboboxAt={16}
      />
    )

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()
      expect(queryByPlaceholderText('Search')).not.toBeInTheDocument()
    })
  })

  test('should fire onMenuFocus and onMenuBlur (Combobox)', async () => {
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

    await waitFor(() => {
      expect(focusSpy).toHaveBeenCalled()
    })

    user.click(queryByText('Click'))

    await waitFor(() => {
      expect(blurSpy).toHaveBeenCalled()
    })
  })

  test('should fire onMenuFocus and onMenuBlur (Select)', async () => {
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

    await waitFor(() => {
      expect(focusSpy).toHaveBeenCalled()
    })

    user.click(queryByText('Click'))

    await waitFor(() => {
      expect(blurSpy).toHaveBeenCalled()
    })
  })
})

describe('Combobox', () => {
  test('should render a combobox', async () => {
    const { queryByRole, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()
      expect(getByPlaceholderText('Search')).toBeInTheDocument()
      expect(
        window
          .getComputedStyle(getByPlaceholderText('Search').parentElement)
          .getPropertyValue('display')
      ).toBe('block')
    })
  })

  test('should focus input when open', async () => {
    const { getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    await waitFor(() => {
      expect(document.activeElement).toBe(getByPlaceholderText('Search'))
    })
  })

  test('should hide the search input on combobox if list empty', async () => {
    const { queryByRole, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={[]}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()
      expect(
        window
          .getComputedStyle(getByPlaceholderText('Search').parentElement)
          .getPropertyValue('display')
      ).toBe('none')
    })
  })

  test('should filter items', async () => {
    const { container, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    await waitFor(() => {
      expect(container.querySelectorAll('.DropListItem').length).toBe(4)
    })

    user.type(getByPlaceholderText('Search'), 'G')

    await waitFor(() => {
      expect(container.querySelectorAll('.DropListItem').length).toBe(1)
    })
  })

  test('should filter items to empty if none found', async () => {
    const { container, getByText, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    await waitFor(() => {
      expect(container.querySelectorAll('.DropListItem').length).toBe(4)
    })

    user.type(getByPlaceholderText('Search'), 'Z')

    await waitFor(() => {
      expect(container.querySelectorAll('.DropListItem').length).toBe(0)
      expect(getByText('No results for Z')).toBeInTheDocument()
    })
  })
})

describe('Togglers', () => {
  test('Should run custom onclick callback', async () => {
    const onClick = jest.fn()
    const { getByRole } = render(
      <DropList
        items={[]}
        toggler={<SimpleButton onClick={onClick} text="Button Toggler" />}
      />
    )
    const toggler = getByRole('button')

    user.click(toggler)

    await waitFor(() => {
      expect(onClick).toHaveBeenCalled()
    })
  })

  test('Should pass the open/closed state to the toggler', async () => {
    const { getByRole } = render(
      <DropList items={[]} toggler={<SimpleButton text="Button Toggler" />} />
    )
    const toggler = getByRole('button')

    user.click(toggler)

    await waitFor(() => {
      expect(toggler.classList.contains('is-active')).toBeTruthy()
    })

    user.click(toggler)

    await waitFor(() => {
      expect(toggler.classList.contains('is-active')).toBeFalsy()
    })
  })

  test('Should pass the selected item text to the SelectTag toggler', async () => {
    const { container, getByText } = render(
      <DropList items={beatles} toggler={<SelectTag />} isMenuOpen />
    )

    await waitFor(() => {
      expect(container.querySelector('.SelectTagToggler').textContent).toBe('')
    })

    user.click(getByText('John').parentElement)

    await waitFor(() => {
      expect(container.querySelector('.SelectTagToggler').textContent).toBe(
        'John'
      )
    })
  })

  describe('SelectTag error state', () => {
    test('Should show error when error provided to toggler', async () => {
      const error = 'Some error'
      const { getByLabelText, getByTitle } = render(
        <DropList items={beatles} toggler={<SelectTag error={error} />} />
      )

      await waitFor(() => {
        expect(getByTitle('alert')).toBeInTheDocument()
      })
      expect(getByLabelText('toggle menu')).toHaveClass('is-error')
    })

    test('Should not show error when none', async () => {
      const { getByLabelText, queryByTitle } = render(
        <DropList items={beatles} toggler={<SelectTag />} />
      )

      await waitFor(() => {
        expect(getByLabelText('toggle menu')).not.toHaveClass('is-error')
      })
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
  test('should select an item when clicked (string version)', async () => {
    const onSelect = jest.fn()
    const { getByText, getByRole } = render(
      <DropList
        onSelect={onSelect}
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const toggler = getByRole('button')

    user.click(toggler)

    expect(toggler.getAttribute('aria-expanded')).toBe('true')

    user.click(getByText('Paul').parentElement)

    await waitFor(() => {
      expect(
        getByText('Paul').parentElement.classList.contains('is-selected')
      ).toBeTruthy()
      expect(onSelect).toHaveBeenCalledWith('Paul', expect.anything(), 'Paul')
      expect(toggler.getAttribute('aria-expanded')).toBe('false')
    })

    // click another one should deselect the previous and select new one
    user.click(toggler)

    await waitFor(() => {
      expect(toggler.getAttribute('aria-expanded')).toBe('true')
      user.click(getByText('Ringo').parentElement)
      user.click(getByText('Ringo').parentElement)
    })

    await waitFor(() => {
      expect(
        getByText('Paul').parentElement.classList.contains('is-selected')
      ).toBeFalsy()
      expect(
        getByText('Ringo').parentElement.classList.contains('is-selected')
      ).toBeTruthy()
      expect(onSelect).toHaveBeenCalledWith('Ringo', expect.anything(), 'Ringo')
      expect(toggler.getAttribute('aria-expanded')).toBe('false')
    })
  })

  test('should select an item when clicked (object version)', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelect}
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
      />
    )
    const itemToSelect = someItems[3]

    user.click(getByText(itemToSelect.label).parentElement)

    await waitFor(() => {
      expect(
        getByText(itemToSelect.label).parentElement.classList.contains(
          'is-selected'
        )
      ).toBeTruthy()
      expect(onSelect).toHaveBeenCalledWith(
        itemToSelect,
        expect.anything(),
        itemToSelect
      )
    })
  })
  test('should select an item when clicked (combobox string version)', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelect}
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    user.click(getByText('Paul').parentElement)

    await waitFor(() => {
      expect(
        getByText('Paul').parentElement.classList.contains('is-selected')
      ).toBeTruthy()
      expect(onSelect).toHaveBeenCalledWith('Paul', expect.anything(), 'Paul')
    })
  })

  test('should select an item when clicked (combobox object version)', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelect}
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )
    const itemToSelect = someItems[3]

    user.click(getByText(itemToSelect.label).parentElement)

    await waitFor(() => {
      expect(
        getByText(itemToSelect.label).parentElement.classList.contains(
          'is-selected'
        )
      ).toBeTruthy()
      expect(onSelect).toHaveBeenCalledWith(
        itemToSelect,
        expect.anything(),
        itemToSelect
      )
    })
  })

  test('should multi-select', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={(selection, clearSelection, clickedItem) => {
          onSelect(selection, clearSelection, clickedItem)
          // Clear selection when clicking John
          if (clickedItem === 'John') {
            clearSelection()
          }
        }}
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
        withMultipleSelection
      />
    )

    user.click(getByText('Paul').parentElement)

    await waitFor(() => {
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

      expect(onSelect).toHaveBeenCalledWith(['Paul'], expect.anything(), 'Paul')
    })

    user.click(getByText('Ringo').parentElement)

    await waitFor(() => {
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
      expect(onSelect).toHaveBeenCalledWith(
        ['Paul', 'Ringo'],
        expect.anything(),
        'Ringo'
      )
    })

    user.click(getByText('Ringo').parentElement)

    await waitFor(() => {
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
      expect(onSelect).toHaveBeenCalledWith(['Paul'], expect.anything(), {
        label: 'Ringo',
        remove: true,
      })
    })

    // Clicking John clears all selections
    user.click(getByText('John').parentElement)

    await waitFor(() => {
      expect(
        getByText('Paul').parentElement.classList.contains('is-selected')
      ).toBeFalsy()
      expect(
        getByText('Ringo').parentElement.classList.contains('is-selected')
      ).toBeFalsy()
      expect(
        getByText('George').parentElement.classList.contains('is-selected')
      ).toBeFalsy()
      expect(
        getByText('John').parentElement.classList.contains('is-selected')
      ).toBeFalsy()
    })
  })

  test('should select when filtering and pressing enter on combobox', async () => {
    const onSelect = jest.fn()
    const { getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={beatles}
        onSelect={onSelect}
        toggler={<SimpleButton text="Button Toggler" />}
        variant="combobox"
      />
    )

    user.type(getByPlaceholderText('Search'), 'G')
    user.type(getByPlaceholderText('Search'), '{enter}')

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith(
        'George',
        expect.anything(),
        'George'
      )
    })
  })

  test('should set an initial item as selected (single string version)', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        onSelect={onSelect}
        items={beatles}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
        selection="Ringo"
      />
    )

    await waitFor(() => {
      expect(
        getByText('Ringo').parentElement.classList.contains('is-selected')
      ).toBeTruthy()
    })
  })

  test('should set an initial item as selected (single object version)', async () => {
    const { getByText } = render(
      <DropList
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
        selection={someItems[2]}
      />
    )

    await waitFor(() => {
      expect(
        getByText(someItems[2].label).parentElement.classList.contains(
          'is-selected'
        )
      ).toBeTruthy()
    })
  })

  test('should set initial items as selected (multi object version)', async () => {
    const { getByText } = render(
      <DropList
        items={someItems}
        toggler={<SimpleButton text="Button Toggler" />}
        isMenuOpen
        selection={[someItems[0], someItems[2]]}
        withMultipleSelection
      />
    )

    await waitFor(() => {
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

  describe('disabled items', () => {
    const items = someItems.map((item, index) => ({
      ...item,
      isDisabled: index % 2 === 0,
    }))

    test('should set an item as disabled and do not allow to select it (select)', async () => {
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

      await waitFor(() => {
        expect(onSelect).not.toHaveBeenCalled()
      })
    })

    test('should set an item as disabled and do not allow to select it (combobox)', async () => {
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

      await waitFor(() => {
        expect(onSelect).not.toHaveBeenCalled()
      })
    })

    test('should set an item as disabled and do not allow to select it with custom list', async () => {
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

      await waitFor(() => {
        expect(onSelect).not.toHaveBeenCalled()
        expect(exampleItem).toHaveClass('is-disabled')
      })
    })

    test('should skip disabled items when navigating down', async () => {
      const { getByPlaceholderText, getByText } = render(
        <DropList
          items={items}
          toggler={<SimpleButton text="Button Toggler" />}
          isMenuOpen
          variant="combobox"
        />
      )

      user.type(getByPlaceholderText('Search'), '{arrowdown}')

      await waitFor(() => {
        expect(getByText(someItems[0].label).parentElement).not.toHaveClass(
          'is-highlighted'
        )
        expect(getByText(someItems[1].label).parentElement).toHaveClass(
          'is-highlighted'
        )
      })

      user.type(getByPlaceholderText('Search'), '{arrowdown}')

      await waitFor(() => {
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
    })

    test('should skip disabled items when navigating up', async () => {
      const { getByPlaceholderText, getByText } = render(
        <DropList
          items={items}
          toggler={<SimpleButton text="Button Toggler" />}
          isMenuOpen
          variant="combobox"
        />
      )

      user.type(getByPlaceholderText('Search'), '{arrowup}')

      await waitFor(() => {
        expect(getByText(someItems[0].label).parentElement).not.toHaveClass(
          'is-highlighted'
        )
        expect(
          getByText(someItems[someItems.length - 2].label).parentElement
        ).toHaveClass('is-highlighted')
      })

      user.type(getByPlaceholderText('Search'), '{arrowup}')

      await waitFor(() => {
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
  })

  describe('Disabled items', () => {
    const items = someItems.map((item, index) => ({
      ...item,
      isDisabled: index % 2 === 0,
    }))

    test('should set an item as disabled and do not allow to select it (select)', async () => {
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

      await waitFor(() => {
        expect(onSelect).not.toHaveBeenCalled()
      })
    })

    test('should set an item as disabled and do not allow to select it (combobox)', async () => {
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

      await waitFor(() => {
        expect(onSelect).not.toHaveBeenCalled()
      })
    })

    test('should set an item as disabled and do not allow to select it with custom list', async () => {
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

      await waitFor(() => {
        expect(onSelect).not.toHaveBeenCalled()
        expect(exampleItem).toHaveClass('is-disabled')
      })
    })

    test('should skip disabled items when navigating down', async () => {
      const { getByPlaceholderText, getByText } = render(
        <DropList
          items={items}
          toggler={<SimpleButton text="Button Toggler" />}
          isMenuOpen
          variant="combobox"
        />
      )

      user.type(getByPlaceholderText('Search'), '{arrowdown}')

      await waitFor(() => {
        expect(getByText(someItems[0].label).parentElement).not.toHaveClass(
          'is-highlighted'
        )
        expect(getByText(someItems[1].label).parentElement).toHaveClass(
          'is-highlighted'
        )
      })

      user.type(getByPlaceholderText('Search'), '{arrowdown}')

      await waitFor(() => {
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
    })

    test('should skip disabled items when navigating up', async () => {
      const { getByPlaceholderText, getByText } = render(
        <DropList
          items={items}
          toggler={<SimpleButton text="Button Toggler" />}
          isMenuOpen
          variant="combobox"
        />
      )

      user.type(getByPlaceholderText('Search'), '{arrowup}')

      await waitFor(() => {
        expect(getByText(someItems[0].label).parentElement).not.toHaveClass(
          'is-highlighted'
        )
        expect(
          getByText(someItems[someItems.length - 2].label).parentElement
        ).toHaveClass('is-highlighted')
      })

      user.type(getByPlaceholderText('Search'), '{arrowup}')

      await waitFor(() => {
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
  })
})

describe('getEnabledItemIndex', () => {
  test('Regular Items', () => {
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
        nextHighlightedIndex: 1,
        items: someItems,
        arrowKey: 'UP',
      })
    ).toBe(1)
    expect(
      getEnabledItemIndex({
        nextHighlightedIndex: 0,
        items: someItems,
        arrowKey: 'UP',
      })
    ).toBe(6)
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
    ).toBe(3)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 6,
        nextHighlightedIndex: 7,
        items,
        arrowKey: 'DOWN',
      })
    ).toBe(9)
    expect(
      getEnabledItemIndex({
        currentHighlightedIndex: 13,
        nextHighlightedIndex: 13,
        items,
        arrowKey: 'DOWN',
      })
    ).toBe(1)
    expect(
      getEnabledItemIndex({
        nextHighlightedIndex: 8,
        items,
        arrowKey: 'UP',
      })
    ).toBe(6)
    expect(
      getEnabledItemIndex({
        nextHighlightedIndex: 7,
        items,
        arrowKey: 'UP',
      })
    ).toBe(6)
    expect(
      getEnabledItemIndex({
        nextHighlightedIndex: 0,
        items,
        arrowKey: 'UP',
      })
    ).toBe(13)
  })
})
