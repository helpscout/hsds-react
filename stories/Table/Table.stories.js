import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import faker from 'faker'
import styled from '../../src/components/styled'
import Table from '../../src/components/Table/Table'
import Illo from '../../src/components/Illo'
import FormLabel from '../../src/components/FormLabel'
import Text from '../../src/components/Text'
import Heading from '../../src/components/Heading'
import Input from '../../src/components/Input'
import Select from '../../src/components/Select'

const stories = storiesOf('Table', module)

const OptionsWrapper = styled('div')`
  margin-bottom: 20px;
`
const FlexContainerForForms = styled('div')`
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
`
const FlexContainerForHeadings = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const FlexQuarter = styled('div')`
  width: 22%;
`

const FlexHalf = styled('div')`
  width: 48%;
`

const Header = styled('header')`
  margin-bottom: 0.5em;
`

const FormLabelUI = styled(FormLabel)`
  margin-bottom: 10px;
`

const InlineIllo = styled(Illo)`
  margin: 0 5px 0 0;
`

const InputWithBorder = styled(Input)`
  & .c-InputBackdropV2 {
    ${({ borderStyle }) => `border: ${borderStyle};`};
  }
`

class ColumnCustomizer extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { columns } = this.props

    return (
      <OptionsWrapper>
        <Header>
          <FlexContainerForHeadings>
            <InlineIllo name="bulb" color="#116ce1" size="40" />
            <Heading size="h3">Column Options</Heading>
          </FlexContainerForHeadings>
        </Header>

        <FlexContainerForForms className="ColumnsCustomizer">
          {columns.map(column => (
            <FlexQuarter className="column" key={column.columnKey}>
              <section>
                <Text shade="muted">{column.columnKey}</Text>
                <FormLabelUI label="Title">
                  <Input
                    size="sm"
                    value={column.title}
                    placeholder="Column Title"
                    onChange={value => {
                      this.handleValueChange(column.columnKey, 'title', value)
                    }}
                  />
                </FormLabelUI>
                <FormLabelUI label="Align">
                  <Select
                    name="align"
                    size="sm"
                    onChange={value => {
                      this.handleValueChange(column.columnKey, 'align', value)
                    }}
                    options={['center', 'right', 'left']}
                    value={column.align ? column.align : 'left'}
                  />
                </FormLabelUI>

                <FormLabelUI label="Width">
                  <Input
                    name="width"
                    size="sm"
                    value={column.width.replace('%', '')}
                    placeholder="width"
                    inlineSuffix="%"
                    onChange={value => {
                      this.handleValueChange(
                        column.columnKey,
                        'width',
                        `${value}%`
                      )
                    }}
                  />
                </FormLabelUI>
              </section>
            </FlexQuarter>
          ))}
        </FlexContainerForForms>
      </OptionsWrapper>
    )
  }

  handleValueChange = (columnKey, field, value) => {
    const { onChangeColumn } = this.props

    onChangeColumn(columnKey, field, value)
  }
}

class TableCustomizer extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { styleOptions, numberOfRows } = this.props
    const { border, tableWidth, background } = styleOptions
    const [color1, color2] = background
    const { tableBody, tableHeader, rows, columns } = border
    const { min, max } = tableWidth

    return (
      <OptionsWrapper className="TableCustomizer">
        <Header>
          <FlexContainerForHeadings>
            <InlineIllo name="bulb" color="#116ce1" size="40" />
            <Heading size="h3">Table Options</Heading>
          </FlexContainerForHeadings>
        </Header>
        <section>
          <FormLabelUI label="Number of rows">
            <Input
              size="sm"
              type="number"
              value={numberOfRows}
              onChange={value => {
                this.handleValueChange('numberOfRows', value)
              }}
            />
          </FormLabelUI>
        </section>
        <Header>
          <Heading size="h4">Borders</Heading>
        </Header>
        <FlexContainerForForms>
          <FlexHalf>
            <FormLabelUI label="tableBody">
              <InputWithBorder
                size="sm"
                borderStyle={tableBody}
                value={tableBody}
                onChange={value => {
                  this.handleValueChange('border.tableBody', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
          <FlexHalf>
            <FormLabelUI label="tableHeader">
              <InputWithBorder
                size="sm"
                borderStyle={tableHeader}
                value={tableHeader}
                onChange={value => {
                  this.handleValueChange('border.tableHeader', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
        </FlexContainerForForms>
        <FlexContainerForForms>
          <FlexHalf>
            <FormLabelUI label="rows">
              <InputWithBorder
                size="sm"
                borderStyle={rows}
                value={rows}
                onChange={value => {
                  this.handleValueChange('border.rows', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
          <FlexHalf>
            <FormLabelUI label="columns">
              <InputWithBorder
                size="sm"
                borderStyle={columns}
                value={columns}
                onChange={value => {
                  this.handleValueChange('border.columns', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
        </FlexContainerForForms>
        <Header>
          <Heading size="h4">Table Width</Heading>
        </Header>
        <FlexContainerForForms>
          <FlexHalf>
            <FormLabelUI label="min">
              <Input
                size="sm"
                value={min}
                onChange={value => {
                  this.handleValueChange('tableWidth.min', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
          <FlexHalf>
            <FormLabelUI label="max">
              <Input
                size="sm"
                value={max}
                onChange={value => {
                  this.handleValueChange('tableWidth.max', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
        </FlexContainerForForms>
        <Header>
          <Heading size="h4">Background Colours</Heading>
        </Header>
        <FlexContainerForForms>
          <FlexHalf>
            <FormLabelUI label="Color 1">
              <Input
                size="sm"
                value={color1}
                type="color"
                onChange={value => {
                  this.handleValueChange('background.0', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
          <FlexHalf>
            <FormLabelUI label="Color 2">
              <Input
                size="sm"
                value={color2}
                type="color"
                onChange={value => {
                  this.handleValueChange('background.1', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
        </FlexContainerForForms>
      </OptionsWrapper>
    )
  }

  handleValueChange = (option, value) => {
    const { onChangeTableOption } = this.props

    onChangeTableOption(option, value)
  }
}

class TableApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: createFakeCustomers(20),
      columns: [
        {
          title: 'Name',
          columnKey: 'name',
          align: 'left',
          width: '30%',
          renderHeaderCell: (column, sortedInfo) => {
            return (
              <strong
                style={{
                  color:
                    sortedInfo.columnKey === column.columnKey
                      ? sortedInfo.order === 'descending'
                        ? '#48ACE9'
                        : '#9652BB'
                      : 'black',
                }}
              >
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
          renderCell: name => {
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
              <strong
                style={{
                  color:
                    sortedInfo.columnKey === column.columnKey
                      ? sortedInfo.order === 'descending'
                        ? '#48ACE9'
                        : '#9652BB'
                      : 'black',
                }}
              >
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
      loadingData: false,
      background: ['#48ACE9', '#49D6EA'],
      border: {
        tableBody: '2px solid #452840',
        tableHeader: '2px solid #E25C97',
        rows: '2px solid #9652BB',
        columns: '2px solid #452840',
      },
      tableWidth: { min: '700px' },
    }
  }

  render() {
    const {
      data,
      columns,
      sortedInfo,
      loadingData,
      background,
      border,
      tableWidth,
    } = this.state

    return (
      <>
        <ColumnCustomizer
          columns={columns}
          onChangeColumn={this.handleColumnChange}
        />
        <TableCustomizer
          numberOfRows={data.length}
          styleOptions={{
            background,
            border,
            tableWidth,
          }}
          onChangeTableOption={this.handleTableOptionChange}
        />
        <Table
          columns={columns}
          data={data}
          sortedInfo={sortedInfo}
          loadingData={loadingData}
          background={background}
          border={border}
          tableWidth={tableWidth}
        />
      </>
    )
  }

  handleColumnChange = (columnKey, field, value) => {
    const { columns } = this.state
    const columnToChangeIndex = columns.findIndex(
      col => col.columnKey === columnKey
    )
    console.log('columnToChangeIndex: ', columnToChangeIndex)
    const columnToChange = { ...columns[columnToChangeIndex] }
    columnToChange[field] = value
    const newColumns = [...columns]
    newColumns[columnToChangeIndex] = columnToChange

    this.setState({
      columns: newColumns,
    })
  }

  handleTableOptionChange = (option, value) => {
    if (option === 'numberOfRows') {
      this.setState({
        data: createFakeCustomers(value),
      })
    } else {
      const [optionCategory, optionField] = option.split('.')

      if (optionCategory === 'background') {
        const completeOption = [...this.state[optionCategory]]

        completeOption[Number.parseInt(optionField)] = value
        this.setState({
          [optionCategory]: completeOption,
        })
      } else {
        const completeOption = { ...this.state[optionCategory] }

        this.setState({
          [optionCategory]: {
            ...completeOption,
            [optionField]: value,
          },
        })
      }
    }
  }

  sortAlphabetically = columnKey => {
    const { data, sortedInfo } = this.state

    this.setState({
      loadingData: true,
    })

    // simulate sortData as an API call
    sortData(data, columnKey, sortedInfo.order).then(sortedData => {
      this.setState({
        data: sortedData,
        sortedInfo: {
          columnKey,
          order: sortedInfo.order === 'descending' ? 'ascending' : 'descending',
        },
        loadingData: false,
      })
    })
  }
}

stories.add('default', () => <TableApp />)

function sortData(data, columnKey, order) {
  // simulate an API call here
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const sorted = data.sort((a, b) => {
        if (a[columnKey] < b[columnKey]) {
          return order === 'descending' ? -1 : 1
        }
        if (a[columnKey] > b[columnKey]) {
          return order === 'descending' ? 1 : -1
        }
        return 0
      })
      resolve(sorted)
    }, 1000)
  })
}

function createFakeCustomers(amount) {
  const data = []
  faker.seed(123)

  for (let index = 1; index <= amount; index++) {
    // const emailsAmount = Math.floor(Math.random() * 3) + 1
    // const emails = []

    // for (let j = 0; j < emailsAmount; j++) {
    //   emails.push(faker.internet.email())
    // }

    const customer = {
      id: index,
      name: `${faker.name.findName()} ${faker.name.findName()}`,
      jobTitle: faker.name.jobTitle(),
      companyName: faker.company.companyName(),
      lastSeen: `${faker.random.number()} days ago`,
      emails: faker.internet.email(),
    }

    data.push(customer)
  }

  return data
}
