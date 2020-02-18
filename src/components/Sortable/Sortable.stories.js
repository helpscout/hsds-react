import React from 'react'
import { Card, Sortable } from '../index'

export default {
  component: Sortable,
  title: 'Utilities/Sortable',
}

export const Default = () => (
  <Sortable>
    <Card>Jacobim Mugatu</Card>
    <Card>Lord Business</Card>
    <Card>Brennan Huff</Card>
  </Sortable>
)

Default.story = {
  name: 'default',
}
