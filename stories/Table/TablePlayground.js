import React, { Component } from 'react'

import { Table } from '../../src/index.js'
import Heading from '../../src/components/Heading'
import ColumnCustomizer from './ColumnsCustomizer'
import TableCustomizer from './TableCustomizer'
import Truncate from '../../src/components/Truncate'
import { Wrapper, Header } from './commonComponents'
import {
  createFakeCustomers,
  sortData,
} from '../../src/components/Table/__tests__/utils'
import { getColor } from '../../src/styles/utilities/color'
import {
  defaultTheme,
  alternativeTheme,
} from '../../src/components/Table/styles/themes'

const customTheme = {
  fontColorHeader: '#ffffff',
  fontColorBody: getColor('purple.500'),
  fontColorAlternate: getColor('purple.800'),
  bgHeader: getColor('blue.400'),
  bgColor: getColor('blue.100'),
  bgAlternate: getColor('blue.200'),
  borderTableBody: '1px solid #452840',
  borderTableHeader: '1px solid #E25C97',
  borderRows: '1px solid #452840',
  borderColumns: '1px solid #452840',
}

export default class TablePlayground extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: createFakeCustomers({ amount: 10 }),
      columns: [
        {
          title: 'Name',
          columnKey: 'name',
          align: 'left',
          width: '30%',
          renderHeaderCell: (column, sortedInfo) => {
            return (
              <strong>
                {column.title}
                {'    '}
                <span>
                  {sortedInfo.order != null &&
                    sortedInfo.columnKey === column.columnKey &&
                    sortedInfo.order === 'descending' &&
                    '🔽'}
                  {sortedInfo.order != null &&
                    sortedInfo.columnKey === column.columnKey &&
                    sortedInfo.order === 'ascending' &&
                    '🔼'}
                </span>
              </strong>
            )
          },
          renderCell: ({ name }) => {
            return <em>{name}</em>
          },
          sorter: this.sortAlphabetically,
        },
        {
          title: 'Company',
          columnKey: 'companyName',
          align: 'center',
          width: '35%',
          sorter: this.sortAlphabetically,
          renderHeaderCell: (column, sortedInfo) => {
            return (
              <strong>
                {column.title}
                {'      '}
                <span>
                  {sortedInfo.order != null &&
                    sortedInfo.columnKey === column.columnKey &&
                    sortedInfo.order === 'descending' &&
                    '🔽'}
                  {sortedInfo.order != null &&
                    sortedInfo.columnKey === column.columnKey &&
                    sortedInfo.order === 'ascending' &&
                    '🔼'}
                </span>
              </strong>
            )
          },
        },
        {
          title: 'Email',
          columnKey: 'emails',
          align: 'right',
          width: '25%',
          renderCell: ({ emails }) => (
            <Truncate type="end" limit={12}>
              {emails}
            </Truncate>
          ),
        },
        {
          title: 'Last Seen',
          columnKey: 'lastSeen',
          align: 'right',
          width: '10%',
        },
      ],
      sortedInfo: {
        columnKey: null,
        order: null,
      },
      isLoading: false,
      theme: customTheme,
      tableWidth: { min: '700px' },
      containerWidth: '100%',
      activePage: 1,
    }
  }

  render() {
    const {
      data,
      columns,
      sortedInfo,
      isLoading,
      tableWidth,
      containerWidth,
      theme,
    } = this.state

    return (
      <Wrapper>
        <ColumnCustomizer
          columns={columns}
          sortedInfo={sortedInfo}
          onChangeColumn={this.handleColumnChange}
        />
        <TableCustomizer
          containerWidth={containerWidth}
          tableWidth={tableWidth}
          numberOfRows={data.length}
          theme={theme}
          resetTable={this.handleResetTable}
          onChangeTableOption={this.handleTableOptionChange}
        />
        <Header>
          <Heading size="h2">
            Table{' '}
            <span role="img" aria-label="emoji">
              👇
            </span>
          </Heading>
        </Header>
        <Table
          columns={columns}
          data={data}
          sortedInfo={sortedInfo}
          isLoading={isLoading}
          theme={theme}
          tableWidth={tableWidth}
          containerWidth={containerWidth}
        />
      </Wrapper>
    )
  }

  handleColumnChange = (columnKey, field, value) => {
    const { columns } = this.state
    const columnToChangeIndex = columns.findIndex(
      col => col.columnKey === columnKey
    )
    const columnToChange = { ...columns[columnToChangeIndex] }
    columnToChange[field] = value
    const newColumns = [...columns]
    newColumns[columnToChangeIndex] = columnToChange

    this.setState({
      columns: newColumns,
    })
  }

  handleResetTable = theme => {
    let themeToUse

    if (theme === 'default') {
      themeToUse = defaultTheme
    } else if (theme === 'alternative') {
      themeToUse = alternativeTheme
    } else if (theme === 'custom') {
      themeToUse = customTheme
    }

    this.setState({ theme: themeToUse })
  }

  handleTableOptionChange = (option, value) => {
    if (option === 'numberOfRows') {
      this.setState({
        data: createFakeCustomers({ amount: value }),
      })
    } else if (option === 'containerWidth') {
      this.setState({
        containerWidth: value,
      })
    } else {
      const [optionCategory, optionField] = option.split('.')
      const completeOption = { ...this.state[optionCategory] }

      this.setState({
        [optionCategory]: {
          ...completeOption,
          [optionField]: value,
        },
      })
    }
  }

  sortAlphabetically = columnKey => {
    const { data, sortedInfo } = this.state

    this.setState({
      isLoading: true,
    })

    // simulate sortData as an API call
    sortData(data, columnKey, sortedInfo.order).then(sortedData => {
      this.setState({
        data: sortedData,
        sortedInfo: {
          columnKey,
          order: sortedInfo.order === 'descending' ? 'ascending' : 'descending',
        },
        isLoading: false,
      })
    })
  }
}
