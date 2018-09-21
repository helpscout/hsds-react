import React from 'react'
import { mount } from 'enzyme'
import Accordion from '../Accordion'
import Section, { classNameStrings as classNames } from '../Section'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Section />)
    expect(wrapper.hasClass(classNames.baseComponentClassName)).toBe(true)
    expect(wrapper.hasClass(classNames.isOpenClassName)).toBe(false)
    expect(wrapper.hasClass(classNames.isSeamlessClassName)).toBe(false)
  })

  test('Applies custom className if specified', () => {
    const className = 'kustom'
    const wrapper = mount(<Section className={className} />)
    expect(wrapper.hasClass(className)).toBe(true)
  })

  test('Applies a className to indicate that the Section is open', () => {
    const wrapper = mount(<Section isOpen />)
    expect(wrapper.hasClass(classNames.isOpenClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Section is in a seamless Accordion', () => {
    const wrapper = mount(
      <Accordion isSeamless>
        <Section />
      </Accordion>
    )
    expect(wrapper.hasClass(classNames.isSeamlessClassName)).toBe(true)
  })
})

describe('Uuid', () => {
  test('Has a unique id', () => {
    const wrapper1 = mount(<Section />)
    const uuid1 = wrapper1.state('uuid')
    const wrapper2 = mount(<Section />)
    const uuid2 = wrapper2.state('uuid')

    expect(uuid1).toContain('AccordionSection')
    expect(uuid2).toContain('AccordionSection')
    expect(uuid1).not.toEqual(uuid2)
  })
})

describe('isOpen', () => {
  test('Determines if it is open if sections includes itself', () => {
    const wrapper = mount(<Section />)
    const uuid = wrapper.state('uuid')
    expect(wrapper.hasClass(classNames.isOpenClassName)).toBe(false)
    wrapper.setProps({ sections: { [uuid]: true } })
    expect(wrapper.hasClass(classNames.isOpenClassName)).toBe(true)
  })
})
