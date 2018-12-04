import React from 'react'
import { storiesOf } from '@storybook/react'
import { Accordion, Button, Input, Page, Text } from '../src/index'

const stories = storiesOf('Accordion', module)

const body = `
Laborum ex laboris exercitation exercitation. Laborum nisi excepteur sunt ut
sint sunt non consectetur incididunt. In dolor nulla cupidatat adipisicing
eiusmod commodo officia. Dolore ut tempor cillum voluptate minim quis cupidatat
sit ea incididunt tempor irure ex consectetur. Aliqua enim consectetur ad
sit. Ullamco aliquip ullamco commodo cupidatat culpa qui commodo. Do sint
reprehenderit aute dolor veniam. Anim non deserunt do irure nostrud labore
consequat. Enim voluptate nostrud id aliquip est. Nisi esse ea voluptate
nostrud. Incididunt adipisicing aute elit in sint. Ipsum laborum labore dolor
amet mollit Lorem. Mollit laborum cillum id occaecat et laboris labore pariatur
do est.
`

const form = (
  <form>
    <Input label="Enter some text" style={{ marginBottom: '7px' }} />
    <Button primary>Save</Button>
  </form>
)

const data = [
  { title: 'Section 1', body },
  { title: 'Section 2', body: form },
  { title: 'Section 3', body },
  { title: 'Section 4', body },
]

const createSections = () =>
  data.map((datum, index) => (
    <Accordion.Section key={index}>
      <Accordion.Title>
        <Text truncate weight={700}>
          {datum.title}
        </Text>
      </Accordion.Title>
      <Accordion.Body>{datum.body}</Accordion.Body>
    </Accordion.Section>
  ))

const onOpen = id => console.log('Open', id)
const onClose = id => console.log('Close', id)

stories.add('default', () => (
  <Accordion onOpen={onOpen} onClose={onClose}>
    {createSections()}
  </Accordion>
))

stories.add('extra small', () => (
  <Accordion onOpen={onOpen} onClose={onClose} size="xs">
    {createSections()}
  </Accordion>
))

stories.add('small', () => (
  <Accordion onOpen={onOpen} onClose={onClose} size="sm">
    {createSections()}
  </Accordion>
))

stories.add('large', () => (
  <Accordion onOpen={onOpen} onClose={onClose} size="lg">
    {createSections()}
  </Accordion>
))

stories.add('allow multiple', () => (
  <Accordion allowMultiple>{createSections()}</Accordion>
))

stories.add('is seamless', () => (
  <Accordion isSeamless>{createSections()}</Accordion>
))

stories.add('is seamless in page', () => (
  <Page title="Accordion">
    <Page.Card>
      <Page.Header title="Accordion" subtitle="In seamless mode" />
      <Accordion>{createSections()}</Accordion>
    </Page.Card>
  </Page>
))
