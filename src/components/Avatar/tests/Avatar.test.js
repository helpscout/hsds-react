import React from 'react'
import { mount, shallow } from 'enzyme'
import Avatar from '..'

const classNames = {
  image: '.c-Avatar__photo',
  initials: '.c-Avatar__title',
};

describe('Name', () => {
  test('Initializes first/last name to two letters', () => {
    const wrapper = shallow(<Avatar name="Ron Burgandy" />)
    const title = wrapper.find(classNames.initials)

    expect(title.text()).toBe('RB')
  })

  test('Initializes multi-word names to two letters', () => {
    const wrapper = shallow(<Avatar name="Buddy the Elf" />)
    const title = wrapper.find(classNames.initials)

    expect(title.text()).toBe('BE')
  })

  test('Initializes single names to one letters', () => {
    const wrapper = shallow(<Avatar name="Buddy" />)
    const title = wrapper.find(classNames.initials)

    expect(title.text()).toBe('B')
  })
})

describe('Image', () => {
  test('Render image if image prop is specified', () => {
    const src = 'buddy.jpg'
    const wrapper = mount(<Avatar name="Buddy the Elf" image={src} />)
    const image = wrapper.find('img')

    expect(image.exists()).toBeTruthy()
    expect(image.prop('src')).toBe(src)
  })

  test('Rendered image should have correct alt/title attributes', () => {
    const name = 'Buddy the Elf'
    const wrapper = mount(<Avatar name={name} image="buddy.jpg" />)
    const image = wrapper.find('img')

    expect(image.prop('alt')).toBe(name)
    expect(image.prop('title')).toBe(name)
  })

  test('Has the correct className', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" image="buddy.jpg" />)
    const image = wrapper.find('img')
    
    expect(image.prop('className')).toContain('c-Avatar__photo')
  })

  test('Replaces Initials with image', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" image="buddy.jpg" />)
    const initials = wrapper.find(classNames.initials)

    expect(initials.exists()).toBeFalsy()
  })

  test('Use "title" prop as alt/title for img, if specified', () => {
    const title = 'SANTAAAAAA'
    const wrapper = mount(<Avatar name="Buddy the Elf" image="buddy.jpg" title={title} />)
    const image = wrapper.find('img')

    expect(image.prop('alt')).toBe(title)
    expect(image.prop('title')).toBe(title)
  })
})

describe('ClassNames', () => {
  test('Accept classNames', () => {
    const wrapper = shallow(<Avatar name="Buddy" size="sm" className="not now arctic puffin" />)

    const classNames = wrapper.prop('className')

    expect(classNames).toContain('c-Avatar')
    expect(classNames).toContain('not')
    expect(classNames).toContain('now')
    expect(classNames).toContain('arctic')
    expect(classNames).toContain('puffin')
  })
})

describe('Size', () => {
  test('Apply size classes', () => {
    const sm = shallow(<Avatar name="Buddy" size="sm" />)
    const lg = shallow(<Avatar name="Buddy" size="lg" />)

    expect(sm.prop('className')).toContain('is-sm')
    expect(lg.prop('className')).toContain('is-lg')
  })
})
