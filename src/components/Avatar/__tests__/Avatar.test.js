import React from 'react'
import { mount } from 'enzyme'
import Avatar from '../Avatar'
import { StatusDot } from '../../index'

const ui = {
  root: '.c-Avatar',
  crop: '.c-Avatar__crop',
  cropBorder: '.c-Avatar__cropBorder',
  outerBorder: '.c-Avatar__outerBorder',
  image: '.c-Avatar__image',
  initials: '.c-Avatar__title',
}

describe('Name', () => {
  test('Uses the `initials` attribute if specified', () => {
    const wrapper = mount(<Avatar name="Ron Burgandy" initials="XY" />)
    const title = wrapper.find(ui.initials)

    expect(title.text()).toBe('XY')
  })

  test('Initializes first/last name to two letters', () => {
    const wrapper = mount(<Avatar name="Ron Burgandy" />)
    const title = wrapper.find(ui.initials)

    expect(title.text()).toBe('RB')
  })

  test('Initializes multi-word names to two letters', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" />)
    const title = wrapper.find(ui.initials)

    expect(title.text()).toBe('BE')
  })

  test('Initializes single names to one letters', () => {
    const wrapper = mount(<Avatar name="Buddy" />)
    const title = wrapper.find(ui.initials)

    expect(title.text()).toBe('B')
  })

  test('Can be overridden by count prop', () => {
    const wrapper = mount(<Avatar name="Buddy" count="Elf" />)
    const title = wrapper.find(ui.initials)

    expect(title.text()).toBe('Elf')
  })

  test('Sets `title` attribute to the `name`', () => {
    const wrapper = mount(<Avatar name="Bobby McGee" />)
    const root = wrapper.find(ui.root)
    expect(root.prop('title')).toBe('Bobby McGee')
  })
})

describe('Image', () => {
  test('Has the correct className', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" image="buddy.jpg" />)
    const image = wrapper.find(ui.image)

    expect(image.exists()).toBeTruthy()
  })

  test('Background is currentColor to prevent flash of color before image loads', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" image="buddy.jpg" />)
    const crop = wrapper.find(ui.crop)

    expect(crop.exists()).toBeTruthy()
    expect(crop.prop('style').backgroundColor).toEqual('currentColor')
  })

  test('Do not render image if image prop is specified but image is loading', () => {
    const src = 'buddy.jpg'
    const wrapper = mount(<Avatar name="Buddy the Elf" image={src} />)
    const image = wrapper.find(ui.image)

    expect(image.exists()).toBeTruthy()
    expect(image.prop('style')).toBe(null) // Style prop does not get set.
  })

  test('Render image if image prop is specified and image has finished loading', () => {
    const src = 'buddy.jpg'
    const wrapper = mount(<Avatar name="Buddy the Elf" image={src} />)
    const image = wrapper.find(ui.image)
    wrapper
      .find('img')
      .first()
      .simulate('load')
    expect(image.prop('style').backgroundImage).toContain(src)
  })

  test('Rendered image should have name within', () => {
    const name = 'Buddy the Elf'
    const wrapper = mount(<Avatar name={name} image="buddy.jpg" />)
    const image = wrapper.find(ui.image)

    expect(image.text()).toBe(name)
  })

  test('Replaces Initials with image', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" image="buddy.jpg" />)
    const initials = wrapper.find(ui.initials)

    expect(initials.exists()).toBeFalsy()
  })

  test('Replaces image with initials on error', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" image="buddy.jpg" />)
    wrapper
      .find('img')
      .first()
      .simulate('error')

    const initials = wrapper.find(ui.initials)
    const image = wrapper.find(ui.image)

    expect(initials.exists()).toBeTruthy()
    expect(image.exists()).toBeFalsy()
  })

  test('Background style is unset on error', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" image="buddy.jpg" />)
    wrapper
      .find('img')
      .first()
      .simulate('error')

    const crop = wrapper.find(ui.crop)

    expect(crop.prop('style')).toBe(null)
  })

  test('Sets `title` attribute to the `name`', () => {
    const wrapper = mount(<Avatar name="Bobby McGee" />)
    const root = wrapper.find(ui.root)
    expect(root.prop('title')).toBe('Bobby McGee')
  })
})

describe('ClassNames', () => {
  test('Accept classNames', () => {
    const wrapper = mount(
      <Avatar name="Buddy" size="sm" className="not now arctic puffin" />
    )

    const classNames = wrapper.prop('className')

    expect(classNames).toContain('not')
    expect(classNames).toContain('now')
    expect(classNames).toContain('arctic')
    expect(classNames).toContain('puffin')
  })
})

describe('Border color', () => {
  test('Can apply borderColor', () => {
    const wrapper = mount(<Avatar name="Buddy" borderColor="green" />)
    const crop = wrapper.find(ui.cropBorder)
    const style = crop.props().style

    expect(style).toBeTruthy()
    expect(style.borderColor).toBe('green')
  })

  test('Does not have a border by default', () => {
    const wrapper = mount(<Avatar name="Buddy" />)
    const crop = wrapper.find(ui.cropBorder)
    const style = crop.props().style

    expect(style.borderColor).toBe('transparent')
  })

  test('CropBorder UI renders Avatar shape', () => {
    const wrapper = mount(<Avatar name="Buddy" outerBorderColor="green" />)
    const el = wrapper.find(ui.cropBorder)

    expect(el.props().className).toContain(wrapper.prop('shape'))
  })

  test('Adds a style class to the component', () => {
    const wrapper = mount(<Avatar name="Buddy" borderColor="red" />)

    expect(wrapper.hasClass('has-borderColor')).toBeTruthy()
  })

  test('Does not pass borderColor as outerBorderColor to StatusDot, by default', () => {
    const wrapper = mount(
      <Avatar name="Buddy" borderColor="red" status="online" />
    )
    const o = wrapper.find(StatusDot)

    expect(o.prop('outerBorderColor')).not.toBe('red')
  })

  test('Passes borderColor as outerBorderColor to StatusDot, if specified', () => {
    const wrapper = mount(
      <Avatar
        name="Buddy"
        borderColor="red"
        status="online"
        showStatusBorderColor
      />
    )
    const o = wrapper.find(StatusDot)

    expect(o.prop('outerBorderColor')).toBe('red')
  })
})

describe('Outer border color', () => {
  test('Does not apply outerBorderColor by default', () => {
    const wrapper = mount(<Avatar name="Buddy" />)
    const el = wrapper.find(ui.outerBorder)
    const style = el.props().style

    expect(style.borderColor).toBe('transparent')
  })

  test('Can apply outerBorderColor', () => {
    const wrapper = mount(<Avatar name="Buddy" outerBorderColor="green" />)
    const el = wrapper.find(ui.outerBorder)
    const style = el.props().style

    expect(style.borderColor).toContain('green')
    expect(el.props().className).toContain(wrapper.prop('shape'))
  })

  test('OuterBorder UI renders Avatar shape', () => {
    const wrapper = mount(<Avatar name="Buddy" outerBorderColor="green" />)
    const el = wrapper.find(ui.outerBorder)

    expect(el.props().className).toContain(wrapper.prop('shape'))
  })

  test('Adds a style class to the component', () => {
    const wrapper = mount(<Avatar name="Buddy" outerBorderColor="red" />)

    expect(wrapper.hasClass('has-outerBorderColor')).toBeTruthy()
  })
})

describe('Size', () => {
  test('Apply size classes', () => {
    const sm = mount(<Avatar name="Buddy" size="sm" />)
    const lg = mount(<Avatar name="Buddy" size="lg" />)

    expect(sm.hasClass('is-sm')).toBe(true)
    expect(lg.hasClass('is-lg')).toBe(true)
  })
})

describe('StatusDot', () => {
  test('Does not render a StatusDot by default', () => {
    const wrapper = mount(<Avatar />)
    const o = wrapper.find(StatusDot)

    expect(o.length).toBe(0)
  })

  test('Renders a StatusDot if status is defined', () => {
    const wrapper = mount(<Avatar status="online" />)
    const statusMarkup = wrapper.find('.c-Avatar__status')
    const o = statusMarkup.find(StatusDot)

    expect(wrapper.hasClass('is-online'))
    expect(statusMarkup.length).toBe(1)
    expect(o.length).toBe(1)
  })

  test('Does not adjust the size of StatusDot, if the Avatar is md or smaller', () => {
    const wrapper = mount(<Avatar status="online" size="md" />)

    expect(wrapper.find(StatusDot).prop('size')).toBe('sm')

    wrapper.setProps({ size: 'sm' })

    expect(wrapper.find(StatusDot).prop('size')).toBe('sm')
  })

  test('Adjusts the size of StatusDot if Avatar is lg', () => {
    const wrapper = mount(<Avatar status="online" size="lg" />)

    expect(wrapper.find(StatusDot).prop('size')).toBe('md')
  })

  test('Renders an icon in StatusDot, if defined', () => {
    const wrapper = mount(<Avatar status="online" statusIcon="tick" />)
    const o = wrapper.find(StatusDot)

    expect(o.props().icon).toBe('tick')
  })
})

describe('onError', () => {
  test('onError handler gets called when there is an error loading the avatar image', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Avatar name="Buddy" image="buddy.jpg" onError={spy} />
    )
    const img = wrapper.find('img').first()
    img.simulate('error')
    expect(spy).toHaveBeenCalled()
  })
})

describe('onLoad', () => {
  test('onLoad handler gets called when the avatar image loads', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Avatar name="Buddy" image="buddy.jpg" onLoad={spy} />
    )
    const img = wrapper.find('img').first()
    img.simulate('load')
    expect(spy).toHaveBeenCalled()
  })
})
