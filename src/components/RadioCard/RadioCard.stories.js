import React from 'react'
import { ChoiceGroup, RadioCard, Icon } from '../index'

export default {
  component: RadioCard,
  title: 'Components/RadioCard',
}

const onChange = value => {
  console.log(value)
}

export const Default = () => (
  <ChoiceGroup align="horizontal" onChange={onChange} value="chat">
    <RadioCard icon="fab-chat" value="chat" />
    <RadioCard icon="fab-antenna" value="antenna" />
    <RadioCard icon="fab-buoy" value="buoy" />
    <RadioCard icon="fab-search" value="search" />
    <RadioCard icon="fab-question" value="question" />
  </ChoiceGroup>
)

Default.story = {
  name: 'default',
}

export const Responsive = () => (
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
)

Responsive.story = {
  name: 'responsive',
}

export const ResponsiveMaxWidth = () => (
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
)

ResponsiveMaxWidth.story = {
  name: 'responsive + maxWidth',
}

export const Focused = () => (
  <ChoiceGroup align="horizontal" onChange={onChange} value="chat">
    <RadioCard icon="fab-chat" value="chat" isFocused />
    <RadioCard icon="fab-antenna" value="antenna" />
    <RadioCard icon="fab-buoy" value="buoy" />
    <RadioCard icon="fab-search" value="search" />
    <RadioCard icon="fab-question" value="question" />
  </ChoiceGroup>
)

Focused.story = {
  name: 'focused',
}

export const CustomIcons = () => (
  <ChoiceGroup align="horizontal" onChange={onChange} value="chat">
    <RadioCard icon={<Icon size="24" name="search" />} value="chat" />
    <RadioCard icon={<Icon size="24" name="search" />} value="antenna" />
    <RadioCard icon={<Icon size="24" name="fab-antenna" />} value="buoy" />
    <RadioCard icon={<Icon size="24" name="search" />} value="search" />
    <RadioCard icon={<Icon size="24" name="search" />} value="question" />
  </ChoiceGroup>
)

CustomIcons.story = {
  name: 'custom icons',
}

export const SizeHeadingContent = () => (
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
)

SizeHeadingContent.story = {
  name: 'size, heading & content',
}
