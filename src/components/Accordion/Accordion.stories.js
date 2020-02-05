import React from 'react'
import { text, boolean, number } from '@storybook/addon-knobs'
import { Accordion, Button, Input, Page, Text } from '../index'
import { faker } from '@helpscout/helix'

export default {
  component: Accordion,
  title: 'Components/Accordion',
}

const body = faker.lorem.paragraph()()
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
        <Text truncate weight={500}>
          {datum.title}
        </Text>
      </Accordion.Title>
      <Accordion.Body>{datum.body}</Accordion.Body>
    </Accordion.Section>
  ))

const onOpen = id => console.log('Open', id)
const onClose = id => console.log('Close', id)
const onSortEnd = (...args) => console.log('Sorted', ...args)

export const Default = () => (
  <Accordion
    distance={number('distance', 5)}
    isSortable={boolean('isSortable', false)}
    pressDelay={number('pressDelay', 300)}
    onOpen={onOpen}
    onClose={onClose}
    onSortEnd={onSortEnd}
  >
    {createSections(data)}
  </Accordion>
)

Default.story = {
  name: 'default',
}

export const ExtraSmall = () => (
  <Accordion
    distance={number('distance', 5)}
    isSortable={boolean('isSortable', false)}
    pressDelay={number('pressDelay', 300)}
    onOpen={onOpen}
    onClose={onClose}
    onSortEnd={onSortEnd}
    size="xs"
  >
    {createSections(data)}
  </Accordion>
)

ExtraSmall.story = {
  name: 'extra small',
}

export const Small = () => (
  <Accordion
    distance={number('distance', 5)}
    isSortable={boolean('isSortable', false)}
    pressDelay={number('pressDelay', 300)}
    onOpen={onOpen}
    onClose={onClose}
    onSortEnd={onSortEnd}
    size="sm"
  >
    {createSections(data)}
  </Accordion>
)

Small.story = {
  name: 'small',
}

export const Large = () => (
  <Accordion
    distance={number('distance', 5)}
    isSortable={boolean('isSortable', false)}
    pressDelay={number('pressDelay', 300)}
    onOpen={onOpen}
    onClose={onClose}
    onSortEnd={onSortEnd}
    size="lg"
  >
    {createSections(data)}
  </Accordion>
)

Large.story = {
  name: 'large',
}

export const AllowMultiple = () => (
  <Accordion
    allowMultiple
    distance={number('distance', 5)}
    isSortable={boolean('isSortable', false)}
    pressDelay={number('pressDelay', 300)}
    onSortEnd={onSortEnd}
  >
    {createSections(data)}
  </Accordion>
)

AllowMultiple.story = {
  name: 'allow multiple',
}

export const IsSeamless = () => (
  <Accordion
    isSeamless
    distance={number('distance', 5)}
    isSortable={boolean('isSortable', false)}
    pressDelay={number('pressDelay', 300)}
    onSortEnd={onSortEnd}
  >
    {createSections(data)}
  </Accordion>
)

IsSeamless.story = {
  name: 'is seamless',
}

export const IsInPage = () => (
  <Page>
    <Page.Card>
      <Page.Header subtitle="In page mode" />
      <Accordion
        distance={number('distance', 5)}
        isSortable={boolean('isSortable', false)}
        pressDelay={number('pressDelay', 300)}
        onSortEnd={onSortEnd}
      >
        {createSections(data)}
      </Accordion>
    </Page.Card>
  </Page>
)

IsInPage.story = {
  name: 'is in page',
}

export const UsesCustomIds = () => {
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
          <Accordion
            distance={number('distance', 5)}
            isSortable={boolean('isSortable', false)}
            pressDelay={number('pressDelay', 300)}
            onOpen={this.updateSectionId}
            onSortEnd={onSortEnd}
            openSectionIds={[value]}
          >
            {createSections(dataWithIds)}
          </Accordion>
        </div>
      )
    }
  }

  return <AccordionWithCustomIds />
}

UsesCustomIds.story = {
  name: 'uses custom ids',
}

export const UsesMultipleCustomIds = () => {
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
            distance={number('distance', 5)}
            isSortable={boolean('isSortable', false)}
            pressDelay={number('pressDelay', 300)}
            onOpen={(uuid, openSectionIds) =>
              this.updateSectionIds(openSectionIds)
            }
            onSortEnd={onSortEnd}
            openSectionIds={values}
          >
            {createSections(dataWithIds)}
          </Accordion>
        </div>
      )
    }
  }

  return <AccordionWithCustomIds />
}

UsesMultipleCustomIds.story = {
  name: 'uses multiple custom ids',
}

export const RowLink = () => {
  const linkOneContent = text('linkOneContent', 'Link Row One')
  const linkTwoContent = text('linkTwoContent', 'Link Row Two')

  return (
    <Page>
      <Page.Card>
        <Accordion
          isSeamless
          distance={number('distance', 5)}
          isSortable={boolean('isSortable', false)}
          pressDelay={number('pressDelay', 300)}
          onSortEnd={onSortEnd}
        >
          <Accordion.Link to="/">
            <Text truncate weight={500}>
              {linkOneContent}
            </Text>
          </Accordion.Link>
          <Accordion.Link to="/">
            <Text truncate weight={500}>
              {linkTwoContent}
            </Text>
          </Accordion.Link>
        </Accordion>
      </Page.Card>
    </Page>
  )
}

RowLink.story = {
  name: 'Row (Link)',
}
