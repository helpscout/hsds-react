import React from 'react'
import { render, screen } from '@testing-library/react'
import FilteredList from './FilteredList'

describe('Rendering', () => {
  it('Renders a list of items', () => {
    const items = ['test@test.com', 'test2@test.com']
    const { queryAllByTestId } = render(<FilteredList items={items} />)

    const allItems = queryAllByTestId('FilteredList.Item')
    expect(allItems.length).toBe(items.length)
    expect(allItems[0]).toHaveTextContent(items[0])
  })
})

describe('Inlined', () => {
  it('Renders separator when inlined', () => {
    const items = ['test@test.com', 'test2@test.com']
    const { getByTestId } = render(<FilteredList inline items={items} />)

    expect(getByTestId('FilteredList.Separator')).toBeTruthy()
  })

  it('Does not render separator when length of list is exceeded', () => {
    const items = ['test@test.com']
    const { queryByTestId } = render(
      <FilteredList inline items={items} limit={3} />
    )
    expect(queryByTestId('FilteredList.Separator')).toBeFalsy()
  })
})

describe('Badge', () => {
  it('Renders a badge if number of items is higher than limit', () => {
    const items = ['test@test.com', 'test2@test.com']
    const limit = 1
    const { getByTestId, queryAllByTestId } = render(
      <FilteredList items={items} limit={limit} />
    )

    expect(getByTestId('FilteredList.Badge')).toHaveTextContent(
      `+${items.length - limit}`
    )

    expect(queryAllByTestId('FilteredList.Item').length).toBe(
      items.length - limit
    )
  })

  it('Rendered badge is within last item children', () => {
    const items = ['test@test.com', 'test2@test.com']
    const limit = 1
    const { container } = render(<FilteredList items={items} limit={limit} />)

    const nodes = container.querySelectorAll(
      '[data-testid="FilteredList.Item"]'
    )
    const lastNode = nodes[nodes.length - 1]

    expect(
      lastNode.querySelector('[data-testid="FilteredList.Badge"]')
    ).toBeTruthy()
  })
  it('Does not render a badge if limit is null', () => {
    const items = ['test@test.com', 'test2@test.com']
    const { queryByTestId } = render(<FilteredList items={items} />)

    expect(queryByTestId('FilteredList.Badge')).toBeFalsy()
  })
  it('Does not render a badge if limit is 0', () => {
    const items = ['test@test.com', 'test2@test.com']
    const { queryByTestId } = render(<FilteredList items={items} limit={0} />)

    expect(queryByTestId('FilteredList.Badge')).toBeFalsy()
  })
  it('Does not render a badge if limit is lower than items length', () => {
    const items = ['test@test.com', 'test2@test.com', 'test3@test.com']
    const { queryByTestId } = render(<FilteredList items={items} limit={10} />)

    expect(queryByTestId('FilteredList.Badge')).toBeFalsy()
  })
  it('Does not render a badge if limit is equal to items length', () => {
    const items = ['test@test.com', 'test2@test.com', 'test3@test.com']
    const { queryByTestId } = render(
      <FilteredList items={items} limit={items.length} />
    )

    expect(queryByTestId('FilteredList.Badge')).toBeFalsy()
  })
})

describe('Tooltip', () => {
  it('Renders a tooltip alongside the badge', () => {
    const items = ['test@test.com', 'test2@test.com', 'test3@test.com']
    const { container } = render(<FilteredList items={items} limit={1} />)
    const tooltipNode = container.querySelector('.TooltipTrigger')
    expect(tooltipNode).toBeTruthy()
    expect(tooltipNode).toHaveAttribute('data-testid', 'FilteredList.Badge')
  })
  it('Renders rest of items within the tooltip', () => {
    const items = [
      'test@test.com',
      'test2@test.com',
      'test3@test.com',
      'test4@test.com',
      'test5@test.com',
    ]
    const limit = 1
    const component = <FilteredList items={items} limit={limit} />
    const { container } = render(component)

    expect(container.querySelector('.c-Badge').textContent).toBe(
      `+${items.length - limit}`
    )

    container.querySelector('.c-Badge').focus()

    // const wrapper = mount(component)
    // const badgeItems = wrapper.instance().renderBadgeContent()
    expect(screen.queryAllByTestId('FilteredList.BadgeItem').length).toBe(
      items.length - limit
    )
  })
})

describe('Custom Renderer', () => {
  it('Renders the item using a custom renderer', () => {
    const items = [
      { label: 'Google', href: 'https://google.com' },
      { label: 'Bing', href: 'https://bing.com' },
      { label: 'DuckDuckGo', href: 'https://duckduckgo.com' },
    ]
    const renderItem = item => {
      return <a href={item.href}>{item.label}</a>
    }

    const { container } = render(
      <FilteredList
        renderItem={renderItem}
        items={items}
        limit={5}
        inline
        itemKey="label"
      />
    )

    expect(container.querySelectorAll('a').length).toBe(3)
    expect(container.querySelectorAll('a')[0].textContent).toBe('Google')
  })

  it('Renders the item using a different item key', () => {
    const items = [
      { label: 'Google', href: 'https://google.com' },
      { label: 'Bing', href: 'https://bing.com' },
      { label: 'DuckDuckGo', href: 'https://duckduckgo.com' },
    ]

    const { getByText } = render(<FilteredList items={items} itemKey="href" />)

    expect(getByText('https://google.com')).toBeInTheDocument()
  })
})
