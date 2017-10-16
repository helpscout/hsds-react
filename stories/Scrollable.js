import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Card,
  Image,
  Scrollable
} from '../src/index.js'

const stories = storiesOf('Scrollable', module)

stories.add('default', () => (
  <Card style={{height: 400}} seamless>
    <Scrollable>
      <Image
        src='https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto'
        alt='Not now, Arctic Puffin!'
        title='Not now, Arctic Puffin!'
      />
    </Scrollable>
  </Card>
))
