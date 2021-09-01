import React from 'react'
import { mount, render as enzymeRender } from 'enzyme'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Table, TABLE_CLASSNAME } from './Table'
import reducer from './Table.reducer'
import {
  UPDATE_TABLE_DATA,
  EXPAND_TABLE,
  COLLAPSE_TABLE,
  SELECT_ALL_ROWS,
  DESELECT_ALL_ROWS,
  SELECT_ROW,
  DESELECT_ROW,
} from './Table.actionTypes'
import { defaultSkin, alternativeSkin, chooseSkin } from './Table.skins'
import {
  columnsChooser,
  createFakeCustomers,
  defaultColumns,
  defaultColumnsCustomContent,
} from './Table.testUtils'
import { page1 } from './stories/ConvoList/convoData'
import { createColumnChooserListItems } from './Table.utils'

describe('ClassName', () => {
  test('Wrapper has default className', () => {
    const wrapper = enzymeRender(<Table tableDescription="test-table" />)

    expect(wrapper.hasClass(`${TABLE_CLASSNAME}__Wrapper`)).toBeTruthy()
  })

  test('Applies custom className to wrapper if specified', () => {
    const className = 'channel-4'
    const wrapper = enzymeRender(
      <Table tableDescription="test-table" className={className} />
    )

    expect(wrapper.hasClass(className)).toBeTruthy()
  })

  test('Table has default className', () => {
    const wrapper = enzymeRender(<Table tableDescription="test-table" />)

    expect(wrapper.find('table').hasClass(TABLE_CLASSNAME)).toBeTruthy()
  })

  test('Applies custom className to table if specified', () => {
    const className = 'channel-4'
    const wrapper = enzymeRender(
      <Table tableDescription="test-table" tableClassName={className} />
    )

    expect(wrapper.find('table').hasClass(className)).toBeTruthy()
  })
})

describe('Render', () => {
  test('should render header content if provided', () => {
    const { queryByText } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={createFakeCustomers({ amount: 10 })}
        headerContent={<h1>My Heading</h1>}
      />
    )

    expect(queryByText('My Heading')).toBeInTheDocument()
  })

  test('updates table data', () => {
    const data = page1.results.slice(0, 10)
    const data2 = page1.results.slice(10, 15)
    const { container, rerender } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={data}
      />
    )

    expect(container.querySelectorAll('tbody > tr').length).toBe(10)

    rerender(<Table tableDescription="test-table" data={data2} />)

    expect(container.querySelectorAll('tbody > tr').length).toBe(5)
  })
})

describe('Table Header', () => {
  test('Renders rows and cells', () => {
    const wrapper = mount(
      <Table
        tableDescription="test-table"
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
        tableDescription="test-table"
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
    const wrapper = mount(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
      />
    )
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

    const wrapper = mount(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
      />
    )
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
      <Table
        tableDescription="test-table"
        columns={columns}
        data={createFakeCustomers({ amount: 5 })}
      />
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
    const wrapper = mount(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
      />
    )

    expect(chooseSkin(wrapper.prop('skin'))).toEqual(defaultSkin)
  })

  test('Renders default skin', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const wrapper = mount(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
        skin="default"
      />
    )

    expect(chooseSkin(wrapper.prop('skin'))).toEqual(defaultSkin)
  })

  test('Renders alternative skin', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const wrapper = mount(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
        skin="alternative"
      />
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
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
        skin={purpleSkin}
      />
    )

    expect(chooseSkin(wrapper.prop('skin'))).toEqual({
      ...defaultSkin,
      ...purpleSkin,
    })
  })
})

describe('Is loading state', () => {
  test('Displays LoadingUI', () => {
    const wrapper = enzymeRender(
      <Table tableDescription="test-table" isLoading />
    )

    expect(wrapper.find(`.${TABLE_CLASSNAME}__Loading`).length).toBeTruthy()
  })
})

describe('Clickable Rows', () => {
  test('Fires onRowClick when row is clicked', () => {
    const customers = createFakeCustomers({ amount: 5 })
    const spy = jest.fn()
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
        onRowClick={spy}
      />
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
        tableDescription="test-table"
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
        tableDescription="test-table"
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
        tableDescription="test-table"
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
        tableDescription="test-table"
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
        tableDescription="test-table"
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
        tableDescription="test-table"
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
        tableDescription="test-table"
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

describe('Selectable rows', () => {
  test('should render a column with checkboxes for selection', () => {
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={page1.results.slice(10)}
        withSelectableRows
      />
    )

    // Header row
    expect(
      container.querySelector('thead .Column_Selector')
    ).toBeInTheDocument()
    expect(
      container.querySelector('thead .Column_Selector .c-Checkbox')
    ).toBeInTheDocument()

    // Body rows
    const rows = container.querySelectorAll('tbody tr')

    rows.forEach(row => {
      expect(
        row.querySelector('td').classList.contains('Column_Selector')
      ).toBe(true)
      expect(row.querySelector('.c-Checkbox')).toBeInTheDocument()
    })
  })

  test('should select/unselect a row', () => {
    const onSelectRowSpy = jest.fn()
    const data = page1.results.slice(10)
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={data}
        withSelectableRows
        onSelectRow={onSelectRowSpy}
      />
    )

    const rows = container.querySelectorAll('tbody tr')

    user.click(rows[0].querySelector('input[type="checkbox"]'))

    expect(onSelectRowSpy).toHaveBeenCalledWith([data[0].id])

    user.click(rows[1].querySelector('input[type="checkbox"]'))

    expect(onSelectRowSpy).toHaveBeenCalledWith([data[0].id, data[1].id])
    expect(rows[0].classList.contains('is-row-selected')).toBe(true)
    expect(rows[1].classList.contains('is-row-selected')).toBe(true)

    user.click(rows[0].querySelector('input[type="checkbox"]'))
    expect(onSelectRowSpy).toHaveBeenCalledWith([data[1].id])

    expect(rows[0].classList.contains('is-row-selected')).toBe(false)
    expect(rows[1].classList.contains('is-row-selected')).toBe(true)
  })

  test('should select/unselect all with header row', () => {
    const onSelectRowSpy = jest.fn()
    const data = page1.results.slice(10)
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={data}
        withSelectableRows
        onSelectRow={onSelectRowSpy}
      />
    )

    const rows = container.querySelectorAll('tbody tr')

    user.click(container.querySelector('thead input[type="checkbox"]'))

    expect(onSelectRowSpy).toHaveBeenCalledWith(data.map(d => d.id))

    rows.forEach(row => {
      expect(row.classList.contains('is-row-selected')).toBe(true)
    })

    user.click(container.querySelector('thead input[type="checkbox"]'))

    expect(onSelectRowSpy).toHaveBeenCalledWith([])

    rows.forEach(row => {
      expect(row.classList.contains('is-row-selected')).toBe(false)
    })
  })
})

describe('Reducer', () => {
  test('updated data', () => {
    const data = page1.results.slice(0, 10)
    const data2 = page1.results.slice(10, 15)
    const initialState = {
      selectedRows: [],
      currentTableData: data,
    }
    const action = {
      type: UPDATE_TABLE_DATA,
      payload: {
        data: data2,
        rowsToDisplay: undefined,
      },
    }
    const resultingState = {
      selectedRows: [],
      currentTableData: data2,
    }

    expect(reducer(initialState, action)).toStrictEqual(resultingState)
  })

  test('expand/collapse', () => {
    const data = page1.results.slice(0, 10)
    const initialState = {
      selectedRows: [],
      currentTableData: data,
    }
    const expandAction = {
      type: EXPAND_TABLE,
      payload: {
        data: data,
        rowsToDisplay: 10,
      },
    }
    const resultingStateOfExpand = {
      selectedRows: [],
      currentTableData: data,
    }

    expect(reducer(initialState, expandAction)).toStrictEqual(
      resultingStateOfExpand
    )

    const data2 = page1.results.slice(0, 4)
    const collapseAction = {
      type: COLLAPSE_TABLE,
      payload: {
        data: data,
        rowsToDisplay: 4,
      },
    }
    const resultingStateOfCollapse = {
      selectedRows: [],
      currentTableData: data2,
    }

    expect(reducer(initialState, collapseAction)).toStrictEqual(
      resultingStateOfCollapse
    )
  })

  test('select/deselect all', () => {
    const data = page1.results.slice(0, 10)
    const initialState = {
      selectedRows: [],
      currentTableData: data,
    }
    const selectAllAction = {
      type: SELECT_ALL_ROWS,
      payload: {
        data: data,
        rowsToDisplay: undefined,
        selectionKey: 'id',
      },
    }
    const resultingStateOfSelectAll = {
      selectedRows: data.map(d => d.id),
      currentTableData: data,
    }

    expect(reducer(initialState, selectAllAction)).toStrictEqual(
      resultingStateOfSelectAll
    )

    const deselectAllAction = {
      type: DESELECT_ALL_ROWS,
      payload: {
        data: data,
        rowsToDisplay: undefined,
      },
    }
    const resultingStateOfDeselectAll = {
      selectedRows: [],
      currentTableData: data,
    }

    expect(reducer(initialState, deselectAllAction)).toStrictEqual(
      resultingStateOfDeselectAll
    )
  })

  test('select/deselect row', () => {
    const data = page1.results.slice(0, 10)
    const initialState = {
      selectedRows: [],
      currentTableData: data,
    }
    const selectAction = {
      type: SELECT_ROW,
      payload: {
        data: data,
        value: data[3].id,
        rowsToDisplay: undefined,
      },
    }
    const resultingStateOfSelect = {
      selectedRows: [data[3].id],
      currentTableData: data,
    }

    expect(reducer(initialState, selectAction)).toStrictEqual(
      resultingStateOfSelect
    )

    const initialState2 = {
      selectedRows: [data[2].id],
      currentTableData: data,
    }

    const selectAction2 = {
      type: SELECT_ROW,
      payload: {
        data: data,
        value: data[3].id,
        rowsToDisplay: undefined,
      },
    }

    const resultingStateOfSelect2 = {
      selectedRows: [data[2].id, data[3].id],
      currentTableData: data,
    }

    expect(reducer(initialState2, selectAction2)).toStrictEqual(
      resultingStateOfSelect2
    )

    const deselectAction = {
      type: DESELECT_ROW,
      payload: {
        data: data,
        value: data[3].id,
        rowsToDisplay: undefined,
      },
    }
    const resultingStateOfDeselect = {
      selectedRows: [data[2].id],
      currentTableData: data,
    }

    expect(reducer(initialState2, deselectAction)).toStrictEqual(
      resultingStateOfDeselect
    )

    const deselectAction2 = {
      type: DESELECT_ROW,
      payload: {
        data: data,
        value: data[2].id,
        rowsToDisplay: undefined,
      },
    }
    const resultingStateOfDeselect2 = {
      selectedRows: [],
      currentTableData: data,
    }

    expect(reducer(initialState2, deselectAction2)).toStrictEqual(
      resultingStateOfDeselect2
    )
  })
})

describe('Column Chooser', () => {
  const COLUMNS_PARSED = [
    {
      items: [
        {
          columnKey: 'name',
          disabledForChoosing: true,
          group: 'Customer',
          isDisabled: true,
          label: 'Name',
          show: true,
          title: 'Name',
          width: '25%',
        },
        {
          columnKey: 'companyName',
          group: 'Customer',
          label: 'Company',
          show: true,
          title: 'Company',
          width: '25%',
        },
      ],
      label: 'Customer',
      type: 'group',
    },
    { type: 'divider' },
    {
      items: [
        {
          columnKey: 'emails',
          group: 'Properties',
          label: 'Email',
          show: true,
          title: 'Email',
          width: '25%',
        },
      ],
      label: 'Properties',
      type: 'group',
    },
    { type: 'divider' },
    {
      items: [
        {
          columnKey: 'lastSeen',
          label: 'Last Seen',
          show: false,
          title: 'Last Seen',
          width: '25%',
        },
      ],
      label: 'Other',
      type: 'group',
    },
  ]

  const plain_columns = COLUMNS_PARSED.reduce((acc, current) => {
    if (current.items) {
      return acc.concat(current.items)
    }
    return acc
  }, [])

  test('it works', () => {
    const spy = jest.fn()
    const { getByRole, container } = render(
      <Table
        columns={columnsChooser}
        data={createFakeCustomers({ amount: 10 })}
        tableDescription="Example table"
        onColumnChoose={spy}
        withColumnChooser
      />
    )

    const parsedColumns = createColumnChooserListItems(columnsChooser)

    expect(parsedColumns).toStrictEqual(COLUMNS_PARSED)

    const button = getByRole('button')

    expect(
      button.querySelectorAll('span.c-VisuallyHidden')[1]
    ).toHaveTextContent('Choose columns to show or hide')

    // Starts with 3 columns
    expect(container.querySelectorAll('th').length).toBe(3)
    expect(
      container.querySelector('.c-Table__Row').querySelectorAll('td').length
    ).toBe(3)

    // open the column chooser
    user.click(button)

    // Should group columns
    expect(container.querySelectorAll('.DropListItem--groupLabel').length).toBe(
      3
    )
    expect(container.querySelectorAll('.DropListItem').length).toBe(5)

    // Should add the reset item
    expect(container.querySelectorAll('.is-reset-item').length).toBe(1)
    expect(container.querySelector('.is-reset-item')).toHaveTextContent(
      'Reset to defaults'
    )

    container.querySelectorAll('.DropListItem').forEach((item, index) => {
      if (
        !item.classList.contains('is-reset-item') &&
        plain_columns[index].show
      ) {
        // If show is set to true in the columns, the item in the list should be selected
        expect(item).toHaveClass('is-selected')

        if (plain_columns[index].disabledForChoosing) {
          // If disabledForChoosing is set to true in the columns, the item in the list should be disabled
          expect(item).toHaveClass('is-disabled')
        }
      }
    })

    // click the disabled option, things stand the same
    user.click(container.querySelectorAll('.DropListItem')[0])

    expect(
      container.querySelector('.c-Table__Row').querySelectorAll('td').length
    ).toBe(3)

    // click the 2nd item which is currently enabled, removes it
    user.click(container.querySelectorAll('.DropListItem')[1])

    expect(
      container.querySelector('.c-Table__Row').querySelectorAll('td').length
    ).toBe(2)

    // click the 3rd item which is currently enabled, removes it
    user.click(container.querySelectorAll('.DropListItem')[2])

    expect(
      container.querySelector('.c-Table__Row').querySelectorAll('td').length
    ).toBe(1)

    // click the 4th item which is currently disabled, adds it
    user.click(container.querySelectorAll('.DropListItem')[3])

    expect(
      container.querySelector('.c-Table__Row').querySelectorAll('td').length
    ).toBe(2)

    // click the reset item, brings it back to the initial state
    user.click(container.querySelector('.is-reset-item'))

    expect(
      container.querySelector('.c-Table__Row').querySelectorAll('td').length
    ).toBe(3)
  })
})
