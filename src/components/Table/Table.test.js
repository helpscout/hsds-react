import React from 'react'
import { mount, render as enzymeRender } from 'enzyme'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Table, TABLE_CLASSNAME } from './Table'
import { defaultSkin, alternativeSkin, chooseSkin } from './Table.skins'

import {
  createFakeCustomers,
  defaultColumns,
  defaultColumnsCustomContent,
} from './Table.testUtils'

describe('ClassName', () => {
  test('Wrapper has default className', () => {
    const wrapper = enzymeRender(<Table />)

    expect(wrapper.hasClass(`${TABLE_CLASSNAME}__Wrapper`)).toBeTruthy()
  })

  test('Applies custom className to wrapper if specified', () => {
    const className = 'channel-4'
    const wrapper = enzymeRender(<Table className={className} />)

    expect(wrapper.hasClass(className)).toBeTruthy()
  })

  test('Table has default className', () => {
    const wrapper = enzymeRender(<Table />)

    expect(wrapper.find('table').hasClass(TABLE_CLASSNAME)).toBeTruthy()
  })

  test('Applies custom className to table if specified', () => {
    const className = 'channel-4'
    const wrapper = enzymeRender(<Table tableClassName={className} />)

    expect(wrapper.find('table').hasClass(className)).toBeTruthy()
  })
})

describe('Table Header', () => {
  test('Renders rows and cells', () => {
    const wrapper = mount(
      <Table
        columns={defaultColumns}
        data={createFakeCustomers({ amount: 5 })}
      />
    )
    const thead = wrapper.find('thead')
    const headerCells = thead.find('th')
    const nameHeaderCell = headerCells.first()

    expect(thead.exists()).toBeTruthy()
    expect(headerCells.length).toBe(4)
    expect(nameHeaderCell.text()).toBe('Name')
  })

  test('Custom cells', () => {
    const wrapper = mount(
      <Table
        columns={defaultColumnsCustomContent}
        data={createFakeCustomers({ amount: 5 })}
      />
    )
    const thead = wrapper.find('thead')
    const headerCells = thead.find('th')
    const nameHeaderCell = headerCells.first()

    expect(nameHeaderCell.find('em').exists()).toBeTruthy()
  })
})

describe('Table Body', () => {
  test('Renders rows and cells', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const wrapper = mount(<Table columns={defaultColumns} data={customers} />)
    const tbody = wrapper.find('tbody')
    const rows = tbody.find('tr')
    const firstRow = rows.first()
    const cellsInRow = firstRow.find('td')

    expect(tbody.exists()).toBeTruthy()
    expect(rows.length).toBe(10)
    expect(cellsInRow.length).toBe(4)
    expect(firstRow.hasClass(`${TABLE_CLASSNAME}__Row`)).toBeTruthy()

    const customer = customers[0]

    expect(cellsInRow.at(0).text()).toBe(customer.name)
    expect(cellsInRow.at(1).text()).toBe(customer.companyName)
    expect(cellsInRow.at(2).text()).toBe(customer.emails)
    expect(cellsInRow.at(3).text()).toBe(customer.lastSeen)
  })

  test('Renders rows with provided classNames', () => {
    const customers = createFakeCustomers({ amount: 10 }).map(info => {
      const className = info.days < 50 ? 'active' : 'stale'
      return { ...info, ...{ className } }
    })

    const wrapper = mount(<Table columns={defaultColumns} data={customers} />)
    const tbody = wrapper.find('tbody')
    const rows = tbody.find('tr')

    customers.forEach((customer, i) => {
      expect(rows.get(i).props.className).toContain(customer.className)
    })
  })

  test('Custom cell rendering on compound columns', () => {
    const columns = [
      {
        title: 'Customer',
        columnKey: ['name', 'companyName'],
        width: '30%',
        renderCell: ({ name, companyName }) => {
          return (
            <div>
              <strong className="name">{name}</strong>
              <br />
              <span className="companyName">{companyName}</span>
            </div>
          )
        },
      },
      {
        title: 'Name',
        columnKey: 'name',
        width: '30%',
      },
    ]

    const wrapper = mount(
      <Table columns={columns} data={createFakeCustomers({ amount: 5 })} />
    )
    const tbody = wrapper.find('tbody')
    const rows = tbody.find('tr')
    const cellsInRow = rows.first().find('td')

    expect(cellsInRow.first().find('.name').exists()).toBeTruthy()
    expect(cellsInRow.first().find('.companyName').exists()).toBeTruthy()
  })
})

describe('Skin', () => {
  test('Renders default without specifying skin', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const wrapper = mount(<Table columns={defaultColumns} data={customers} />)

    expect(chooseSkin(wrapper.prop('skin'))).toEqual(defaultSkin)
  })

  test('Renders default skin', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const wrapper = mount(
      <Table columns={defaultColumns} data={customers} skin="default" />
    )

    expect(chooseSkin(wrapper.prop('skin'))).toEqual(defaultSkin)
  })

  test('Renders alternative skin', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const wrapper = mount(
      <Table columns={defaultColumns} data={customers} skin="alternative" />
    )

    expect(chooseSkin(wrapper.prop('skin'))).toEqual(alternativeSkin)
  })

  test('Renders custom skin', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const purpleSkin = {
      fontColorHeader: 'rebeccapurple',
      fontColorBody: 'rebeccapurple',
      fontColorAlternate: 'plum',
      bgHeader: 'gold',
      bgColor: 'plum',
      bgAlternate: 'rebeccapurple',
      borderTableBody: '1px solid blueviolet',
      borderTableHeader: '1px solid blueviolet',
      borderRows: '1px solid blueviolet',
      borderColumns: '1px solid blueviolet',
    }
    const wrapper = mount(
      <Table columns={defaultColumns} data={customers} skin={purpleSkin} />
    )

    expect(chooseSkin(wrapper.prop('skin'))).toEqual({
      ...defaultSkin,
      ...purpleSkin,
    })
  })
})

describe('Is loading state', () => {
  test('Displays LoadingUI', () => {
    const wrapper = enzymeRender(<Table isLoading />)

    expect(wrapper.find(`.${TABLE_CLASSNAME}__Loading`).length).toBeTruthy()
  })
})

describe('Clickable Rows', () => {
  test('Fires onRowClick when row is clicked', () => {
    const customers = createFakeCustomers({ amount: 5 })
    const spy = jest.fn()
    const { container } = render(
      <Table columns={defaultColumns} data={customers} onRowClick={spy} />
    )
    const row = container.querySelector('tbody > tr')

    user.click(row)

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(expect.any(Object), customers[0])
  })
})

describe('Sortable', () => {
  test('Fires function when header cell is clicked', () => {
    const customers = createFakeCustomers({ amount: 5 })
    const regularColumnSpy = jest.fn()
    const compoundColumnSpy = jest.fn()
    const columns = [
      {
        title: 'Name',
        columnKey: 'name',
        width: '30%',
        sortKey: 'name',
        sorter: regularColumnSpy,
      },
      {
        title: 'Customer (sorts by name)',
        columnKey: ['name', 'companyName'],
        width: '30%',
        sortKey: 'companyName',
        sorter: compoundColumnSpy,
      },
    ]
    const { container, rerender } = render(
      <Table
        columns={columns}
        data={customers}
        sortedInfo={{
          columnKey: null,
          order: null,
        }}
      />
    )

    // Regular column sorting, should be called with 'columnKey'
    expect(container.querySelector(`thead th`).getAttribute('aria-sort')).toBe(
      'none'
    )

    rerender(
      <Table
        columns={columns}
        data={customers}
        sortedInfo={{
          columnKey: 'name',
          order: 'ascending',
        }}
      />
    )

    expect(container.querySelector('thead th').getAttribute('aria-sort')).toBe(
      'ascending'
    )

    user.click(container.querySelector('thead th div'))

    expect(regularColumnSpy).toHaveBeenCalled()
    expect(regularColumnSpy).toHaveBeenCalledWith(columns[0].columnKey)

    expect(
      container.querySelector(`.${TABLE_CLASSNAME}__SortableHeaderCell`)
    ).toBeInTheDocument()

    expect(
      container.querySelector(`.${TABLE_CLASSNAME}__SortableHeaderCell__title`)
    ).toBeInTheDocument()

    // Compound column sorting, should be called with 'sortKey'
    const customerHeaderCell = container.querySelectorAll('thead th')[1]

    user.click(customerHeaderCell.querySelector('div'))

    expect(compoundColumnSpy).toHaveBeenCalled()
    expect(compoundColumnSpy).toHaveBeenCalledWith(columns[1].sortKey)

    rerender(
      <Table
        columns={columns}
        data={customers}
        sortedInfo={{
          columnKey: 'name',
          order: 'descending',
        }}
      />
    )

    expect(container.querySelector('thead th').getAttribute('aria-sort')).toBe(
      'descending'
    )
  })
})

describe('Expandable', () => {
  test('Table is collapsed on initial state to the value of maxRowsToDisplay', () => {
    const { container } = render(
      <Table
        columns={defaultColumns}
        data={createFakeCustomers({ amount: 10 })}
        maxRowsToDisplay={4}
      />
    )

    expect(container.querySelectorAll('tbody tr').length).toBe(4)
  })

  test('Table expands/collapses on click of Expander', () => {
    const { container, getByRole } = render(
      <Table
        columns={defaultColumns}
        data={createFakeCustomers({ amount: 10 })}
        maxRowsToDisplay={4}
      />
    )

    expect(container.querySelectorAll('tbody tr').length).toBe(4)
    expect(getByRole('button').textContent).toBe('View All')

    user.click(getByRole('button'))

    expect(container.querySelectorAll('tbody tr').length).toBe(10)
    expect(getByRole('button').textContent).toBe('Collapse')

    user.click(getByRole('button'))

    expect(container.querySelectorAll('tbody tr').length).toBe(4)
    expect(getByRole('button').textContent).toBe('View All')
  })

  test('Table expands/collapses on click of Expander (custom text)', () => {
    const wrapper = mount(
      <Table
        columns={defaultColumns}
        data={createFakeCustomers({ amount: 10 })}
        maxRowsToDisplay={4}
        expanderText={{
          collapsed: 'Show me all',
          expanded: 'Show me the top 4',
        }}
      />
    )
    const expander = wrapper.find(`.${TABLE_CLASSNAME}__Expander`).first()
    expander.simulate('click')

    expect(expander.text()).toBe('Show me all')

    const expander2 = wrapper.find(`.${TABLE_CLASSNAME}__Expander`).first()
    expander2.simulate('click')

    expect(expander2.text()).toBe('Show me the top 4')
  })

  test('Table fires onExpand on click of Expander', () => {
    const spy = jest.fn()
    const { getByRole } = render(
      <Table
        columns={defaultColumns}
        data={createFakeCustomers({ amount: 10 })}
        maxRowsToDisplay={4}
        onExpand={spy}
      />
    )

    user.click(getByRole('button'))

    expect(spy).toHaveBeenCalled()
  })
})
