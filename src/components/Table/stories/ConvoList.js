import React, { useState } from 'react'
import equal from 'fast-deep-equal'
import styled from 'styled-components'
import { getColor } from '../../../styles/utilities/color'
import { page1, page2 } from './convoData'
import Icon from '../../Icon'
import Pagination from '../../Pagination'
import Table from '../'

const TAG_COLORS = [
  getColor('charcoal.200'),
  getColor('green.500'),
  getColor('blue.500'),
  getColor('yellow.500'),
  getColor('purple.500'),
  getColor('red.500'),
]

const TagUI = styled('div')`
  display: inline-block;
  width: auto;
  height: 18px;
  line-height: 14px;
  padding: 1px 3px;
  font-size: 12px;
  color: white;
  background-color: ${({ color }) => color};
  border-radius: 3px;
  margin-right: 5px;
`

function ConversationCell({ subject, preview, tags, row }) {
  return (
    <div>
      {tags
        ? tags.map(tag => (
            <TagUI color={TAG_COLORS[tag.color]} key={`${tag.name}_${row.id}`}>
              {tag.name}
            </TagUI>
          ))
        : null}
      <strong>{subject}</strong>
      <br />
      <span>{preview}</span>
    </div>
  )
}

function areEqual(prevProps, nextProps) {
  if (equal(prevProps, nextProps)) {
    return true
  }
  return false
}

const ConversationCellMemo = React.memo(ConversationCell, areEqual)

const skin = {
  fontColorHeader: getColor('charcoal.500'),
  fontColorBody: getColor('charcoal.500'),
  fontColorAlternate: getColor('charcoal.500'),
  bgColor: 'white',
  bgAlternate: 'white',
  bgHeader: 'white',
  bgColorHover: getColor('grey.300'),
  borderTableBody: `1px solid ${getColor('grey.500')}`,
  borderTableHeader: `1px solid ${getColor('grey.500')}`,
  borderRows: `1px solid ${getColor('grey.500')}`,
  borderColumns: 'none',
}

export default function ConvoList() {
  const [pager, setPager] = useState(page1.pager)
  const [results, setResults] = useState(page1.results.slice(5))
  const [isLoading, setIsLoading] = useState(false)
  const tableWidth = { min: '700px' }
  const containerWidth = '100%'
  const columns = [
    {
      title: 'Customer',
      columnKey: ['customer.fullName', 'customer.email'],
      width: '150px',
      renderCell: ({ customer_fullName, customer_email }) => {
        return customer_fullName || customer_email
      },
    },
    {
      title: '',
      columnKey: ['attachmentCount', 'subject'],
      width: '20px',
      renderCell: ({ attachmentCount, subject }) => {
        return subject.charAt(0) === 'L' ? <Icon name="attachment" /> : ''
      },
    },
    {
      title: 'Conversation',
      columnKey: ['subject', 'preview', 'tags'],
      // width: '33%',
      renderCell: cellData => {
        return <ConversationCellMemo {...cellData} />
      },
    },
    {
      title: 'Number',
      columnKey: 'id',
      width: '126px',
    },
    {
      title: 'Last Updated',
      columnKey: ['closedAt', 'modifiedAt'],
      width: '118px',
      renderCell: ({ closedAt, modifiedAt }) => {
        return (
          <span>
            {closedAt ? formatDate(closedAt) : formatDate(modifiedAt)}
          </span>
        )
      },
    },
  ]

  function handlePageChange(nextPage) {
    setIsLoading(true)

    setTimeout(() => {
      setPager(nextPage === 1 ? page1.pager : page2.pager)
      setResults(nextPage === 1 ? page1.results : page2.results)
      setIsLoading(false)
    }, 500)
  }

  return (
    <ConvoListUI>
      <Table
        columns={columns}
        containerWidth={containerWidth}
        data={results}
        isLoading={isLoading}
        tableWidth={tableWidth}
        onSelectRow={selection => {
          console.log(
            '🚀 ~ file: ConvoList.js ~ line 136 ~ selection',
            selection
          )
        }}
        skin={skin}
        withTallRows
        withSelectableRows
      />
      <Pagination
        subject="active conversations"
        activePage={pager.current}
        showNavigation={true}
        rangePerPage={pager.count}
        totalItems={pager.custom.activeCount}
        onChange={handlePageChange}
      />
    </ConvoListUI>
  )
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export const ConvoListUI = styled('div')`
  margin-bottom: 40px;

  .Column_active {
    padding: 5px 0;
  }

  .c-Table__Row.is-row-active td.Column_active {
    height: 100%;
    width: 100%;
    background-color: ${getColor('blue.500')};
  }

  .c-Table__Header {
    color: ${getColor('charcoal.300')};
    font-weight: 400;
  }
`
