import React from 'react'
import { mount } from 'enzyme'
import { createSpec, faker } from '@helpscout/helix'
import { Card, Text } from '../../../index'

test('Renders fixture data into Blue component', () => {
  const fixture = createSpec({
    id: faker.datatype.uuid(),
    name: faker.fake('{{name.firstName}} {{name.lastName}}'),
    text: faker.lorem.sentence(),
  }).generate()

  const wrapper = mount(
    <Card id={fixture.id}>
      <Text className="name" muted>
        {fixture.name} said…
      </Text>
      <br />
      <Text className="message">"{fixture.text}"</Text>
    </Card>
  )

  const name = wrapper.find('.name').first()
  const message = wrapper.find('.message').first()

  expect(wrapper.props().id).toBe(fixture.id)
  expect(name.props().children).toContain(fixture.name)
  expect(message.props().children).toContain(fixture.text)
})
