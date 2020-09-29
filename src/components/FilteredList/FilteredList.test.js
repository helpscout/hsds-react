import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import { Tooltip } from '..'
import { FilteredList } from './FilteredList'
import { ItemUI, BadgeUI, SeparatorUI } from './FilteredList.css'

describe('Rendering', () => {
  it('Renders a list of items', () => {
    const items = ['test@test.com', 'test2@test.com']
    const wrapper = mount(<FilteredList items={items} />)

    expect(wrapper.find(ItemUI).length).toBe(items.length)
    expect(wrapper.find(ItemUI).first().text()).toBe(items[0])
  })

  it('Should not re-renderer the component if items are the same', () => {
    const items = ['test@test.com', 'test2@test.com']
    const wrapper = mount(<FilteredList items={items} />)

    const newProps = { items: ['test2@test.com', 'test@test.com'] }
    expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeFalsy()
  })

  it('Should re-renderer the component if items length changed', () => {
    const items = ['test@test.com', 'test2@test.com']
    const wrapper = mount(<FilteredList items={items} />)

    const newProps = {
      items: ['test2@test.com', 'test@test.com', 'test3@test.com'],
    }
    expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeTruthy()
  })

  it('Should re-renderer the component if items changed', () => {
    const items = ['test@test.com', 'test2@test.com']
    const wrapper = mount(<FilteredList items={items} />)

    const newProps = { items: ['test4@test.com', 'test@test.com'] }
    expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeTruthy()
  })
})

describe('Inlined', () => {
  it('Renders separator when inlined', () => {
    const items = ['test@test.com', 'test2@test.com']
    const wrapper = mount(<FilteredList inline items={items} />)

    expect(wrapper.find(SeparatorUI).length).toBeTruthy()
  })

  it('Does not render separator when length of list is exceeded', () => {
    const items = ['test@test.com']
    const wrapper = mount(<FilteredList inline items={items} limit={3} />)
    expect(wrapper.find(SeparatorUI).length).toEqual(0)
  })
})

describe('Badge', () => {
  it('Renders a badge if number of items is higher than limit', () => {
    const items = ['test@test.com', 'test2@test.com']
    const limit = 1
    const wrapper = mount(<FilteredList items={items} limit={limit} />)

    expect(wrapper.find(BadgeUI).first().text()).toBe(
      `+${items.length - limit}`
    )

    expect(wrapper.find(ItemUI).length).toBe(items.length - limit)
  })

  it('Rendered badge is within last item children', () => {
    const items = ['test@test.com', 'test2@test.com']
    const limit = 1
    const wrapper = mount(<FilteredList items={items} limit={limit} />)

    expect(wrapper.find(ItemUI).last().find(BadgeUI).length).toBeTruthy()
  })
  it('Does not render a badge if limit is null', () => {
    const items = ['test@test.com', 'test2@test.com']
    const wrapper = mount(<FilteredList items={items} />)

    expect(wrapper.find(BadgeUI).length).toBeFalsy()
  })
  it('Does not render a badge if limit is 0', () => {
    const items = ['test@test.com', 'test2@test.com']
    const wrapper = mount(<FilteredList items={items} limit={0} />)

    expect(wrapper.find(BadgeUI).length).toBeFalsy()
  })
  it('Does not render a badge if limit is lower than items length', () => {
    const items = ['test@test.com', 'test2@test.com', 'test3@test.com']
    const wrapper = mount(<FilteredList items={items} limit={10} />)

    expect(wrapper.find(BadgeUI).length).toBeFalsy()
  })
  it('Does not render a badge if limit is equal to items length', () => {
    const items = ['test@test.com', 'test2@test.com', 'test3@test.com']
    const wrapper = mount(<FilteredList items={items} limit={items.length} />)

    expect(wrapper.find(BadgeUI).length).toBeFalsy()
  })
})

describe('Tooltip', () => {
  it('Renders a tooltip alongside the badge', () => {
    const items = ['test@test.com', 'test2@test.com', 'test3@test.com']
    const wrapper = mount(<FilteredList items={items} limit={1} />)

    expect(wrapper.find(Tooltip).length).toBeTruthy()
    expect(wrapper.find(Tooltip).find(BadgeUI)).toBeTruthy()
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

    const wrapper = mount(component)
    const badgeItems = wrapper.instance().renderBadgeContent()
    expect(badgeItems.length).toBe(items.length - limit)
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

  it('Should update if the value of one item change ', () => {
    const items = [
      { label: 'Google', href: 'https://google.com' },
      { label: 'Bing', href: 'https://bing.com' },
      { label: 'DuckDuckGo', href: 'https://duckduckgo.com' },
    ]
    const renderItem = item => {
      return <a href={item.href}>{item.label}</a>
    }

    const wrapper = mount(
      <FilteredList
        renderItem={renderItem}
        items={items}
        limit={5}
        inline
        itemKey="label"
      />
    )

    const newItems = [
      { label: 'New Google', href: 'https://google.com' },
      { label: 'New Bing', href: 'https://bing.com' },
      { label: 'New DuckDuckGo', href: 'https://duckduckgo.com' },
    ]
    expect(
      wrapper.instance().shouldComponentUpdate({ items: newItems })
    ).toBeTruthy()
  })
})
