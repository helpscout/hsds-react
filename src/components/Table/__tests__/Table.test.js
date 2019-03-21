import React from 'react'
import { mount, render } from 'enzyme'
import { Table, TABLE_CLASSNAME } from '../Table'

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

  test('Custom cells', () => {
    const wrapper = mount(
      <Table
        columns={defaultColumnsCustomContent}
        data={createFakeCustomers({ amount: 5 })}
      />
    )
    const tbody = wrapper.find('tbody')
    const rows = tbody.find('tr')
    const cellsInRow = rows.first().find('td')

    expect(
      cellsInRow
        .first()
        .find('strong')
        .exists()
    ).toBeTruthy()
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

    o.handleRowClick()

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(customers[0])
  })
})

describe('Sortable', () => {
  test('Fires sorter function when header cell is clicked', () => {
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
    const wrapper = mount(<Table columns={columns} data={customers} />)

    // Regular column sorting, should be called with 'columnKey'
    const nameHeaderCell = wrapper.find(`thead th`).first()

    nameHeaderCell.simulate('click')

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

    customerHeaderCell.simulate('click')

    expect(compoundColumnSpy).toHaveBeenCalled()
    expect(compoundColumnSpy).toHaveBeenCalledWith(columns[1].sortKey)
  })
})
