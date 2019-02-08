import * as React from 'react'
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import { getColor } from '../src/styles/utilities/color'
import styled from '../src/components/styled'

import { Pagination } from '../src/components'

const PaginationWrapperUI = styled('div')`
  min-width: 400px;
  max-width: 800px;
  background-color: ${getColor('grey.300')};
  padding: 20px;
`

const stories = storiesOf('Pagination', module)
stories.addDecorator(withKnobs)
stories.addDecorator(storyFn => (
  <PaginationWrapperUI>
    <div style={{ backgroundColor: '#fff' }}>{storyFn()}</div>
  </PaginationWrapperUI>
))

// TODO: add other stories to render different state of the navigation

const subject = () => text('subject', 'Customers')
const activePage = (cPage = 1) => number('activePage', cPage)

const getKnobsProps = otherKnobs => {
  return {
    totalItems: number('totalItems', 255),
    rangePerPage: number('rangePerPage', 50),
    ...otherKnobs,
  }
}

stories.add('default', () => {
  return <Pagination {...getKnobsProps()} onChange={action('changePage')} />
})

stories.add('with subject', () => {
  return (
    <Pagination
      showNavigation={false}
      {...getKnobsProps({ subject: subject() })}
    />
  )
})

stories.add('start of navigation', () => {
  return (
    <Pagination
      {...getKnobsProps({ subject: subject(), activePage: activePage(1) })}
      showNavigation={true}
      onChange={action('changePage')}
    />
  )
})

stories.add('middle of navigation', () => {
  return (
    <Pagination
      {...getKnobsProps({ subject: subject(), activePage: activePage(2) })}
      showNavigation={true}
      onChange={action('changePage')}
    />
  )
})

stories.add('end of navigation', () => {
  return (
    <Pagination
      {...getKnobsProps({ subject: subject(), activePage: activePage(10) })}
      showNavigation={true}
      onChange={action('changePage')}
    />
  )
})
