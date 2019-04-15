import React from 'react'
import { mount, render } from 'enzyme'
import { Table, TABLE_CLASSNAME } from '../Table'
import { defaultTheme, alternativeTheme, chooseTheme } from '../styles/themes'

import {
  createFakeCustomers,
  defaultColumns,
  defaultColumnsCustomContent,
} from './utils'

describe('ClassName', () => {
  test('Wrapper has default className', () => {
    const wrapper = render(<Table />)

    expect(wrapper.hasClass(`${TABLE_CLASSNAME}__Wrapper`)).toBeTruthy()
  })

  test('Applies custom className to wrapper if specified', () => {
    const className = 'channel-4'
    const wrapper = render(<Table className={className} />)

    expect(wrapper.hasClass(className)).toBeTruthy()
  })

  test('Table has default className', () => {
    const wrapper = render(<Table />)

    expect(wrapper.find('table').hasClass(TABLE_CLASSNAME)).toBeTruthy()
  })

  test('Applies custom className to table if specified', () => {
    const className = 'channel-4'
    const wrapper = render(<Table tableClassName={className} />)

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

    expect(
      cellsInRow
        .first()
        .find('.name')
        .exists()
    ).toBeTruthy()
    expect(
      cellsInRow
        .first()
        .find('.companyName')
        .exists()
    ).toBeTruthy()
  })
})

describe('Theme', () => {
  test('Renders default without specifying theme', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const wrapper = mount(<Table columns={defaultColumns} data={customers} />)

    expect(chooseTheme(wrapper.prop('theme'))).toEqual(defaultTheme)
  })

  test('Renders default theme', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const wrapper = mount(
      <Table columns={defaultColumns} data={customers} theme="default" />
    )

    expect(chooseTheme(wrapper.prop('theme'))).toEqual(defaultTheme)
  })

  test('Renders alternative theme', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const wrapper = mount(
      <Table columns={defaultColumns} data={customers} theme="alternative" />
    )

    expect(chooseTheme(wrapper.prop('theme'))).toEqual(alternativeTheme)
  })

  test('Renders custom theme', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const purpleTheme = {
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
      <Table columns={defaultColumns} data={customers} theme={purpleTheme} />
    )

    expect(chooseTheme(wrapper.prop('theme'))).toEqual({
      ...defaultTheme,
      ...purpleTheme,
    })
  })
})

describe('Is loading state', () => {
  test('Applies is-loading className', () => {
    const wrapper = render(<Table isLoading />)

    expect(wrapper.hasClass('is-loading')).toBeTruthy()
    expect(wrapper.find('table').hasClass('is-loading')).toBeTruthy()
  })
})

describe('Clickable Rows', () => {
  test('Fires onRowClick when row is clicked', () => {
    const customers = createFakeCustomers({ amount: 5 })
    const spy = jest.fn()
    const wrapper = mount(
      <Table columns={defaultColumns} data={customers} onRowClick={spy} />
    )
    const tbody = wrapper.find('tbody')
    const firstRow = tbody.childAt(0)
    const o = firstRow.instance()
    const event = undefined

    o.handleRowClick()

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(event, customers[0])
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
    const wrapper = mount(
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
    const nameHeaderCell = wrapper.find(`thead th`).first()
    expect(nameHeaderCell.instance().getAttribute('aria-sort')).toBe('none')

    nameHeaderCell
      .find('div')
      .first()
      .simulate('click')

    wrapper.setProps({
      sortedInfo: {
        columnKey: 'name',
        order: 'ascending',
      },
    })

    expect(nameHeaderCell.instance().getAttribute('aria-sort')).toBe(
      'ascending'
    )
    expect(regularColumnSpy).toHaveBeenCalled()
    expect(regularColumnSpy).toHaveBeenCalledWith(columns[0].columnKey)
    expect(
      nameHeaderCell.find(`.${TABLE_CLASSNAME}__SortableHeaderCell`).exists()
    ).toBeTruthy()

    expect(
      nameHeaderCell
        .find(`.${TABLE_CLASSNAME}__SortableHeaderCell__title`)
        .exists()
    ).toBeTruthy()

    // Compound column sorting, should be called with 'sortKey'
    const customerHeaderCell = wrapper.find(`thead th`).at(1)

    customerHeaderCell
      .find('div')
      .first()
      .simulate('click')

    expect(compoundColumnSpy).toHaveBeenCalled()
    expect(compoundColumnSpy).toHaveBeenCalledWith(columns[1].sortKey)

    wrapper.setProps({
      sortedInfo: {
        columnKey: 'name',
        order: 'descending',
      },
    })

    expect(nameHeaderCell.instance().getAttribute('aria-sort')).toBe(
      'descending'
    )
  })
})

describe('Expandable', () => {
  test('Table is collapsed on initial state to the value of maxRowsToDisplay', () => {
    const wrapper = mount(
      <Table
        columns={defaultColumns}
        data={createFakeCustomers({ amount: 10 })}
        maxRowsToDisplay={4}
      />
    )
    const tbody = wrapper.find('tbody')
    const rows = tbody.find('tr')

    expect(wrapper.state('isTableCollapsed')).toBeTruthy()
    expect(rows.length).toBe(4)
  })

  test('Table expands on click of Expander', () => {
    const wrapper = mount(
      <Table
        columns={defaultColumns}
        data={createFakeCustomers({ amount: 10 })}
        maxRowsToDisplay={4}
      />
    )
    const expander = wrapper.find(`.${TABLE_CLASSNAME}__Expander`).first()

    expander.simulate('click')

    const tbody = wrapper.find('tbody')
    const rows = tbody.find('tr')

    expect(wrapper.state('isTableCollapsed')).toBeFalsy()
    expect(rows.length).toBe(10)
  })

  test('Table fires onExpand on click of Expander', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Table
        columns={defaultColumns}
        data={createFakeCustomers({ amount: 10 })}
        maxRowsToDisplay={4}
        onExpand={spy}
      />
    )
    const expander = wrapper.find(`.${TABLE_CLASSNAME}__Expander`).first()

    expander.simulate('click')

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(wrapper.state('isTableCollapsed'))
  })
})
