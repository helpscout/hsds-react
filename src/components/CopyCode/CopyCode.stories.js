import React from 'react'
import { select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { CopyCode } from '../index'

export default {
  component: CopyCode,
  title: 'Components/Forms/CopyCode',
}

export const Default = () => {
  return (
    <CopyCode
      code={`<script type="text/javascript">!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});</script> <script type="text/javascript">window.Beacon('init', '854f8c17-9530-4aec-9309-8b221d932619')</script>`}
      language={select(
        'syntax highlighting',
        {
          html: 'html',
          swift: 'swift',
          java: 'java',
          objectivec: 'objectivec',
        },
        'html'
      )}
      maxWidth={500}
      onCopy={action('Copy')}
    />
  )
}

Default.story = {
  name: 'default',
}
