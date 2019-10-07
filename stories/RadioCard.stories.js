import React from 'react'
import { storiesOf } from '@storybook/react'
import { ChoiceGroup, RadioCard, Icon } from '../src/index'

const stories = storiesOf('RadioCard', module)

const onChange = value => {
  console.log(value)
}

stories.add('default', () => (
  <ChoiceGroup align="horizontal" onChange={onChange} value="chat">
    <RadioCard icon="fab-chat" value="chat" />
    <RadioCard icon="fab-antenna" value="antenna" />
    <RadioCard icon="fab-buoy" value="buoy" />
    <RadioCard icon="fab-search" value="search" />
    <RadioCard icon="fab-question" value="question" />
  </ChoiceGroup>
))

stories.add('responsive', () => (
  <div style={{ width: 300 }}>
    <ChoiceGroup
      align="horizontal"
      onChange={onChange}
      isResponsive
      value="chat"
    >
      <RadioCard icon="fab-chat" value="chat" />
      <RadioCard icon="fab-antenna" value="antenna" />
      <RadioCard icon="fab-buoy" value="buoy" />
      <RadioCard icon="fab-search" value="search" />
      <RadioCard icon="fab-question" value="question" />
    </ChoiceGroup>
  </div>
))

stories.add('responsive + maxWidth', () => (
  <div style={{ width: 600 }}>
    <ChoiceGroup
      align="horizontal"
      onChange={onChange}
      isResponsive
      choiceMaxWidth="75px"
      value="chat"
    >
      <RadioCard icon="fab-chat" value="chat" />
      <RadioCard icon="fab-antenna" value="antenna" />
      <RadioCard icon="fab-buoy" value="buoy" />
      <RadioCard icon="fab-search" value="search" />
      <RadioCard icon="fab-question" value="question" />
    </ChoiceGroup>
  </div>
))

stories.add('focused', () => (
  <ChoiceGroup align="horizontal" onChange={onChange} value="chat">
    <RadioCard icon="fab-chat" value="chat" isFocused />
    <RadioCard icon="fab-antenna" value="antenna" />
    <RadioCard icon="fab-buoy" value="buoy" />
    <RadioCard icon="fab-search" value="search" />
    <RadioCard icon="fab-question" value="question" />
  </ChoiceGroup>
))

stories.add('custom icons', () => (
  <ChoiceGroup align="horizontal" onChange={onChange} value="chat">
    <RadioCard icon={<Icon size="24" name="search" />} value="chat" />
    <RadioCard icon={<Icon size="24" name="search" />} value="antenna" />
    <RadioCard icon={<Icon size="24" name="fab-antenna" />} value="buoy" />
    <RadioCard icon={<Icon size="24" name="search" />} value="search" />
    <RadioCard icon={<Icon size="24" name="search" />} value="question" />
  </ChoiceGroup>
))

stories.add('size, heading & content', () => (
  <ChoiceGroup
    align="horizontal"
    onChange={onChange}
    value="chat"
    choiceMaxWidth="214px"
    isResponsive
  >
    <RadioCard
      icon="fab-chat"
      content="some content"
      heading="Chat"
      value="chat"
      maxWidth="214px"
    />
    <RadioCard
      icon="fab-antenna"
      content="some content"
      heading="Antenna"
      value="antenna"
      maxWidth="214px"
    />
    <RadioCard
      icon="fab-buoy"
      content="some content"
      heading="Buoy"
      value="buoy"
      maxWidth="214px"
    />
  </ChoiceGroup>
))
