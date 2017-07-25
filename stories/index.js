import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../src/styles/blue.scss';
import {
  Avatar,
  Card,
  CardBlock,
  Heading,
  Input,
  LoadingDots,
  Text,
} from '../src/index.js';

storiesOf('Avatar', module)
  .add('default', () => <Avatar name="Maxi Power" />)
  .add('sizes', () => (
    <div>
      <Avatar name="Maxi Power" size="lg" />
      <Avatar name="Maxi Power" size="md" />
      <Avatar name="Maxi Power" size="sm" />
    </div>
  ))

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
  .add('multiline', () => <Input multiline placeholder="This is a textarea!" autoFocus />)
  .add('multiline + resizable', () => <Input multiline={3} resizable autoFocus placeholder="This is a resizable textarea!" />)
  .add('placeholder', () => <Input placeholder="Hello" autoFocus />)
  .add('prefix + suffix', () => <Input prefix="$" suffix=".00" autoFocus />)
  .add('seamless', () => <Input seamless autoFocus />)
  .add('disabled', () => <Input disabled autoFocus />)
  .add('error', () => <Input error autoFocus />)
  .add('success', () => <Input success="You're Awesome!" autoFocus />)
  .add('warning', () => <Input warning autoFocus />)
  .add('small', () => <Input size="sm" autoFocus />)

storiesOf('Heading', module)
  .add('default', () => <Heading>I am heading. Behold my heading.</Heading>)
  .add('sizes', () => (
    <div>
      <Heading size="h1">Font size: h1</Heading><br />
      <Heading size="h2">Font size: h2</Heading><br />
      <Heading size="h3">Font size: h3</Heading><br />
      <Heading size="h4">Font size: h4</Heading><br />
      <Heading size="h5">Font size: h5</Heading><br />
      <Heading size="h6">Font size: h6</Heading><br />
      <Heading size="big">Font size: Big</Heading><br />
      <Heading size="small">Font size: Small</Heading><br />
    </div>
  ))
  .add('shades', () => (
    <div>
      <Heading size="small">Small Heading Dark</Heading><br />
      <Heading size="small" light>Small Heading Light</Heading><br />
    </div>
  ))

storiesOf('LoadingDots', module)
  .add('default', () => <LoadingDots />)

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