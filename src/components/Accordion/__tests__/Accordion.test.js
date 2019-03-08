import React from 'react'
import { mount } from 'enzyme'
import { Accordion, classNameStrings as classNames } from '../Accordion'
import Section, {
  classNameStrings as sectionClassNames,
} from '../Accordion.Section'
import Title, { classNameStrings as titleClassNames } from '../Accordion.Title'
import Body, { classNameStrings as bodyClassNames } from '../Accordion.Body'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Accordion />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.length).toBe(1)
    expect(el.hasClass(classNames.isAllowMulipleClassName)).toBe(false)
    expect(el.hasClass(classNames.isPageClassName)).toBe(false)
    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(false)
  })

  test('Applies custom className if specified', () => {
    const className = 'kustom'
    const wrapper = mount(<Accordion className={className} />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(className)).toBe(true)
  })

  test(`Applies a className to indicate that the Accordion allows multiple
        sections to be open simultaneously`, () => {
    const wrapper = mount(<Accordion allowMultiple />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isAllowMultipleClassName)).toBe(true)
  })

  test(`Applies a className to indicate that the Accordion is mounted inside
        of a Page component`, () => {
    const wrapper = mount(<Accordion isPage />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isPageClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Accordion is seamless', () => {
    const wrapper = mount(<Accordion isSeamless />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(true)
  })
})

describe('Content', () => {
  test('Can render child component', () => {
    const wrapper = mount(
      <Accordion>
        <Section />
      </Accordion>
    )
    expect(
      wrapper.find(`div.${sectionClassNames.baseComponentClassName}`)
    ).toHaveLength(1)
  })

  test('Can render multiple child components', () => {
    const wrapper = mount(
      <Accordion>
        <Section />
        <Section />
        <Section />
      </Accordion>
    )
    expect(
      wrapper.find(`div.${sectionClassNames.baseComponentClassName}`)
    ).toHaveLength(3)
  })

  test('Can render sub-components', () => {
    const wrapper = mount(
      <Accordion duration={0}>
        <Section isOpen>
          <Title />
          <Body />
        </Section>
      </Accordion>
    )
    expect(
      wrapper.find(`div.${sectionClassNames.baseComponentClassName}`)
    ).toHaveLength(1)
    expect(
      wrapper.find(`div.${titleClassNames.baseComponentClassName}`)
    ).toHaveLength(1)
    expect(
      wrapper.find(`div.${bodyClassNames.baseComponentClassName}`)
    ).toHaveLength(1)
  })
})

describe('State', () => {
  test('It should only track the value of one section if allow multiple is not enabled', () => {
    const wrapper = mount(<Accordion />)
    const instance = wrapper.instance()
    expect(wrapper.state('sections')).toEqual({})
    instance.setOpen('123', true)
    expect(wrapper.state('sections')).toEqual({ '123': true })
    instance.setOpen('456', true)
    expect(wrapper.state('sections')).toEqual({ '456': true })
  })

  test('It should track the value of multiple sections if allow multiple is enabled', () => {
    const wrapper = mount(<Accordion allowMultiple />)
    const instance = wrapper.instance()
    expect(wrapper.state('sections')).toEqual({})
    instance.setOpen('123', true)
    expect(wrapper.state('sections')).toEqual({ '123': true })
    instance.setOpen('456', true)
    expect(wrapper.state('sections')).toEqual({ '123': true, '456': true })
  })

  test('It should track the value of all programatically opened sections', () => {
    const wrapper = mount(<Accordion openSectionIds={[1, 2]} />)
    expect(wrapper.state('sections')).toEqual({ 1: true, 2: true })
    wrapper.setProps({ openSectionIds: [4, 5, 6] })
    expect(wrapper.state('sections')).toEqual({ 4: true, 5: true, 6: true })
    wrapper.setProps({ openSectionIds: [] })
    expect(wrapper.state('sections')).toEqual({})
  })
})

describe('forceSetOpen', () => {
  test('It should invoke forceSetOpen if the openSectionIds change', () => {
    const wrapper = mount(<Accordion openSectionIds={[1, 2]} />)
    const instance = wrapper.instance()
    const spy = jest.spyOn(instance, 'forceSetOpen')
    wrapper.setProps({ openSectionIds: [3, 4] })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('It should not invoke forceSetOpen if the openSectionIds did not change', () => {
    const wrapper = mount(<Accordion openSectionIds={[1, 2]} />)
    const instance = wrapper.instance()
    const spy = jest.spyOn(instance, 'forceSetOpen')
    wrapper.setProps({ size: 'lg' })
    expect(spy).not.toHaveBeenCalled()
  })
})

describe('onOpen', () => {
  test('It should pass an array of open section ids as the second argument to the callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Accordion onOpen={spy} openSectionIds={[1, 2]} />)
    const instance = wrapper.instance()
    instance.onOpen(1)
    expect(spy).toHaveBeenCalledWith(1, ['1', '2'])
    wrapper.setState({ sections: { 6: true, 7: false } })
    instance.onOpen(1)
    expect(spy).toHaveBeenCalledWith(1, ['6'])
  })
})

describe('onClose', () => {
  test('It should pass an array of open section ids as the second argument to the callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Accordion onClose={spy} openSectionIds={[1, 2]} />)
    const instance = wrapper.instance()
    instance.onClose(1)
    expect(spy).toHaveBeenCalledWith(1, ['1', '2'])
    wrapper.setProps({ openSectionIds: [6] })
    instance.onClose(1)
    expect(spy).toHaveBeenCalledWith(1, ['6'])
  })
})
