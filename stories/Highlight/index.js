import React from 'react'
import { storiesOf } from '@storybook/react'
import { Highlight } from '../../src/index.js'

// Import languages
import hljs from 'highlight.js/lib/highlight'
import objectivec from 'highlight.js/lib/languages/objectivec'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import swift from 'highlight.js/lib/languages/swift'

hljs.registerLanguage('objectivec', objectivec)
hljs.registerLanguage('java', java)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('swift', swift)

const stories = storiesOf('Highlight', module)

stories.add('Default', () => {
  const objectivecCode = 'const int LENGTH = 20;'
  const javaCode = 'String color = "blue";'
  const javascriptCode = 'if (age === 32") { return true; }'
  const swiftCode = 'let name = "Billy"'

  return (
    <div>
      <Highlight language="objectivec">{objectivecCode}</Highlight>
      <Highlight language="java">{javaCode}</Highlight>
      <Highlight language="javascript">{javascriptCode}</Highlight>
      <Highlight language="swift">{swiftCode}</Highlight>
    </div>
  )
})
