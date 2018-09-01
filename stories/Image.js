import React from 'react'
import { storiesOf } from '@storybook/react'
import { Image } from '../src/index.js'

storiesOf('Image', module)
  .add('default', () => (
    <Image
      src="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
      alt="Not now, Arctic Puffin!"
      title="Not now, Arctic Puffin!"
      width="300"
    />
  ))
  .add('with aspec ratio fit', () => (
    <Image
      src="https://picsum.photos/360/360"
      alt="Not now, Arctic Puffin!"
      title="Not now, Arctic Puffin!"
      maxHeight="260"
      maxWidth="260"
      height="360"
      width="360"
    />
  ))
  .add('without aspect ratio fit', () => (
    <Image
      src="https://picsum.photos/160/160"
      alt="Not now, Articic Puffin!"
      title="Not now, Artic Puffin!"
      maxHeight="260"
      maxWidth="260"
      height="160"
      width="160"
    />
  ))
