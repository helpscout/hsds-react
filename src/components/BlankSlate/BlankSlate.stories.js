import React from 'react'
import { boolean, number, text } from '@storybook/addon-knobs'
import WrenchCat from '@helpscout/hsds-illos/wrench-cat'
import { withAktiv } from '../../utilities/storybook'
import { BlankSlate } from '../index'

export default {
  component: BlankSlate,
  title: 'Components/BlankSlate',
}

const message = () =>
  text(
    'message',
    `No results found for "boopable". Please try another search term.`
  )
const title = (title = 'No Customers yet') => text('title', title)
const illoName = (illoName = 'spot-misc-empty') => text('illoName', illoName)

const htmlMessage = (
  <span>
    No results found for <b>"boopable"</b>. Please try another search term.
  </span>
)

const getKnobsProps = otherKnobs => {
  return {
    lightBackground: boolean('lightBackground', false),
    alignTop: boolean('alignTop', false),
    ...otherKnobs,
  }
}

export const Default = () => {
  const props = { message: message(), title: title('') }
  return <BlankSlate {...getKnobsProps()} {...props} />
}

export const HtmlInMessage = () => {
  const props = {
    title: title(''),
    message: htmlMessage,
  }
  return <BlankSlate {...getKnobsProps()} {...props} />
}

HtmlInMessage.story = {
  name: 'HTML in message',
}

export const Illo = () => {
  const props = {
    title: title(''),
    illoName: illoName(),
    message: htmlMessage,
    illoSize: 90,
  }
  return <BlankSlate {...getKnobsProps()} {...props} />
}

export const CustomIllo = () => {
  const props = {
    title: title(''),
    illo: <WrenchCat size={90} />,
    message: htmlMessage,
  }
  return <BlankSlate {...getKnobsProps()} {...props} />
}

export const Heading = () => {
  const props = { title: title(), message: htmlMessage }
  return <BlankSlate {...getKnobsProps()} {...props} />
}

export const LightBackground = () => {
  const props = {
    title: title(),
    illoName: illoName(),
    lightBackground: boolean('lightBackground', true),
    message: htmlMessage,
    illoSize: 90,
  }
  return <BlankSlate {...props} />
}

LightBackground.story = {
  name: 'Light background',
}
