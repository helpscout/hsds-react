import React from 'react'
import { Accordion, Button, Input, Text } from '../index'
import { faker } from '@helpscout/helix'

const body = faker.lorem.paragraph()()
const form = (
  <form>
    <Input label="Enter some text" style={{ marginBottom: '7px' }} />
    <Button primary>Save</Button>
  </form>
)

export const data = [
  { title: 'Section 1', body },
  { title: 'Section 2', body: form },
  { title: 'Section 3', body },
  { title: 'Section 4', body },
]

export const dataWithIds = data.map((item, index) => ({
  ...item,
  id: index + 1,
}))

export const createSections = data =>
  data.map((datum, index) => (
    <Accordion.Section key={index} id={datum.id}>
      <Accordion.Title>
        <Text truncate weight={500}>
          {datum.title}
        </Text>
      </Accordion.Title>
      <Accordion.Body>{datum.body}</Accordion.Body>
    </Accordion.Section>
  ))

export const onOpen = id => console.log('Open', id)
export const onClose = id => console.log('Close', id)
export const onSortEnd = (...args) => console.log('Sorted', ...args)
