import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../src/styles/blue.scss';
import {
  Card,
  CardBlock,
  Input,
  Text,
  Textarea,
} from '../src/index.js';

storiesOf('Card', module)
  .add('default', () => <Card>Hello</Card>)
  .add('link', () => <Card href="https://www.helpscout.net/">Link to: https://www.helpscout.net/</Card>)
  .add('block', () => (
    <Card seamless>
      <CardBlock>Block One</CardBlock>
      <CardBlock>Block Two</CardBlock>
      <CardBlock>Block Three</CardBlock>
    </Card>
  ))

storiesOf('Input', module)
  .add('default', () => <Input />)
  .add('placeholder', () => <Input placeholder="Hello" autoFocus />)
  .add('prefix + suffix', () => <Input prefix="$" suffix=".00" autoFocus />)
  .add('seamless', () => <Input seamless autoFocus />)
  .add('disabled', () => <Input disabled autoFocus />)
  .add('error', () => <Input error autoFocus />)
  .add('success', () => <Input success="You're Awesome!" autoFocus />)
  .add('warning', () => <Input warning autoFocus />)
  .add('small', () => <Input size="sm" autoFocus />)

storiesOf('Text', module)
  .add('default', () => <Text>I am text. Behold my text.</Text>)
  .add('sizes', () => (
    <div>
      <Text size="48">Font size: 48</Text><br />
      <Text size="20">Font size: 20</Text><br />
      <Text size="16">Font size: 16</Text><br />
      <Text size="15">Font size: 15</Text><br />
      <Text size="14">Font size: 14</Text><br />
      <Text size="13">Font size: 13</Text><br />
      <Text size="12">Font size: 12</Text><br />
      <Text size="11">Font size: 11</Text><br />
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
      <Text truncate>Woody (Tom Hanks), a good-hearted cowboy doll who belongs to a young boy named Andy (John Morris), sees his position as Andy's favorite toy jeopardized when his parents buy him a Buzz Lightyear (Tim Allen) action figure.</Text>
    </div>
  ))

storiesOf('Textarea', module)
  .add('default', () => <Textarea />)
  .add('placeholder', () => <Textarea placeholder="Hello" autoFocus />)
