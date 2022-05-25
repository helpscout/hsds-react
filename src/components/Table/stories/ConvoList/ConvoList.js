import React, { useState, useEffect } from 'react'
import { getColor } from '@hsds/utils-color'
import { page1, page2 } from './convoData'
import { formatDate } from './convoList.utils'
import { CONVO_STATUS_CLASSNAMES, skin } from './ConvoList.constants'
import AvatarRow from '../../../AvatarRow'
import Badge from '../../../Badge'
import Icon from '../../../Icon'
import Pagination from '../../../Pagination'
import Truncate from '../../../Truncate'
import Table from '../../'
import { ConversationCell } from './ConvoList.customCells'
import { ConvoListUI, GridUI, AsideUI, H1UI, PopoverUI } from './ConvoList.css'

export default function ConvoList() {
  const [pager, setPager] = useState(page1.pager)
  const [results, setResults] = useState(page1.results)
  const [avatars, setAvatars] = useState([
    {
      size: 'xs',
      outerBorderColor: getColor('pink.900'),
      borderColor: 'white',
      showStatusBorderColor: true,
      name: 'Ringo Starr',
      tooltipProps: {
        appendTo: () => document.body,
        title: 'Ringo Starr',
      },
    },
  ])
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
      clearCellPadding: true,
      renderCell: cellData => {
        return <ConversationCell {...cellData} />
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
  const numberofavatars = avatars.length

  useEffect(() => {
    const id = setTimeout(() => {
      if (numberofavatars < 5) {
        setAvatars([
          ...avatars,
          {
            size: 'xs',
            outerBorderColor: 'transparent',
            borderColor: 'white',
            showStatusBorderColor: true,
            name: `George Harrison ${Math.random().toFixed(2)}`,
            tooltipProps: {
              appendTo: () => document.body,
              title: 'George Harrison',
            },
          },
        ])
      }
    }, 1000)

    return () => {
      clearTimeout(id)
    }
  }, [numberofavatars])

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
          headerContent={<H1UI>Such a cool table</H1UI>}
          isLoading={isLoading}
          tableDescription="Example table mimicking the ConvoList"
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
            console.groupCollapsed('Row Click')
            console.log('🚀 ~ file: ConvoList.js ~ line 181 ~ row', row)
            console.log('🚀 ~ file: ConvoList.js ~ line 143 ~ url', url)
            console.warn(
              'We need: this.options.folder.get("id") to complete the url'
            )
            console.groupEnd()
          }}
          rowWrapper={(children, row) => {
            if (row.id === 281796231 || row.id === 281796229) {
              return (
                <PopoverUI
                  triggerOn="mouseenter"
                  appendTo={() => document.body}
                  withTriggerWrapper={false}
                  placement="left"
                  renderContent={() => (
                    <AvatarRow
                      size="xs"
                      gap={10}
                      avatars={avatars}
                      throttleOnResize={false}
                      minAvatarsShown={avatars.length <= 4 ? avatars.length : 4}
                    />
                  )}
                >
                  {React.cloneElement(children, {
                    title: `Someone is ${
                      row.id === 281796231 ? 'replying' : 'viewing'
                    }`,
                  })}
                </PopoverUI>
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
