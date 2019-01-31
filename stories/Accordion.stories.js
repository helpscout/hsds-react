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

const dataWithIds = data.map((item, index) => ({
  ...item,
  id: index + 1,
}))

const createSections = data =>
  data.map((datum, index) => (
    <Accordion.Section key={index} id={datum.id}>
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
    {createSections(data)}
  </Accordion>
))

stories.add('extra small', () => (
  <Accordion onOpen={onOpen} onClose={onClose} size="xs">
    {createSections(data)}
  </Accordion>
))

stories.add('small', () => (
  <Accordion onOpen={onOpen} onClose={onClose} size="sm">
    {createSections(data)}
  </Accordion>
))

stories.add('large', () => (
  <Accordion onOpen={onOpen} onClose={onClose} size="lg">
    {createSections(data)}
  </Accordion>
))

stories.add('allow multiple', () => (
  <Accordion allowMultiple>{createSections(data)}</Accordion>
))

stories.add('is seamless', () => (
  <Accordion isSeamless>{createSections(data)}</Accordion>
))

stories.add('is seamless in page', () => (
  <Page title="Accordion">
    <Page.Card>
      <Page.Header title="Accordion" subtitle="In seamless mode" />
      <Accordion>{createSections(data)}</Accordion>
    </Page.Card>
  </Page>
))

stories.add('uses custom ids', () => {
  class AccordionWithCustomIds extends React.Component {
    state = {
      value: 3,
    }

    handleChange = e => {
      this.updateSectionId(e.target.value)
    }

    updateSectionId = value => {
      this.setState({
        value: parseInt(value, 10),
      })
    }

    render() {
      const { value } = this.state

      return (
        <div>
          <form
            onSubmit={e => e.preventDefault()}
            style={{ marginBottom: '10px' }}
          >
            <input
              interval="1"
              min="1"
              max="4"
              onChange={this.handleChange}
              type="number"
              value={value}
              style={{ width: '100px' }}
            />
          </form>
          <Accordion onOpen={this.updateSectionId} openSectionIds={[value]}>
            {createSections(dataWithIds)}
          </Accordion>
        </div>
      )
    }
  }

  return <AccordionWithCustomIds />
})

stories.add('uses multiple custom ids', () => {
  class AccordionWithCustomIds extends React.Component {
    state = {
      values: [1, 2],
    }

    handleChange = e => {
      this.updateSectionIds(e.target.value.split(','))
    }

    updateSectionIds = values => {
      this.setState({
        values,
      })
    }

    render() {
      const { values } = this.state

      return (
        <div>
          <form
            onSubmit={e => e.preventDefault()}
            style={{ marginBottom: '10px' }}
          >
            <select onChange={this.handleChange}>
              <option value="1,2">1,2</option>
              <option value="1,4">1,4</option>
              <option value="3,4">3,4</option>
            </select>
          </form>
          <Accordion
            allowMultiple
            onOpen={(uuid, openSectionIds) =>
              this.updateSectionIds(openSectionIds)
            }
            openSectionIds={values}
          >
            {createSections(dataWithIds)}
          </Accordion>
        </div>
      )
    }
  }

  return <AccordionWithCustomIds />
})
