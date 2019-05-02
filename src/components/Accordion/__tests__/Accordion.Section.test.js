import * as React from 'react'
import { mount } from 'enzyme'
import Accordion from '../Accordion'
import Section, {
  SectionWithUuid,
  classNameStrings as classNames,
} from '../Accordion.Section'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Section />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.baseComponentClassName)).toBe(true)
    expect(el.hasClass(classNames.isOpenClassName)).toBe(false)
    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(false)
  })

  test('Applies custom className if specified', () => {
    const className = 'kustom'
    const wrapper = mount(<Section className={className} />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(className)).toBe(true)
  })

  test('Applies a className to indicate that the Section is open', () => {
    const wrapper = mount(<Section isOpen />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isOpenClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Section is in a seamless Accordion', () => {
    const wrapper = mount(
      <Accordion isSeamless>
        <Section />
      </Accordion>
    )
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(true)
  })
})

describe('Uuid', () => {
  test('Has a unique id', () => {
    const wrapper1 = mount(<SectionWithUuid />)
    const uuid1 = wrapper1.state('uuid')
    const wrapper2 = mount(<SectionWithUuid />)
    const uuid2 = wrapper2.state('uuid')

    expect(uuid1).toContain('AccordionSection')
    expect(uuid2).toContain('AccordionSection')
    expect(uuid1).not.toEqual(uuid2)
  })
})

describe('isOpen', () => {
  test('Determines if it is open if sections includes its uuid', () => {
    const wrapper = mount(<SectionWithUuid />)
    const uuid = wrapper.state('uuid')
    let el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isOpenClassName)).toBe(false)

    wrapper.setProps({ sections: { [uuid]: true } })

    el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isOpenClassName)).toBe(true)
  })

  test('Determines if it is open if sections includes its id', () => {
    const wrapper = mount(<SectionWithUuid id="7" />)
    let el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isOpenClassName)).toBe(false)

    wrapper.setProps({ sections: { '7': true } })

    el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isOpenClassName)).toBe(true)
  })
})

describe('isOpen', () => {
  test('Renders open styles, if defined', () => {
    const wrapper = mount(<SectionWithUuid isOpen={true} />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass('is-open')).toBeTruthy()
  })

  test('Always render non-open styles, if isLink', () => {
    const wrapper = mount(<SectionWithUuid isLink={true} isOpen={true} />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass('is-open')).toBeFalsy()
  })
})
