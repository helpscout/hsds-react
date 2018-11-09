import React from 'react'
import { mount } from 'enzyme'
import Card from '../Card'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Card />)

    expect(wrapper.getDOMNode().classList.contains('c-PageCard')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Card className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Can render child content', () => {
    const wrapper = mount(<Card>Channel 4</Card>)

    expect(wrapper.text()).toBe('Channel 4')
  })

  test('Can render child component', () => {
    const wrapper = mount(
      <Card>
        <div className="ron">Channel 4</div>
      </Card>
    )

    expect(wrapper.find('div.ron').length).toBe(1)
  })
})

describe('Responsive', () => {
  test('Renders responsive styles, if specified', () => {
    const wrapper = mount(<Card isResponsive={true} />)

    expect(wrapper.getDOMNode().classList.contains('is-responsive')).toBe(true)
  })

  test('Does not render responsive styles, if specified', () => {
    const wrapper = mount(<Card isResponsive={false} />)

    expect(wrapper.getDOMNode().classList.contains('is-responsive')).toBe(false)
  })
})
