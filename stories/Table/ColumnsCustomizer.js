import React, { Component } from 'react'

import Button from '../../src/components/Button'
import Heading from '../../src/components/Heading'
import Icon from '../../src/components/Icon'
import Input from '../../src/components/Input'
import PreviewCard from '../../src/components/PreviewCard'
import Select from '../../src/components/Select'
import Text from '../../src/components/Text'

import {
  Wrapper,
  Header,
  FlexContainerForHeadings,
  FlexContainerForForms,
  IconUI,
  FormLabelUI,
  FlexQuarter,
} from './commonComponents'

export default class ColumnCustomizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentColumn: null,
    }
  }

  render() {
    const { columns, sortedInfo } = this.props
    const { currentColumn } = this.state

    return (
      <Wrapper>
        <Header>
          <FlexContainerForHeadings>
            <IconUI name="pencil-small" size="24" shade="faint" />
            <Heading size="h4">Column Options</Heading>
          </FlexContainerForHeadings>
        </Header>

        <FlexContainerForForms className="ColumnsCustomizer">
          {columns.map((column, index) => (
            <FlexQuarter className="column" key={column.columnKey}>
              <Button
                version={2}
                kind="default"
                size="sm"
                style={{ marginLeft: 'auto', display: 'block' }}
                onClick={() => {
                  this.handleColumnInfoClick(column)
                }}
              >
                <Icon name="info" size="20" />
              </Button>
              <Text
                style={{
                  marginBottom: '10px',
                  textAlign: 'right',
                  display: 'block',
                }}
                shade="muted"
              >
                {`${index + 1}. ${column.columnKey}`}
              </Text>
              <FormLabelUI label="Title" isInline>
                <Input
                  size="sm"
                  value={column.title}
                  placeholder="Column Title"
                  onChange={value => {
                    this.handleValueChange(column.columnKey, 'title', value)
                  }}
                />
              </FormLabelUI>
              <FormLabelUI label="Align" isInline>
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

              <FormLabelUI label="Width" isInline>
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
              {column.sorter && (
                <Text
                  style={{ display: 'block', textAlign: 'right' }}
                  shade="muted"
                >
                  Sortable
                </Text>
              )}
              {sortedInfo.columnKey === column.columnKey && (
                <Text
                  style={{ display: 'block', textAlign: 'right' }}
                  shade="muted"
                >
                  Sorted: <strong>{sortedInfo.order}</strong>
                </Text>
              )}
            </FlexQuarter>
          ))}
        </FlexContainerForForms>

        {currentColumn && this.renderColumnJSONConfig(currentColumn)}
      </Wrapper>
    )
  }
  handleColumnInfoClick = column => {
    const { currentColumn } = this.state

    this.setState({
      currentColumn:
        currentColumn == null || currentColumn.columnKey !== column.columnKey
          ? column
          : null,
    })
  }

  renderColumnJSONConfig = column => {
    return (
      <PreviewCard title={`JSON config for column: ${column.title}`}>
        <pre>
          <code>
            {JSON.stringify(
              column,
              function(key, val) {
                if (typeof val === 'function') {
                  let str = `${val}`
                  let braceIndex = str.indexOf('{')
                  return `${str.slice(0, braceIndex + 1)} ... }`
                }
                return val
              },
              2
            )}
          </code>
        </pre>
      </PreviewCard>
    )
  }

  handleValueChange = (columnKey, field, value) => {
    const { onChangeColumn } = this.props

    onChangeColumn(columnKey, field, value)
  }
}
