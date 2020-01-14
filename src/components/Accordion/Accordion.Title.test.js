import React from 'react'
import { cy } from '@helpscout/cyan'
import { mount } from 'enzyme'
import Accordion, { AccordionContext } from './Accordion'
import Section, { SectionContext } from './Accordion.Section'
import Title, { classNameStrings as classNames } from './Accordion.Title'
import Keys from '../../constants/Keys'

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
  test('Attempts to open the section by uuid when clicked', () => {
    const spy = jest.fn()
    const uuid = 'test'
    const wrapper = mount(
      <AccordionContext.Provider value={{ setOpen: spy }}>
        <Section>
          <SectionContext.Provider value={{ uuid, isOpen: false }}>
            <Title />
          </SectionContext.Provider>
        </Section>
      </AccordionContext.Provider>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)

    o.simulate('click')

    expect(spy).toBeCalledWith(uuid, true)
  })

  test('Attempts to close the open section by uuid when clicked', () => {
    // here
    const spy = jest.fn()
    const uuid = 'test'
    const wrapper = mount(
      <AccordionContext.Provider value={{ setOpen: spy }}>
        <Section>
          <SectionContext.Provider value={{ uuid, isOpen: true }}>
            <Title />
          </SectionContext.Provider>
        </Section>
      </AccordionContext.Provider>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)

    o.simulate('click')
    expect(spy).toBeCalledWith(uuid, false)
  })

  test('Attempts to open the section by uuid when the enter or space key is pressed', () => {
    // here
    ;[Keys.ENTER, Keys.SPACE].forEach(keyCode => {
      const spy = jest.fn()
      const uuid = 'test'
      const wrapper = mount(
        <AccordionContext.Provider value={{ setOpen: spy }}>
          <Section>
            <SectionContext.Provider value={{ uuid, isOpen: false }}>
              <Title />
            </SectionContext.Provider>
          </Section>
        </AccordionContext.Provider>
      )
      const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
      o.simulate('keydown', { keyCode })
      expect(spy).toBeCalledWith(uuid, true)
    })
  })

  test('Attempts to close the open section by uuid when the enter or space key is pressed', () => {
    // here
    ;[Keys.ENTER, Keys.SPACE].forEach(keyCode => {
      const spy = jest.fn()
      const uuid = 'test'
      const wrapper = mount(
        <AccordionContext.Provider value={{ setOpen: spy }}>
          <Section>
            <SectionContext.Provider value={{ uuid, isOpen: true }}>
              <Title />
            </SectionContext.Provider>
          </Section>
        </AccordionContext.Provider>
      )
      const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
      o.simulate('keydown', { keyCode })
      expect(spy).toBeCalledWith(uuid, false)
    })
  })
})

describe('Link', () => {
  test('Renders a link, if to is defined', () => {
    const wrapper = mount(
      <SectionContext.Provider value={{ isOpen: true }}>
        <Title to="/" />
      </SectionContext.Provider>
    )
    const el = wrapper.find(`a.${classNames.baseComponentClassName}`)

    expect(el.hasClass('is-link')).toBeTruthy()
  })

  test('Renders a link, if href is defined', () => {
    const wrapper = mount(
      <SectionContext.Provider value={{ isOpen: true }}>
        <Title href="/" />
      </SectionContext.Provider>
    )
    const el = wrapper.find(`a.${classNames.baseComponentClassName}`)

    expect(el.hasClass('is-link')).toBeTruthy()
  })

  test('Adjusts caret size, if link', () => {
    const wrapper = mount(<Title />)
    let icon = wrapper.find('Icon').first()

    expect(icon.prop('size')).toBe(14)

    wrapper.setProps({ href: '/' })
    icon = wrapper.find('Icon').first()

    expect(icon.prop('size')).toBe(14)
  })
})

describe('isOpen', () => {
  test('Renders open styles, if defined', () => {
    const wrapper = mount(
      <SectionContext.Provider value={{ isOpen: true }}>
        <Title />
      </SectionContext.Provider>
    )
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass('is-open')).toBeTruthy()
  })

  test('Always render non-open styles, if isLink', () => {
    const wrapper = mount(
      <SectionContext.Provider value={{ isOpen: true }}>
        <Title to="/" />
      </SectionContext.Provider>
    )
    const el = wrapper.find(`a.${classNames.baseComponentClassName}`)

    expect(el.hasClass('is-open')).toBeFalsy()
  })
})

describe('Events', () => {
  test('onClick callback works', () => {
    const spy = jest.fn()
    const wrapper = cy.render(<Title onClick={spy} />)

    wrapper.click()

    expect(spy).toHaveBeenCalled()
  })

  test('onClick callback works for links', () => {
    const spy = jest.fn()
    const wrapper = cy.render(<Title onClick={spy} to="/" />)

    wrapper.click()

    expect(spy).toHaveBeenCalled()
  })
})
