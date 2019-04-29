import React from 'react'
import { mount } from 'enzyme'
import SideNavigation from '../SideNavigation'
import FadeInOut from '../FadeInOut'
import { SectionHeadingUI, SectionUI } from '../SideNavigation.css'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<SideNavigation.Section />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SideNavigation__Section')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<SideNavigation.Section className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })

  test('Applies withPadding classname', () => {
    const wrapper = mount(<SideNavigation.Section withPadding={true} />)

    expect(
      wrapper.getDOMNode().classList.contains('is-with-padding')
    ).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <SideNavigation.Section>
        <div className="child">Hello</div>
      </SideNavigation.Section>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })

  test('Wrap section title with FadeInOut', () => {
    const wrapper = mount(<SideNavigation.Section title="Hello" />)
    const el = wrapper.find(FadeInOut)

    expect(el.text()).toContain('Hello')
  })
})

describe('Heading', () => {
  test('Renders heading component', () => {
    const title = 'Folders'
    const wrapper = mount(<SideNavigation.Section title={title} />)
    const el = wrapper.find(SectionHeadingUI)

    expect(el.text()).toContain(title)
  })
})
