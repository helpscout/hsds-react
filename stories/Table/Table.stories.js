import React from 'react'
import { storiesOf } from '@storybook/react'
import Table from '../../src/components/Table/Table'

const stories = storiesOf('Table', module)

stories.add('default', () => <Table />)
