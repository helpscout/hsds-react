import React from 'react'
import { storiesOf } from '@storybook/react'
import { Emoticon } from '../src/index.js'

const stories = storiesOf('Emoticon', module)

stories.add('default', () => (
  <div>
    <h3>Default</h3>
    <div>
      <Emoticon inline name="happy" />
      <Emoticon inline name="happy" isActive={false} />
    </div>
    <div>
      <Emoticon inline name="meh" />
      <Emoticon inline name="meh" isActive={false} />
    </div>
    <div>
      <Emoticon inline name="sad" />
      <Emoticon inline name="sad" isActive={false} />
    </div>

    <h3>Small</h3>
    <div>
      <Emoticon inline name="happy" size="sm" />
      <Emoticon inline name="happy" isActive={false} size="sm" />
    </div>
    <div>
      <Emoticon inline name="meh" size="sm" />
      <Emoticon inline name="meh" isActive={false} size="sm" />
    </div>
    <div>
      <Emoticon inline name="sad" size="sm" />
      <Emoticon inline name="sad" isActive={false} size="sm" />
    </div>
  </div>
))
