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
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('Pagination', module)
stories.addDecorator(withArtboard())
stories.addDecorator(withKnobs)

const getKnobsProps = () => {
  const activePage = number('activePage', 1)
  const totalItems = number('totalItems', 255)
  const rangePerPage = number('rangePerPage', 50)

  return {
    activePage,
    totalItems,
    rangePerPage,
  }
}

stories.add('default', () => {
  return (
    <div style={{ padding: '20%' }}>
      <Pagination {...getKnobsProps()} />
    </div>
  )
})
