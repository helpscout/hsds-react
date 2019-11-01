import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import { Truncate } from '../src/index'

const fixture = createSpec(faker.lorem.paragraph())

const stories = storiesOf('Truncate', module)
const limit = 10

stories.add('default', () => (
  <div>
    <p>
      Auto:
      <br />
      <Truncate>{fixture.generate()}</Truncate>
    </p>
    <p>
      Start:
      <br />
      <Truncate type="start" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      Middle:
      <br />
      <Truncate type="middle" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      End:
      <br />
      <Truncate type="end" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      Truncate by Splitter - resize display window:
      <br />
      <Truncate splitter="@">a@hello.com</Truncate>
      <Truncate splitter="@">art_vandelay@vandelayindustries.com</Truncate>
      <Truncate splitter="@">john_locke@dharma.org</Truncate>
      <Truncate splitter="@">pennypacker@kramerica.com</Truncate>
      <Truncate splitter="@">this_is_kind_of_long@annoyingemails.com</Truncate>
      <Truncate splitter="@">
        this_is_kind_of_long@evenmoreannoyingemails.com
      </Truncate>
    </p>
    <br />
  </div>
))

stories.add('tooltip', () => (
  <div>
    <p>
      Auto:
      <br />
      <Truncate showTooltipOnTruncate>{fixture.generate()}</Truncate>
    </p>
    <p>
      Start:
      <br />
      <Truncate showTooltipOnTruncate type="start" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      Middle:
      <br />
      <Truncate showTooltipOnTruncate type="middle" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      End:
      <br />
      <Truncate showTooltipOnTruncate type="end" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      Truncate by Splitter - resize display window:
      <br />
      <Truncate showTooltipOnTruncate splitter="@">
        longemailaddress@gmail.com
      </Truncate>
    </p>
    <br />
  </div>
))
