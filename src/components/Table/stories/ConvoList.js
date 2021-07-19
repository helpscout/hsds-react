import React, { Component } from 'react'
import { page1, page2 } from './convoData'
import Icon from '../../Icon'
import Pagination from '../../Pagination'
import Table from '../'

export default class ConvoList extends Component {
  constructor(props) {
    super(props)
    const { results, pager } = page1

    this.state = {
      pager,
      results,
      columns: [
        {
          title: 'Customer',
          columnKey: 'customer.fullName',
          width: '150px',
        },
        {
          title: '',
          columnKey: 'attachmentCount',
          width: '20px',
          renderCell: ({ attachmentCount }) => {
            return Math.round(Math.random()) ? <Icon name="attachment" /> : ''
          },
        },
        {
          title: 'Conversation',
          columnKey: ['subject', 'preview'],
          // width: '33%',
          renderCell: ({ subject, preview }) => {
            return (
              <div>
                <strong>{subject}</strong>
                <br />
                <span>{preview}</span>
              </div>
            )
          },
        },
        {
          title: 'Number',
          columnKey: 'number',
          width: '86px',
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
      ],
      loadingData: false,
      tableWidth: { min: '700px' },
      containerWidth: '100%',
    }
  }

  render() {
    const {
      pager,
      results,
      columns,
      isLoading,
      tableWidth,
      containerWidth,
    } = this.state

    return (
      <div style={{ marginBottom: '50px' }}>
        <Table
          columns={columns}
          data={results}
          isLoading={isLoading}
          tableWidth={tableWidth}
          containerWidth={containerWidth}
          withTallRows
        />
        <Pagination
          subject="active conversations"
          activePage={pager.current}
          showNavigation={true}
          rangePerPage={pager.count}
          totalItems={pager.custom.activeCount}
          onChange={this.handlePageChange}
        />
      </div>
    )
  }

  handlePageChange = nextPage => {
    this.setState({
      isLoading: true,
    })

    setTimeout(() => {
      this.setState({
        activePage: nextPage,
        data: nextPage === 1 ? page1.results : page2.results,
        isLoading: false,
      })
    }, 500)
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}
