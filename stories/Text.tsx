import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Text } from '../src/components/index'

storiesOf('Text', module)
  .add('default', () => <Text>I am text. Behold my text.</Text>)
  .add('sizes', () => (
    <div>
      <Text size="48">Font size: 48</Text>
      <br />
      <Text size="20">Font size: 20</Text>
      <br />
      <Text size="16">Font size: 16</Text>
      <br />
      <Text size="15">Font size: 15</Text>
      <br />
      <Text size="14">Font size: 14</Text>
      <br />
      <Text size="13">Font size: 13</Text>
      <br />
      <Text size="12">Font size: 12</Text>
      <br />
      <Text size="11">Font size: 11</Text>
      <br />
    </div>
  ))
  .add('shades', () => (
    <div>
      <Text>Default</Text>
      <br />
      <Text subtle>Subtle</Text>
      <br />
      <Text muted>Muted</Text>
      <br />
      <Text faint>Faint</Text>
      <br />
    </div>
  ))
  .add('states', () => (
    <div>
      <Text>Default</Text>
      <br />
      <Text state="error">Error</Text>
      <br />
      <Text state="success">Success</Text>
      <br />
      <Text state="warning">Warning</Text>
      <br />
    </div>
  ))
  .add('weights', () => (
    <div>
      <Text weight={900}>Font weight: 900</Text>
      <br />
      <Text weight={800}>Font weight: 800</Text>
      <br />
      <Text weight={700}>Font weight: 700</Text>
      <br />
      <Text weight={600}>Font weight: 600</Text>
      <br />
      <Text weight={500}>Font weight: 500</Text>
      <br />
      <Text weight={400}>Font weight: 400</Text>
      <br />
      <Text weight={300}>Font weight: 300</Text>
      <br />
      <Text weight={200}>Font weight: 200</Text>
      <br />
      <Text weight={100}>Font weight: 100</Text>
      <br />
    </div>
  ))
  .add('truncate', () => (
    <div>
      <Text truncate>
        Buddy (Will Ferrell) was accidentally transported to the North Pole as a
        toddler and raised to adulthood among Santa's elves. Unable to shake the
        feeling that he doesn't fit in, the adult Buddy travels to New York, in
        full elf uniform, in search of his real father.
      </Text>
    </div>
  ))
