/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import Perf from 'react-addons-perf'
import React from 'react'
import { addDecorator, configure } from '@storybook/react'
// import { setOptions } from '@storybook/addon-options'

const Docs = props => {
  return (
    <div>
      {props.story()}
    </div>
  )
}

// setOptions({
//   name: 'Blue',
//   url: 'https://github.com/helpscout/blue',
//   showDownPanel: false,
// })

addDecorator(story => (
  <Docs story={story} />
))

window.Perf = Perf

configure(() => require('../stories'), module);
