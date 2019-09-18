import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CopyCode } from '../src/index'

const stories = storiesOf('CopyCode', module)

stories.add('JavaScript', () => {
  return (
    <CopyCode
      code={`<script type="text/javascript">!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});</script> <script type="text/javascript">window.Beacon('init', '854f8c17-9530-4aec-9309-8b221d932619')</script>`}
      language="html"
      maxWidth={500}
      onCopy={action('Copy')}
    />
  )
})

stories.add('Swift', () => {
  return (
    <CopyCode
      code={`let settings = HSBeaconSettings(beaconId: "dfb87142-d529-4f3a-aa31-1e3afc4a18b8") HSBeacon.open(settings)`}
      maxWidth={500}
      language="swift"
      onCopy={action('Copy')}
    />
  )
})

stories.add('Java', () => {
  return (
    <CopyCode
      code={`Beacon beacon = new Beacon.Builder()
      .withBeaconId("dfb87142-d529-4f3a-aa31-1e3afc4a18b8")
      .build();`}
      language="java"
      maxWidth={500}
      onCopy={action('Copy')}
    />
  )
})

stories.add('Objective-C', () => {
  return (
    <CopyCode
      code={`HSBeaconSettings *settings = [[HSBeaconSettings alloc] initWithBeaconId:@"dfb87142-d529-4f3a-aa31-1e3afc4a18b8"]; [HSBeacon openBeacon:settings];`}
      language="objectivec"
      maxWidth={500}
      onCopy={action('Copy')}
    />
  )
})
