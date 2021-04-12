import React from 'react'
import { render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import DropList from './DropList'
import { Button, SelectTag, SplitButton } from './DropList.togglers'
import {
  itemsWithDivider,
  groupAndDividerItems,
  regularItems,
  simpleGroupedItems,
} from '../../utilities/specs/dropdown.specs'

const beatles = ['John', 'Paul', 'Ringo', 'George']

describe('Render', () => {
  test('Should render a fallback toggler if none passed', () => {
    const { getByText } = render(<DropList items={[]} />)
    expect(getByText('Fallback Toggler')).toBeInTheDocument()
  })

  test('Should render passed toggler', () => {
    const { getByText } = render(
      <DropList items={[]} toggler={<Button text="Button Toggler" />} />
    )

    expect(getByText('Button Toggler')).toBeInTheDocument()
  })

  test('should render a menu list with string items', async () => {
    const { getByRole, queryByText, queryByRole } = render(
      <DropList items={beatles} toggler={<Button text="Button Toggler" />} />
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
        items={regularItems}
        toggler={<Button text="Button Toggler" />}
      />
    )
    const toggler = getByRole('button')

    expect(queryByRole('listbox')).not.toBeInTheDocument()

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()

      regularItems.forEach(item => {
        expect(queryByText(item.label)).toBeInTheDocument()
      })
    })

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  test('should render a menu list with object items that include a value and no label', async () => {
    const regularValueItems = regularItems.map(item => {
      return { value: item.value }
    })
    const { getByRole, queryByText, queryByRole } = render(
      <DropList
        items={regularValueItems}
        toggler={<Button text="Button Toggler" />}
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

  test('should render a menu list with dividers', async () => {
    const { container, getByRole, queryByRole } = render(
      <DropList
        items={itemsWithDivider}
        toggler={<Button text="Button Toggler" />}
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
        toggler={<Button text="Button Toggler" />}
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
        toggler={<Button text="Button Toggler" />}
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
      <DropList items={[]} toggler={<Button text="Button Toggler" />} />
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
        toggler={<Button text="Button Toggler" />}
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
        toggler={<Button text="Button Toggler" />}
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
        toggler={<Button text="Button Toggler" />}
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
        toggler={<Button text="Click" />}
      />
    )

    user.click(queryByText('Click'))

    await waitFor(() => {
      const tippyContainer = document.querySelector('body > div[id^="tippy"]')

      expect(tippyContainer).toBeTruthy()
      expect(tippyContainer.classList.contains('hsds-react')).toBeTruthy()
    })
  })

  test('should close on ESC', async () => {
    const { container, getByRole } = render(
      <DropList items={beatles} isMenuOpen toggler={<Button text="Click" />} />
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
        toggler={<Button text="Click" />}
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
        toggler={<Button text="Click" />}
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
        items={regularItems}
        toggler={<Button text="Button Toggler" />}
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
        toggler={<Button text="Click" />}
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
        items={regularItems}
        toggler={<Button text="Button Toggler" />}
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
        items={regularItems}
        toggler={<Button text="Button Toggler" />}
        autoSetComboboxAt={16}
      />
    )

    await waitFor(() => {
      expect(queryByRole('listbox')).toBeInTheDocument()
      expect(queryByPlaceholderText('Search')).not.toBeInTheDocument()
    })
  })
})

describe('Combobox', () => {
  test('should render a combobox', async () => {
    const { queryByRole, getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={regularItems}
        toggler={<Button text="Button Toggler" />}
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
        items={regularItems}
        toggler={<Button text="Button Toggler" />}
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
        toggler={<Button text="Button Toggler" />}
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
        toggler={<Button text="Button Toggler" />}
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
        toggler={<Button text="Button Toggler" />}
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
        toggler={<Button onClick={onClick} text="Button Toggler" />}
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
      <DropList items={[]} toggler={<Button text="Button Toggler" />} />
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

  test('Should run action click callback on a SplitButton', async () => {
    const onActionClick = jest.fn()
    const { getByText } = render(
      <DropList
        items={beatles}
        toggler={<SplitButton text="Submit" onActionClick={onActionClick} />}
        isMenuOpen
      />
    )

    user.click(getByText('Submit'))

    await waitFor(() => {
      expect(onActionClick).toBeCalled()
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
        toggler={<Button text="Button Toggler" />}
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
      expect(onSelect).toHaveBeenCalledWith('Paul')
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
      expect(onSelect).toHaveBeenCalledWith('Ringo')
      expect(toggler.getAttribute('aria-expanded')).toBe('false')
    })
  })

  test('should select an item when clicked (object version)', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelect}
        items={regularItems}
        toggler={<Button text="Button Toggler" />}
      />
    )
    const itemToSelect = regularItems[3]

    user.click(getByText(itemToSelect.label).parentElement)

    await waitFor(() => {
      expect(
        getByText(itemToSelect.label).parentElement.classList.contains(
          'is-selected'
        )
      ).toBeTruthy()
      expect(onSelect).toHaveBeenCalledWith(itemToSelect)
    })
  })
  test('should select an item when clicked (combobox string version)', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelect}
        items={beatles}
        toggler={<Button text="Button Toggler" />}
        variant="combobox"
      />
    )

    user.click(getByText('Paul').parentElement)

    await waitFor(() => {
      expect(
        getByText('Paul').parentElement.classList.contains('is-selected')
      ).toBeTruthy()
      expect(onSelect).toHaveBeenCalledWith('Paul')
    })
  })

  test('should select an item when clicked (combobox object version)', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelect}
        items={regularItems}
        toggler={<Button text="Button Toggler" />}
        variant="combobox"
      />
    )
    const itemToSelect = regularItems[3]

    user.click(getByText(itemToSelect.label).parentElement)

    await waitFor(() => {
      expect(
        getByText(itemToSelect.label).parentElement.classList.contains(
          'is-selected'
        )
      ).toBeTruthy()
      expect(onSelect).toHaveBeenCalledWith(itemToSelect)
    })
  })

  test('should multi-select', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        isMenuOpen
        onSelect={onSelect}
        items={beatles}
        toggler={<Button text="Button Toggler" />}
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

      expect(onSelect).toHaveBeenCalledWith(['Paul'])
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
      expect(onSelect).toHaveBeenCalledWith(['Paul', 'Ringo'])
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
      expect(onSelect).toHaveBeenCalledWith(['Paul'])
    })
  })

  test('should select when filtering and pressing enter on combobox', async () => {
    const onSelect = jest.fn()
    const { getByPlaceholderText } = render(
      <DropList
        isMenuOpen
        items={beatles}
        onSelect={onSelect}
        toggler={<Button text="Button Toggler" />}
        variant="combobox"
      />
    )

    user.type(getByPlaceholderText('Search'), 'G')
    user.type(getByPlaceholderText('Search'), '{enter}')

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith('George')
    })
  })

  test('should set an initial item as selected (single string version)', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        onSelect={onSelect}
        items={beatles}
        toggler={<Button text="Button Toggler" />}
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
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        onSelect={onSelect}
        items={regularItems}
        toggler={<Button text="Button Toggler" />}
        isMenuOpen
        selection={regularItems[2]}
      />
    )

    await waitFor(() => {
      expect(
        getByText(regularItems[2].label).parentElement.classList.contains(
          'is-selected'
        )
      ).toBeTruthy()
    })
  })

  test('should set initial items as selected (multi object version)', async () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <DropList
        onSelect={onSelect}
        items={regularItems}
        toggler={<Button text="Button Toggler" />}
        isMenuOpen
        selection={[regularItems[0], regularItems[2]]}
        withMultipleSelection
      />
    )

    await waitFor(() => {
      expect(
        getByText(regularItems[0].label).parentElement.classList.contains(
          'is-selected'
        )
      ).toBeTruthy()
      expect(
        getByText(regularItems[2].label).parentElement.classList.contains(
          'is-selected'
        )
      ).toBeTruthy()
    })
  })
})
