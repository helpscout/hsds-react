import React from 'react'
import { mount, shallow } from 'enzyme'
import Avatar from '..'
import { StatusDot } from '../../index'

const classNames = {
  root: '.c-Avatar',
  crop: '.c-Avatar__crop',
  image: '.c-Avatar__image',
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

  test('Sets `title` attribute to the `name`', () => {
    const wrapper = shallow(<Avatar name='Bobby McGee' />)
    const root = wrapper.find(classNames.root)
    expect(root.prop('title')).toBe('Bobby McGee')
  })
})

describe('Image', () => {
  test('Has the correct className', () => {
    const wrapper = mount(<Avatar name='Buddy the Elf' image='buddy.jpg' />)
    const image = wrapper.find(classNames.image)

    expect(image.exists()).toBeTruthy()
  })

  test('Background is transparent to prevent flash of color before image loads', () => {
    const wrapper = mount(<Avatar name='Buddy the Elf' image='buddy.jpg' />)
    const crop = wrapper.find(classNames.crop)

    expect(crop.exists()).toBeTruthy()
    expect(crop.prop('style').backgroundColor).toEqual('transparent')
  })

  test('Render image if image prop is specified', () => {
    const src = 'buddy.jpg'
    const wrapper = mount(<Avatar name='Buddy the Elf' image={src} />)
    const image = wrapper.find(classNames.image)

    expect(image.exists()).toBeTruthy()
    expect(image.prop('style').backgroundImage).toContain(src)
  })

  test('Rendered image should have name within', () => {
    const name = 'Buddy the Elf'
    const wrapper = mount(<Avatar name={name} image='buddy.jpg' />)
    const image = wrapper.find(classNames.image)

    expect(image.text()).toBe(name)
  })

  test('Replaces Initials with image', () => {
    const wrapper = mount(<Avatar name='Buddy the Elf' image='buddy.jpg' />)
    const initials = wrapper.find(classNames.initials)

    expect(initials.exists()).toBeFalsy()
  })

  test('Replaces image with initials on error', () => {
    const wrapper = mount(<Avatar name='Buddy the Elf' image='buddy.jpg' />)
    wrapper.find('img').first().simulate('error')

    const initials = wrapper.find(classNames.initials)
    const image = wrapper.find(classNames.image)

    expect(initials.exists()).toBeTruthy()
    expect(image.exists()).toBeFalsy()
  })

  test('Background style is unset on error', () => {
    const wrapper = mount(<Avatar name='Buddy the Elf' image='buddy.jpg' />)
    wrapper.find('img').first().simulate('error')

    const crop = wrapper.find(classNames.crop)

    expect(crop.prop('style')).toBe(null)
  })

  test('Sets `title` attribute to the `name`', () => {
    const wrapper = shallow(<Avatar name='Bobby McGee' />)
    const root = wrapper.find(classNames.root)
    expect(root.prop('title')).toBe('Bobby McGee')
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
    const crop = wrapper.find(classNames.crop)
    const style = crop.props().style

    expect(style).toBeTruthy()
    expect(style.border).toContain('px solid')
    expect(style.borderColor).toBe('green')
  })

  test('Does not have a border by default', () => {
    const wrapper = shallow(<Avatar name='Buddy' />)
    const crop = wrapper.find(classNames.crop)
    const style = crop.props().style

    expect(style).not.toBeTruthy()
  })

  test('Adds a style class to the component', () => {
    const wrapper = shallow(<Avatar name='Buddy' borderColor='red' />)

    expect(wrapper.hasClass('has-borderColor')).toBeTruthy()
  })

  test('Does not pass borderColor as outerBorderColor to StatusDot, by default', () => {
    const wrapper = shallow(
      <Avatar name='Buddy' borderColor='red' status='online' />
    )
    const o = wrapper.find(StatusDot)

    expect(o.prop('outerBorderColor')).not.toBe('red')
  })

  test('Passes borderColor as outerBorderColor to StatusDot, if specified', () => {
    const wrapper = shallow(
      <Avatar name='Buddy' borderColor='red' status='online' showStatusBorderColor />
    )
    const o = wrapper.find(StatusDot)

    expect(o.prop('outerBorderColor')).toBe('red')
  })
})

describe('Outer border color', () => {
  test('Does not apply outerBorderColor by default', () => {
    const wrapper = shallow(<Avatar name='Buddy' />)
    const crop = wrapper.find(classNames.crop)
    const style = crop.props().style

    expect(style).not.toBeTruthy()
  })

  test('Can apply outerBorderColor', () => {
    const wrapper = shallow(<Avatar name='Buddy' outerBorderColor='green' />)
    const crop = wrapper.find(classNames.crop)
    const style = crop.props().style

    expect(style).toBeTruthy()
    expect(style.boxShadow).toContain('green')
  })

  test('Adds a style class to the component', () => {
    const wrapper = shallow(<Avatar name='Buddy' outerBorderColor='red' />)

    expect(wrapper.hasClass('has-outerBorderColor')).toBeTruthy()
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

describe('StatusDot', () => {
  test('Does not render a StatusDot by default', () => {
    const wrapper = shallow(<Avatar />)
    const o = wrapper.find(StatusDot)

    expect(o.length).toBe(0)
  })

  test('Renders a StatusDot if status is defined', () => {
    const wrapper = shallow(<Avatar status='online' />)
    const statusMarkup = wrapper.find('.c-Avatar__status')
    const o = statusMarkup.find(StatusDot)

    expect(wrapper.hasClass('is-online'))
    expect(statusMarkup.length).toBe(1)
    expect(o.length).toBe(1)
  })

  test('Adjust the size of StatusDot based on size of Avatar', () => {
    const wrapper = shallow(<Avatar status='online' size='md' />)

    expect(wrapper.find(StatusDot).prop('size')).toBe('md')

    wrapper.setProps({size: 'sm'})

    expect(wrapper.find(StatusDot).prop('size')).toBe('sm')
  })

  test('Renders an icon in StatusDot, if defined', () => {
    const wrapper = shallow(<Avatar status='online' statusIcon='tick' />)
    const o = wrapper.find(StatusDot)

    expect(o.props().icon).toBe('tick')
  })
})
