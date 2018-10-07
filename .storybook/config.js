import { configure } from '@storybook/react'
import '../src/styles/blue.scss'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.(js|ts|tsx)$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
