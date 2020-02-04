import React, { Component } from 'react'
import Heading from '../../Heading'
import ColumnCustomizer from './ColumnsCustomizer'
import TableCustomizer from './TableCustomizer'
import Truncate from '../../Truncate'
import { Wrapper, Header } from './commonComponents'
import {
  createFakeCustomers,
  defaultColumns,
  columsnWithCustomNameCell,
  columsnWithCustomHeaderNameCell,
  sortData,
} from '../Table.testUtils'
import { getColor } from '../../../styles/utilities/color'
import { defaultSkin, alternativeSkin } from '../Table.skins'
import { Table } from '../../index'

const customSkin = {
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
      skin: customSkin,
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
      skin,
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
          skin={skin}
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
          skin={skin}
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

  handleResetTable = skin => {
    let skinToUse

    if (skin === 'default') {
      skinToUse = defaultSkin
    } else if (skin === 'alternative') {
      skinToUse = alternativeSkin
    } else if (skin === 'custom') {
      skinToUse = customSkin
    }

    this.setState({ skin: skinToUse })
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

// additional stories

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

stories.add('with custom skin', () => (
  <div>
    <PreviewCard style={{ marginBottom: '20px' }}>
      <Heading size="h4">Custom skin</Heading>
      <pre>
        <code>skin = </code>
        <code>{JSON.stringify(purpleSkin, null, 2)}</code>
      </pre>
    </PreviewCard>
    <Table
      columns={defaultColumns}
      data={createFakeCustomers({ amount: 10 })}
      skin={purpleSkin}
    />
  </div>
))

stories.add('with custom header cell render', () => (
  <Table
    columns={columsnWithCustomHeaderNameCell}
    data={createFakeCustomers({ amount: 5 })}
  />
))

stories.add('with custom cell rendering', () => (
  <Table
    columns={columsnWithCustomNameCell}
    data={createFakeCustomers({ amount: 10, longNames: true })}
    tableWidth={{ max: '800px', min: '500px' }}
  />
))

stories.add('with className provided to row for styling', () => {
  const customers = createFakeCustomers({ amount: 10 }).map(info => {
    const className = info.days < 50 ? 'active' : 'stale'
    return { ...info, ...{ className } }
  })

  return (
    <ContainerUI>
      <Table columns={defaultColumns} data={customers} />
    </ContainerUI>
  )
})
