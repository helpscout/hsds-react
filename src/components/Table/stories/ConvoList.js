import React, { useState } from 'react'
import Tippy, { useSingleton } from '@tippyjs/react/headless'
import equal from 'fast-deep-equal'
import styled from 'styled-components'
import { getColor } from '../../../styles/utilities/color'
import { page1, page2 } from './convoData'
import AvatarSpec from '../../../utilities/specs/avatar.specs'
import Badge from '../../Badge'
import Icon from '../../Icon'
import Avatar from '../../Avatar'
import Popover from '../../Popover'
import Pagination from '../../Pagination'
import Truncate from '../../Truncate'
import Table from '../'

const CONVO_STATUS_CLASSNAMES = {
  1: 'convo-active',
  2: 'convo-pending',
  3: 'convo-closed',
  4: 'convo-spam',
}
const TAG_COLORS = [
  getColor('charcoal.200'),
  getColor('green.500'),
  getColor('blue.500'),
  getColor('yellow.500'),
  getColor('purple.500'),
  getColor('red.500'),
]

const GridUI = styled('div')`
  display: grid;
  grid-template-columns: 100px 1fr;
`
const AsideUI = styled('aside')`
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
`
const TagUI = styled('div')`
  display: inline-block;
  width: auto;
  height: 15px;
  line-height: 13px;
  padding: 1px 4px;
  font-size: 12px;
  color: white;
  background-color: ${({ color }) => color};
  border-radius: 3px;
  margin-right: 3px;
`

const SubjectUI = styled('span')`
  color: ${getColor('charcoal.600')};
  font-size: 13px;
`

const PreviewUI = styled('div')`
  font-size: 13px;
  color: ${getColor('charcoal.200')};
  font-weight: 400;
`

const ConversationCellUI = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  // compensate the cell right padding to give space for the fader below
  width: calc(100% + 14px);
  overflow: hidden;
  white-space: nowrap;

  &::after {
    position: absolute;
    content: '';
    width: 18px;
    height: 100%;
    right: 0;
    top: 0;
    box-shadow: inset -7px 0px 7px white;
    transition: box-shadow 100ms ease-in-out;
  }

  tr.is-row-selected &::after {
    box-shadow: inset -7px 0px 7px ${getColor('yellow.100')};
  }

  tr.c-Table__Row:focus &::after {
    box-shadow: inset -7px 0px 7px ${getColor('blue.100')};
  }

  tr.c-Table__Row:hover &::after {
    box-shadow: inset -7px 0px 7px ${getColor('grey.300')};
  }
`

function ConversationCell({ subject, preview, tags, row }) {
  return (
    <ConversationCellUI>
      <div>
        {tags
          ? tags.map(tag => (
              <TagUI
                color={TAG_COLORS[tag.color]}
                key={`${tag.name}_${row.id}`}
              >
                {tag.name}
              </TagUI>
            ))
          : null}
        <SubjectUI>{subject}</SubjectUI>
      </div>
      <PreviewUI>{preview}</PreviewUI>
    </ConversationCellUI>
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
  // const [source, target] = useSingleton()
  const [pager, setPager] = useState(page1.pager)
  const [results, setResults] = useState(page1.results)
  const [isLoading, setIsLoading] = useState(false)
  const tableWidth = { min: '700px' }
  const containerWidth = '100%'

  const columns = [
    {
      title: 'Customer',
      columnKey: ['customer.fullName', 'customer.email'],
      width: '150px',
      renderCell: ({ customer_fullName, customer_email }) => {
        return <Truncate>{customer_fullName || customer_email}</Truncate>
      },
    },
    {
      title: '',
      columnKey: 'attachmentCount',
      width: '20px',
      renderCell: ({ attachmentCount }) => {
        return attachmentCount > 0 ? (
          <Icon name="attachment" shade="faint" />
        ) : (
          ''
        )
      },
    },
    {
      title: 'Conversation',
      columnKey: ['subject', 'preview', 'tags'],
      renderCell: cellData => {
        return <ConversationCellMemo {...cellData} />
      },
    },
    {
      title: '',
      columnKey: 'threadCount',
      width: '42px',
      renderCell: ({ threadCount }) => {
        return threadCount > 1 ? <Badge isSquare>{threadCount}</Badge> : null
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
    <GridUI>
      <AsideUI />
      <ConvoListUI>
        <Table
          columns={columns}
          containerWidth={containerWidth}
          data={results}
          isLoading={isLoading}
          tableWidth={tableWidth}
          rowClassName={row => {
            return {
              [CONVO_STATUS_CLASSNAMES[row.status]]: true,
              replying: row.id === 281796231,
              viewing: row.id === 281796229,
            }
          }}
          onRowClick={(e, row) => {
            const url = `/conversation/${row.id}/${row.number}`
            console.group('Row Click')
            console.log('🚀 ~ file: ConvoList.js ~ line 181 ~ row', row)
            console.log('🚀 ~ file: ConvoList.js ~ line 143 ~ url', url)
            console.warn(
              'We need: this.options.folder.get("id") to complete the url'
            )
            console.groupEnd()
          }}
          onRowMouseEnter={(e, row) => {}}
          rowWrapper={(children, row) => {
            if (row.id === 281796231 || row.id === 281796229) {
              return (
                <Popover
                  triggerOn="mouseenter"
                  appendTo={() => document.body}
                  withTriggerWrapper={false}
                  placement="left"
                  renderContent={() => (
                    <Avatar
                      size="xs"
                      outerBorderColor={
                        row.id === 281796231
                          ? getColor('pink.900')
                          : getColor('yellow.500')
                      }
                      borderColor="white"
                      showStatusBorderColor
                      name={AvatarSpec.generate().name}
                      image={AvatarSpec.generate().image}
                    />
                  )}
                >
                  {React.cloneElement(children, {
                    title: `Someone is ${
                      row.id === 281796231 ? 'replying' : 'viewing'
                    }`,
                  })}
                </Popover>
              )
            }
            return children
          }}
          onSelectRow={selection => {
            console.log(
              '🚀 ~ file: ConvoList.js ~ line 136 ~ selection',
              selection
            )
          }}
          skin={skin}
          withTallRows
          withSelectableRows
          withFocusableRows
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
    </GridUI>
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
  font-size: 14px;

  .c-Table__Header {
    color: ${getColor('charcoal.300')};
    font-weight: 400;
  }

  .convo-active td {
    font-weight: 700;
  }

  .replying td:first-child,
  .viewing td:first-child {
    position: relative;

    &::before {
      position: absolute;
      content: '';
      display: block;
      height: 0;
      width: 0;
      top: 0;
      left: 0;
      border-left: 12px solid ${getColor('yellow.500')};
      border-bottom: 12px solid transparent;
      border-top: 0 solid transparent;
    }
  }

  .replying td:first-child::before {
    border-left: 12px solid ${getColor('pink.900')};
  }
`
