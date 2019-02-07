import * as React from 'react'
import { Pagination } from '../src/components'
import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { getColor } from '../src/styles/utilities/color'
import styled from '../src/components/styled'

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

const subject = () => text('subject', 'Customers')

const getKnobsProps = otherKnobs => {
  return {
    activePage: number('activePage', 1),
    totalItems: number('totalItems', 255),
    rangePerPage: number('rangePerPage', 50),
    ...otherKnobs,
  }
}

stories.add('default', () => {
  return <Pagination {...getKnobsProps()} />
})

stories.add('with subject', () => {
  return <Pagination {...getKnobsProps({ subject: subject() })} />
})

stories.add('with navigation', () => {
  return (
    <Pagination
      {...getKnobsProps({ subject: subject() })}
      showNavigation={true}
    />
  )
})
