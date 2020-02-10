import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import Section from '../Page.Section'
import { PageContext } from '../Page'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Section />)

    expect(wrapper.getDOMNode().classList.contains('c-PageSection')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Section className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Can render child content', () => {
    const wrapper = mount(<Section>Channel 4</Section>)

    expect(wrapper.text()).toBe('Channel 4')
  })

  test('Can render child component', () => {
    const wrapper = mount(
      <Section>
        <div className="ron">Channel 4</div>
      </Section>
    )

    expect(wrapper.find('div.ron').length).toBe(1)
  })
})

describe('Responsive', () => {
  test('Renders responsive styles, if specified', () => {
    const wrapper = mount(
      <PageContext.Provider value={{ isResponsive: true }}>
        <Section />
      </PageContext.Provider>
    )

    expect(
      wrapper
        .find(Section)
        .getDOMNode()
        .classList.contains('is-responsive')
    ).toBe(true)
  })

  test('Does not render responsive styles, if specified', () => {
    const wrapper = mount(
      <PageContext.Provider value={{ isResponsive: false }}>
        <Section />
      </PageContext.Provider>
    )

    expect(
      wrapper
        .find(Section)
        .getDOMNode()
        .classList.contains('is-responsive')
    ).toBe(false)
  })
})
