import React from 'react'
import { mount } from 'enzyme'
import Page from '../Page'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Page />)

    expect(wrapper.hasClass('c-Page')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Page className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Can render child content', () => {
    const wrapper = mount(<Page>Channel 4</Page>)

    expect(wrapper.text()).toBe('Channel 4')
  })

  test('Can render child component', () => {
    const wrapper = mount(
      <Page>
        <div className="ron">Channel 4</div>
      </Page>
    )

    expect(wrapper.find('div.ron').length).toBe(1)
  })
})

describe('Sub-components', () => {
  test('Can render sub-components', () => {
    const wrapper = mount(
      <Page>
        <Page.Card>
          <Page.Header />
        </Page.Card>
        <Page.Actions />
      </Page>
    )

    expect(wrapper.find('Card').length).toBe(1)
    expect(wrapper.find('Header').length).toBe(1)
    expect(wrapper.find('Actions').length).toBe(1)
  })
})
