import React from 'react'
import { addDecorator, configure, addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withOptions } from '@storybook/addon-options'
import { withKnobs } from '@storybook/addon-knobs'
import { StatsGraph } from '@helpscout/stats'
import '../src/adapters/app'
import '../src/styles/blue.scss'
import './storybook.css'

const withStats = storyFn => (
  <div>
    <StatsGraph bottom={0} top="initial" right={5} />
    {storyFn()}
  </div>
)

addDecorator(withStats)
addDecorator(withKnobs)
addDecorator(
  withOptions({
    name: 'HSDS: React',
  })
)

addParameters({
  viewports: {
    ...INITIAL_VIEWPORTS,
  },
})

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.(js|ts|tsx)$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
