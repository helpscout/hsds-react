import React from 'react'
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
import { alternativeSkin } from './Table.skins'
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
    const { container } = render(<Table tableDescription="test-table" />)

    expect(
      container.querySelector(`.${TABLE_CLASSNAME}__Wrapper`)
    ).toBeInTheDocument()
  })

  test('Applies custom className to wrapper if specified', () => {
    const className = 'channel-4'
    const { container } = render(
      <Table tableDescription="test-table" className={className} />
    )

    expect(container.querySelector(`.${TABLE_CLASSNAME}__Wrapper`)).toHaveClass(
      className
    )
  })

  test('Table has default className', () => {
    const { getByRole } = render(<Table tableDescription="test-table" />)

    expect(getByRole('table')).toHaveClass(TABLE_CLASSNAME)
  })

  test('Applies custom className to table if specified', () => {
    const className = 'channel-4'
    const { getByRole } = render(
      <Table tableDescription="test-table" tableClassName={className} />
    )

    expect(getByRole('table')).toHaveClass(className)
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
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={createFakeCustomers({ amount: 5 })}
      />
    )
    const thead = container.querySelector('thead')
    const headerCells = thead.querySelectorAll('th')
    const nameHeaderCell = headerCells[0]

    expect(thead).toBeInTheDocument()
    expect(headerCells.length).toBe(4)
    expect(nameHeaderCell).toHaveTextContent('Name')
  })

  test('Icon Header cells', () => {
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumnsCustomContent}
        data={createFakeCustomers({ amount: 5 })}
      />
    )

    const headerCellWithIcon = container.querySelector(
      '.c-Table__HeaderCell.Column_Company'
    )

    expect(
      headerCellWithIcon.querySelector(
        '.c-Icon.is-iconName-chat.column-title-as-icon'
      )
    ).toBeInTheDocument()
  })

  test('Custom cells', () => {
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumnsCustomContent}
        data={createFakeCustomers({ amount: 5 })}
      />
    )
    const thead = container.querySelector('thead')
    const headerCells = thead.querySelectorAll('th')
    const nameHeaderCell = headerCells[0]

    expect(nameHeaderCell.querySelector('em')).toBeInTheDocument()
  })
})

describe('Table Body', () => {
  test('Renders rows and cells', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
      />
    )
    const tbody = container.querySelector('tbody')
    const rows = tbody.querySelectorAll('tr')
    const firstRow = rows[0]
    const cellsInRow = firstRow.querySelectorAll('td')

    expect(tbody).toBeInTheDocument()
    expect(rows.length).toBe(10)
    expect(cellsInRow.length).toBe(4)
    expect(firstRow).toHaveClass(`${TABLE_CLASSNAME}__Row`)

    const customer = customers[0]

    expect(cellsInRow[0]).toHaveTextContent(customer.name)
    expect(cellsInRow[1]).toHaveTextContent(customer.companyName)
    expect(cellsInRow[2]).toHaveTextContent(customer.emails)
    expect(cellsInRow[3]).toHaveTextContent(customer.lastSeen)
  })

  test('Renders rows with provided classNames', () => {
    const customers = createFakeCustomers({ amount: 10 }).map(info => {
      const className = info.days < 50 ? 'active' : 'stale'
      return { ...info, ...{ className } }
    })

    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
      />
    )
    const tbody = container.querySelector('tbody')
    const rows = tbody.querySelectorAll('tr')

    customers.forEach((customer, i) => {
      expect(rows[i]).toHaveClass(customer.className)
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

    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={columns}
        data={createFakeCustomers({ amount: 5 })}
      />
    )
    const tbody = container.querySelector('tbody')
    const rows = tbody.querySelectorAll('tr')
    const cellsInRow = rows[0].querySelectorAll('td')

    expect(cellsInRow[0].querySelector('.name')).toBeInTheDocument()
    expect(cellsInRow[0].querySelector('.companyName')).toBeInTheDocument()
  })

  test('should add without-padding class name if clearCellPadding is added to a column', () => {
    const customers = createFakeCustomers({ amount: 5 })
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={[
          {
            title: 'Name',
            columnKey: 'name',
            clearCellPadding: true,
          },
        ]}
        data={customers}
      />
    )
    const row = container.querySelector('tbody > tr')
    const cell = row.querySelector('td')

    expect(cell).toHaveClass('without-padding')
  })
})

describe('Skin', () => {
  test('Renders default skin', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const { getByRole } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
      />
    )

    expect(
      window.getComputedStyle(getByRole('table').querySelector('th'))
        .backgroundColor
    ).toBe('white')
  })

  test('Renders alternative skin', () => {
    const customers = createFakeCustomers({ amount: 10 })
    const { getByRole } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
        skin={alternativeSkin}
      />
    )

    expect(
      window.getComputedStyle(getByRole('table').querySelector('th'))
        .backgroundColor
    ).toBe('rgb(229, 233, 236)') //rgb value of getColor('grey.400')
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
    const { getByRole } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
        skin={purpleSkin}
      />
    )

    expect(
      window.getComputedStyle(getByRole('table').querySelector('td')).color
    ).toBe('rebeccapurple')
  })
})

describe('Is loading state', () => {
  test('Displays LoadingUI', () => {
    const { container } = render(
      <Table tableDescription="test-table" isLoading />
    )

    expect(
      container.querySelector(`.${TABLE_CLASSNAME}__Loading`)
    ).toBeInTheDocument()
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

  test('Fires onRowClick when pressing enter on a focused row', () => {
    const customers = createFakeCustomers({ amount: 5 })
    const spy = jest.fn()
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={defaultColumns}
        data={customers}
        onRowClick={spy}
        withFocusableRows
      />
    )
    const row = container.querySelector('tbody > tr')

    user.type(row, '{enter}')

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(expect.any(Object), customers[0])
  })

  test('Does not fire onRowClick when an anchor tag inside cell is clicked', () => {
    const customers = createFakeCustomers({ amount: 5 })
    const spy = jest.fn()
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={[
          {
            title: 'Name',
            columnKey: 'name',
            renderCell: ({ name }) => {
              return (
                <a className="fill-table-cell" href="#top" tabIndex="-1">
                  {name}
                </a>
              )
            },
          },
        ]}
        data={customers}
        onRowClick={spy}
      />
    )
    const row = container.querySelector('tbody > tr')
    const link = row.querySelector('a')

    user.click(link)

    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not fire onRowClick when pressing enter on an anchor tag inside cell', () => {
    const customers = createFakeCustomers({ amount: 5 })
    const spy = jest.fn()
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={[
          {
            title: 'Name',
            columnKey: 'name',
            renderCell: ({ name }) => {
              return (
                <a className="fill-table-cell" href="#top" tabIndex="-1">
                  {name}
                </a>
              )
            },
          },
        ]}
        data={customers}
        onRowClick={spy}
      />
    )
    const row = container.querySelector('tbody > tr')
    const link = row.querySelector('a')

    user.type(link, '{enter}')

    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not fire onRowClick when a button inside cell is clicked', () => {
    const customers = createFakeCustomers({ amount: 5 })
    const spy = jest.fn()
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={[
          {
            title: 'Name',
            columnKey: 'name',
            renderCell: ({ name }) => {
              return <button>{name}</button>
            },
          },
        ]}
        data={customers}
        onRowClick={spy}
      />
    )
    const row = container.querySelector('tbody > tr')
    const button = row.querySelector('button')

    user.click(button)

    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not fire onRowClick when pressing enter on a button inside cell', () => {
    const customers = createFakeCustomers({ amount: 5 })
    const spy = jest.fn()
    const { container } = render(
      <Table
        tableDescription="test-table"
        columns={[
          {
            title: 'Name',
            columnKey: 'name',
            renderCell: ({ name }) => {
              return <button>{name}</button>
            },
          },
        ]}
        data={customers}
        onRowClick={spy}
      />
    )
    const row = container.querySelector('tbody > tr')
    const button = row.querySelector('button')

    user.type(button, '{enter}')

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('Sorting', () => {
  test('it should sort when you tell it to sort', () => {
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
    expect(container.querySelector(`thead th`)).toHaveAttribute(
      'aria-sort',
      'none'
    )
    expect(container.querySelector('.is-sortable')).toBeInTheDocument()

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

    expect(container.querySelector('thead th')).toHaveAttribute(
      'aria-sort',
      'ascending'
    )

    user.click(container.querySelector('.c-Table__SortableHeaderCell__title'))

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

    user.click(
      customerHeaderCell.querySelector('.c-Table__SortableHeaderCell__title')
    )

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

    expect(container.querySelector('thead th')).toHaveAttribute(
      'aria-sort',
      'descending'
    )
  })

  test('it should sort when you tell it to sort (role not table)', () => {
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
        tableRole="presentation"
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
    expect(container.querySelector(`thead th`)).not.toHaveAttribute('aria-sort')
    expect(container.querySelector('thead button')).not.toHaveAttribute(
      'aria-label'
    )
    expect(container.querySelector('.is-sortable')).toBeInTheDocument()

    rerender(
      <Table
        tableRole="presentation"
        tableDescription="test-table"
        columns={columns}
        data={customers}
        sortedInfo={{
          columnKey: 'name',
          order: 'ascending',
        }}
      />
    )

    expect(container.querySelector('thead th')).not.toHaveAttribute('aria-sort')
    expect(container.querySelector('thead button')).toHaveAttribute(
      'aria-label',
      'Sorted by name ascending'
    )

    user.click(container.querySelector('.c-Table__SortableHeaderCell__title'))

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

    user.click(
      customerHeaderCell.querySelector('.c-Table__SortableHeaderCell__title')
    )

    expect(compoundColumnSpy).toHaveBeenCalled()
    expect(compoundColumnSpy).toHaveBeenCalledWith(columns[1].sortKey)

    rerender(
      <Table
        tableRole="presentation"
        tableDescription="test-table"
        columns={columns}
        data={customers}
        sortedInfo={{
          columnKey: 'name',
          order: 'descending',
        }}
      />
    )

    expect(container.querySelector('thead th')).not.toHaveAttribute('aria-sort')
    expect(container.querySelector('thead button')).toHaveAttribute(
      'aria-label',
      'Sorted by name descending'
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
    expect(getByRole('button')).toHaveTextContent('View All')

    user.click(getByRole('button'))

    expect(container.querySelectorAll('tbody tr').length).toBe(10)
    expect(getByRole('button')).toHaveTextContent('Collapse')

    user.click(getByRole('button'))

    expect(container.querySelectorAll('tbody tr').length).toBe(4)
    expect(getByRole('button')).toHaveTextContent('View All')
  })

  test('Table expands/collapses on click of Expander (custom text)', () => {
    const { container } = render(
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

    expect(
      container.querySelector(`.${TABLE_CLASSNAME}__Expander`)
    ).toHaveTextContent('Show me all')

    user.click(container.querySelector(`.${TABLE_CLASSNAME}__Expander`))

    expect(
      container.querySelector(`.${TABLE_CLASSNAME}__Expander`)
    ).toHaveTextContent('Show me the top 4')
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
    {
      type: 'divider',
    },
    {
      label: 'Reset to defaults',
      type: 'action',
      action: 'RESET',
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

    expect(button).toHaveAttribute(
      'aria-label',
      'Choose columns to show or hide'
    )

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
    expect(container.querySelectorAll('.is-type-action').length).toBe(1)
    expect(container.querySelector('.is-type-action')).toHaveTextContent(
      'Reset to defaults'
    )

    container.querySelectorAll('.DropListItem').forEach((item, index) => {
      if (
        !item.classList.contains('is-type-action') &&
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
    user.click(container.querySelector('.is-type-action'))

    expect(
      container.querySelector('.c-Table__Row').querySelectorAll('td').length
    ).toBe(3)
  })
})
