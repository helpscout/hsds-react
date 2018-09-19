import React from 'react'
import { storiesOf } from '@storybook/react'
import { Accordion } from '../../src/'

const stories = storiesOf('Accordion', module)

stories.add('default', () => (
  <Accordion>
    <Accordion.Section>
      <Accordion.Title>Section 1</Accordion.Title>
      <Accordion.Body>Some body text for section 1</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>Section 2</Accordion.Title>
      <Accordion.Body>Some body text for section 2</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>Section 3</Accordion.Title>
      <Accordion.Body>Some body text for section 3</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>Section 4</Accordion.Title>
      <Accordion.Body>Some body text for section 4</Accordion.Body>
    </Accordion.Section>
  </Accordion>
))

stories.add('allow multiple', () => (
  <Accordion allowMultiple>
    <Accordion.Section>
      <Accordion.Title>Section 1</Accordion.Title>
      <Accordion.Body>Some body text for section 1</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>Section 2</Accordion.Title>
      <Accordion.Body>Some body text for section 2</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>Section 3</Accordion.Title>
      <Accordion.Body>Some body text for section 3</Accordion.Body>
    </Accordion.Section>
    <Accordion.Section>
      <Accordion.Title>Section 4</Accordion.Title>
      <Accordion.Body>Some body text for section 4</Accordion.Body>
    </Accordion.Section>
  </Accordion>
))
