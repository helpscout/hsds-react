import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import '../src/styles/blue.scss'
import {
  Avatar,
  Card,
  CardBlock,
  Heading,
  Image,
  Input,
  Link,
  LoadingDots,
  Overlay,
  Select,
  Text
} from '../src/index.js'

storiesOf('Avatar', module)
  .add('default', () => <Avatar name='Ron Burgundy' />)
  .add('sizes', () => (
    <div>
      <Avatar name='Ron Burgundy' size='lg' />
      <Avatar name='Ron Burgundy' size='md' />
      <Avatar name='Ron Burgundy' size='sm' />
    </div>
  ))

storiesOf('Card', module)
  .add('default', () => <Card>Hello</Card>)
  .add('link', () => <Card href='https://www.helpscout.net/'>Link to: https://www.helpscout.net/</Card>)
  .add('block', () => (
    <Card seamless>
      <CardBlock>Block One</CardBlock>
      <CardBlock>Block Two</CardBlock>
      <CardBlock>Block Three</CardBlock>
    </Card>
  ))

storiesOf('Image', module)
  .add('default', () => (
    <Image
      src='https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto'
      alt='Not now, Arctic Puffin!'
      title='Not now, Arctic Puffin!'
      width='300'
    />
  ))

storiesOf('Input', module)
  .add('default', () => <Input />)
  .add('multiline', () => <Input multiline placeholder='This is a textarea!' autoFocus />)
  .add('multiline + resizable', () => <Input multiline={3} resizable autoFocus placeholder='This is a resizable textarea!' />)
  .add('placeholder', () => <Input placeholder='Hello' autoFocus />)
  .add('prefix + suffix', () => <Input prefix='$' suffix='.00' autoFocus />)
  .add('seamless', () => <Input seamless autoFocus />)
  .add('disabled', () => <Input disabled autoFocus />)
  .add('states', () => (
    <div>
      <Input error autoFocus /><br />
      <Input success="You're Awesome!" autoFocus /><br />
      <Input warning autoFocus />
    </div>
  ))
  .add('sizes', () => (
    <div>
      <Input autoFocus placeholder='Regular' /><br />
      <Input size='sm' autoFocus placeholder='Small' />
    </div>
  ))

storiesOf('Heading', module)
  .add('default', () => <Heading>I am heading. Behold my heading.</Heading>)
  .add('sizes', () => (
    <div>
      <Heading size='h1'>Font size: h1</Heading><br />
      <Heading size='h2'>Font size: h2</Heading><br />
      <Heading size='h3'>Font size: h3</Heading><br />
      <Heading size='h4'>Font size: h4</Heading><br />
      <Heading size='h5'>Font size: h5</Heading><br />
      <Heading size='h6'>Font size: h6</Heading><br />
      <Heading size='big'>Font size: Big</Heading><br />
      <Heading size='small'>Font size: Small</Heading><br />
    </div>
  ))
  .add('shades', () => (
    <div>
      <Heading size='small'>Small Heading Dark</Heading><br />
      <Heading size='small' light>Small Heading Light</Heading><br />
    </div>
  ))

storiesOf('Link', module)
  .add('default', () => <Link href='https://github.com/helpscout/blue'>Linky</Link>)

storiesOf('LoadingDots', module)
  .add('default', () => <LoadingDots />)

storiesOf('Overlay', module)
  .add('default', () => (
    <Overlay style={{width: '500px', height: '400px' }} onClick={action('Overlay clicked')}>
      <Card>
        Not now, Arctic Puffin!
      </Card>
    </Overlay>
))

storiesOf('Select', module)
  .add('default', () => (
    <Select options={['one', 'two', 'three']} />
  ))
  .add('groups', () => {
    const options = [
      {
        title: 'Group 1',
        value: [
          'one', 'two', 'three'
        ]
      },
      {
        title: 'Group 2',
        value: [
          'four', 'five', 'six', 'seven'
        ]
      }
    ]
    return (
      <Select options={options} onChange={action('value')} value='five' />
    )
  })
  .add('placeholder', () => (
    <Select placeholder='Select one' options={['one', 'two', 'three']} />
  ))
  .add('prefix', () => (
    <Select prefix='Filter by: ' options={['One']} />
  ))
  .add('states', () => (
    <div>
      <Select error /><br />
      <Select success /><br />
      <Select warning />
    </div>
  ))
  .add('sizes', () => (
    <div>
      <Select autoFocus placeholder='Regular' /><br />
      <Select size='sm' autoFocus placeholder='Small' />
    </div>
  ))

storiesOf('Text', module)
  .add('default', () => <Text>I am text. Behold my text.</Text>)
  .add('sizes', () => (
    <div>
      <Text size='48'>Font size: 48</Text><br />
      <Text size='20'>Font size: 20</Text><br />
      <Text size='16'>Font size: 16</Text><br />
      <Text size='15'>Font size: 15</Text><br />
      <Text size='14'>Font size: 14</Text><br />
      <Text size='13'>Font size: 13</Text><br />
      <Text size='12'>Font size: 12</Text><br />
      <Text size='11'>Font size: 11</Text><br />
    </div>
  ))
  .add('shades', () => (
    <div>
      <Text>Default</Text><br />
      <Text subtle>Subtle</Text><br />
      <Text muted>Muted</Text><br />
      <Text faint>Faint</Text><br />
    </div>
  ))
  .add('states', () => (
    <div>
      <Text>Default</Text><br />
      <Text error>Error</Text><br />
      <Text success>Success</Text><br />
      <Text warning>Warning</Text><br />
    </div>
  ))
  .add('truncate', () => (
    <div>
      <Text truncate>Buddy (Will Ferrell) was accidentally transported to the North Pole as a toddler and raised to adulthood among Santa's elves. Unable to shake the feeling that he doesn't fit in, the adult Buddy travels to New York, in full elf uniform, in search of his real father.</Text>
    </div>
  ))
