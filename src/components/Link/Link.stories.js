import React from 'react'
import { boolean, text } from '@storybook/addon-knobs'
import { Link } from '../index'

export default {
  component: Link,
  title: 'Components/Text/Link',
}

export const Default = () => {
  const props = {
    children: text('Content', 'Linky'),
    href: text('href', 'https://github.com/helpscout/hsds-react'),
    voidOnClick: boolean('voidOnClick', false),
  }

  return <Link {...props} />
}
