import React from 'react'
import { mount, shallow } from 'enzyme'
import Avatar from '..'

const classNames = {
  image: '.c-Avatar__photo',
  initials: '.c-Avatar__title'
}

describe('Name', () => {
  test('Uses the `initials` attribute if specified', () => {
    const wrapper = shallow(<Avatar name='Ron Burgandy' initials='XY' />)
    const title = wrapper.find(classNames.initials)

    expect(title.text()).toBe('XY')
  })

  test('Initializes first/last name to two letters', () => {
    const wrapper = shallow(<Avatar name='Ron Burgandy' />)
    const title = wrapper.find(classNames.initials)

    expect(title.text()).toBe('RB')
  })

  test('Initializes multi-word names to two letters', () => {
    const wrapper = shallow(<Avatar name='Buddy the Elf' />)
    const title = wrapper.find(classNames.initials)

    expect(title.text()).toBe('BE')
  })

  test('Initializes single names to one letters', () => {
    const wrapper = shallow(<Avatar name='Buddy' />)
    const title = wrapper.find(classNames.initials)

    expect(title.text()).toBe('B')
  })

  test('Can be overridden by count prop', () => {
    const wrapper = shallow(<Avatar name='Buddy' count='Elf' />)
    const title = wrapper.find(classNames.initials)

    expect(title.text()).toBe('Elf')
  })
})

describe('Image', () => {
  test('Has the correct className', () => {
    const wrapper = mount(<Avatar name='Buddy the Elf' image='buddy.jpg' />)
    const image = wrapper.find('.c-Avatar__image')

    expect(image.exists()).toBeTruthy()
  })

  test('Render image if image prop is specified', () => {
    const src = 'buddy.jpg'
    const wrapper = mount(<Avatar name='Buddy the Elf' image={src} />)
    const image = wrapper.find('.c-Avatar__image')

    expect(image.exists()).toBeTruthy()
    expect(image.prop('style').backgroundImage).toContain(src)
  })

  test('Rendered image should have name within', () => {
    const name = 'Buddy the Elf'
    const wrapper = mount(<Avatar name={name} image='buddy.jpg' />)
    const image = wrapper.find('.c-Avatar__image')

    expect(image.text()).toBe(name)
  })

  test('Replaces Initials with image', () => {
    const wrapper = mount(<Avatar name='Buddy the Elf' image='buddy.jpg' />)
    const initials = wrapper.find(classNames.initials)

    expect(initials.exists()).toBeFalsy()
  })
})

describe('ClassNames', () => {
  test('Accept classNames', () => {
    const wrapper = shallow(<Avatar name='Buddy' size='sm' className='not now arctic puffin' />)

    const classNames = wrapper.prop('className')

    expect(classNames).toContain('c-Avatar')
    expect(classNames).toContain('not')
    expect(classNames).toContain('now')
    expect(classNames).toContain('arctic')
    expect(classNames).toContain('puffin')
  })
})

describe('Border color', () => {
  test('Can apply borderColor', () => {
    const wrapper = shallow(<Avatar name='Buddy' borderColor='green' />)
    const crop = wrapper.find('.c-Avatar__crop')
    const style = crop.props().style

    expect(style).toBeTruthy()
    expect(style.border).toContain('px solid')
    expect(style.borderColor).toBe('green')
  })

  test('Does not have a border by default', () => {
    const wrapper = shallow(<Avatar name='Buddy' />)
    const crop = wrapper.find('.c-Avatar__crop')
    const style = crop.props().style

    expect(style).not.toBeTruthy()
  })
})

describe('Size', () => {
  test('Apply size classes', () => {
    const sm = shallow(<Avatar name='Buddy' size='sm' />)
    const lg = shallow(<Avatar name='Buddy' size='lg' />)

    expect(sm.prop('className')).toContain('is-sm')
    expect(lg.prop('className')).toContain('is-lg')
  })
})
