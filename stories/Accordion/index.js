import React from 'react'
import { storiesOf } from '@storybook/react'
import { Accordion, Page, Text } from '../../src/'

const stories = storiesOf('Accordion', module)

const bodyCopy = `
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

stories.add('default', () => (
  <Accordion>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 1
        </Text>
      </Accordion.Title>
      <Accordion.Body>{bodyCopy}</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 2
        </Text>
      </Accordion.Title>
      <Accordion.Body>{bodyCopy}</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 3
        </Text>
      </Accordion.Title>
      <Accordion.Body>{bodyCopy}</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 4
        </Text>
      </Accordion.Title>
      <Accordion.Body>{bodyCopy}</Accordion.Body>
    </Accordion.Section>
  </Accordion>
))

stories.add('allow multiple', () => (
  <Accordion allowMultiple>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 1
        </Text>
      </Accordion.Title>
      <Accordion.Body>{bodyCopy}</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 2
        </Text>
      </Accordion.Title>
      <Accordion.Body>{bodyCopy}</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 3
        </Text>
      </Accordion.Title>
      <Accordion.Body>{bodyCopy}</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 4
        </Text>
      </Accordion.Title>
      <Accordion.Body>{bodyCopy}</Accordion.Body>
    </Accordion.Section>
  </Accordion>
))

stories.add('is seamless', () => (
  <Page title="Accordion">
    <Page.Card>
      <Page.Header title="Accordion" subtitle="In seamless mode" />
      <Accordion isSeamless>
        <Accordion.Section>
          <Accordion.Title>
            <Text truncate weight={700}>
              Section 1
            </Text>
          </Accordion.Title>
          <Accordion.Body>{bodyCopy}</Accordion.Body>
        </Accordion.Section>
        <Accordion.Section>
          <Accordion.Title>
            <Text truncate weight={700}>
              Section 2
            </Text>
          </Accordion.Title>
          <Accordion.Body>{bodyCopy}</Accordion.Body>
        </Accordion.Section>
        <Accordion.Section>
          <Accordion.Title>
            <Text truncate weight={700}>
              Section 3
            </Text>
          </Accordion.Title>
          <Accordion.Body>{bodyCopy}</Accordion.Body>
        </Accordion.Section>
        <Accordion.Section>
          <Accordion.Title>
            <Text truncate weight={700}>
              Section 4
            </Text>
          </Accordion.Title>
          <Accordion.Body>{bodyCopy}</Accordion.Body>
        </Accordion.Section>
      </Accordion>
    </Page.Card>
  </Page>
))
