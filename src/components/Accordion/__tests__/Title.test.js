import React from 'react'
import { mount } from 'enzyme'
import Accordion from '../Accordion'
import Section from '../Section'
import Title, { classNameStrings as classNames } from '../Title'
import Keys from '../../../constants/Keys'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Title />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.baseComponentClassName)).toBe(true)
    expect(el.hasClass(classNames.isOpenClassName)).toBe(false)
    expect(el.hasClass(classNames.isPageClassName)).toBe(false)
    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeLgClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeMdClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeSmClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeXsClassName)).toBe(false)
  })

  test('Applies custom className if specified', () => {
    const className = 'kustom'
    const wrapper = mount(<Title className={className} />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(className)).toBe(true)
  })

  test('Applies a className to indicate that the Title is in an open section', () => {
    const wrapper = mount(
      <Section isOpen>
        <Title />
      </Section>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o.hasClass(classNames.isOpenClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Title is in a seamless accordion', () => {
    const wrapper = mount(
      <Accordion isSeamless>
        <Section>
          <Title />
        </Section>
      </Accordion>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o.hasClass(classNames.isSeamlessClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Title is in the specified size accordion', () => {
    ;['xs', 'sm', 'md', 'lg'].forEach(size => {
      const wrapper = mount(
        <Accordion size={size}>
          <Section>
            <Title />
          </Section>
        </Accordion>
      )
      const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
      expect(o.hasClass(`is-${size}`)).toBe(true)
    })

    const wrapper = mount(
      <Accordion size="xl">
        <Section>
          <Title />
        </Section>
      </Accordion>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o.hasClass('is-xl')).toBe(false)
  })

  test('Applies a className to indicate that the Title is in an Accordion embedded in a page', () => {
    const wrapper = mount(
      <Accordion isPage>
        <Section>
          <Title />
        </Section>
      </Accordion>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o.hasClass(classNames.isPageClassName)).toBe(true)
  })
})

describe('setOpen', () => {
  test('Attemps to open the section by uuid when clicked', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Section setOpen={spy}>
        <Title />
      </Section>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    const uuid = wrapper.state('uuid')
    o.simulate('click')
    expect(spy).toBeCalledWith(uuid, true)
  })

  test('Attempts to close the open section by uuid when clicked', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Section isOpen setOpen={spy}>
        <Title />
      </Section>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    const uuid = wrapper.state('uuid')
    o.simulate('click')
    expect(spy).toBeCalledWith(uuid, false)
  })

  test('Attempts to open the section by uuid when the enter or space key is pressed', () => {
    ;[Keys.ENTER, Keys.SPACE].forEach(keyCode => {
      const spy = jest.fn()
      const wrapper = mount(
        <Section setOpen={spy}>
          <Title />
        </Section>
      )
      const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
      const uuid = wrapper.state('uuid')
      o.simulate('keydown', { keyCode })
      expect(spy).toBeCalledWith(uuid, true)
    })
  })

  test('Attempts to close the open section by uuid when the enter or space key is pressed', () => {
    ;[Keys.ENTER, Keys.SPACE].forEach(keyCode => {
      const spy = jest.fn()
      const wrapper = mount(
        <Section isOpen setOpen={spy}>
          <Title />
        </Section>
      )
      const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
      const uuid = wrapper.state('uuid')
      o.simulate('keydown', { keyCode })
      expect(spy).toBeCalledWith(uuid, false)
    })
  })
})
