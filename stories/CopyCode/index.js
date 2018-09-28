import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CopyCode, Highlight } from '../../src/index.js'

// Import languages
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)

const stories = storiesOf('CopyCode', module)

stories.add('Default', () => (
  <CopyCode onCopy={action('Copy')} code="Code to be copied" />
))

stories.add('Highlight', () => {
  const javascriptCode = `<script type="text/javascript">!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});</script>
<script type="text/javascript">window.Beacon('init', '854f8c17-9530-4aec-9309-8b221d932619')</script>`

  return (
    <CopyCode
      onCopy={action('Copy')}
      language="javascript"
      code={javascriptCode}
    />
  )
})
