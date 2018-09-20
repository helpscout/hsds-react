import React from 'react'
import { storiesOf } from '@storybook/react'
import { Accordion, Text } from '../../src/'

const stories = storiesOf('Accordion', module)

stories.add('default', () => (
  <Accordion>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 1
        </Text>
      </Accordion.Title>
      <Accordion.Body>Some body text for section 1</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 2
        </Text>
      </Accordion.Title>
      <Accordion.Body>Some body text for section 2</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 3
        </Text>
      </Accordion.Title>
      <Accordion.Body>Some body text for section 3</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Wow The Title For Section Four Really Is Ridiculously Long Isn't It? I
          Mean Come On? How Long Does It Need To Be?
        </Text>
      </Accordion.Title>
      <Accordion.Body>Some body text for section 4</Accordion.Body>
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
      <Accordion.Body>Some body text for section 1</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 2
        </Text>
      </Accordion.Title>
      <Accordion.Body>Some body text for section 2</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Section 3
        </Text>
      </Accordion.Title>
      <Accordion.Body>Some body text for section 3</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>
        <Text truncate weight={700}>
          Wow The Title For Section Four Really Is Ridiculously Long Isn't It? I
          Mean Come On? How Long Does It Need To Be?
        </Text>
      </Accordion.Title>
      <Accordion.Body>Some body text for section 4</Accordion.Body>
    </Accordion.Section>
  </Accordion>
))
