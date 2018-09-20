import React from 'react'
import { storiesOf } from '@storybook/react'
import { CopyInput, Highlight } from '../../src/index.js'

// Import languages
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)

const stories = storiesOf('CopyInput', module)

stories.add('Default', () => <CopyInput />)

stories.add('Highlight', () => {
  const javascriptCode = 'if (age === 32") { return true; }'

  return (
    <CopyInput>
      <Highlight language="javascript">{javascriptCode}</Highlight>
    </CopyInput>
  )
})
