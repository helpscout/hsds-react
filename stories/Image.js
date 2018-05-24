import React from 'react'
import { storiesOf } from '@storybook/react'
import { Image } from '../src/index.js'

storiesOf('Image', module).add('default', () => (
  <Image
    src="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
    alt="Not now, Arctic Puffin!"
    title="Not now, Arctic Puffin!"
    width="300"
  />
))
