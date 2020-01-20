import React from 'react'
import { mount } from 'enzyme'
import { cy } from '@helpscout/cyan'
import { Avatar } from './Avatar'
import AvatarImage, { clearCache } from './Avatar.Image'
import { getCircleProps } from './Avatar.css'
import { StatusDot } from '../index'

const ui = {
  root: '.c-Avatar',
  crop: '.c-Avatar__crop',
  cropBorder: '.c-Avatar__cropBorder',
  outerBorder: '.c-Avatar__outerBorder',
  image: '.c-Avatar__image',
  initials: '.c-Avatar__title',
}

jest.useFakeTimers()

beforeEach(() => {
  clearCache()
  global.Image.prototype.decode = null
})

describe('Name', () => {
  test('Uses the `initials` attribute if specified', () => {
    const wrapper = mount(<Avatar name="Ron Burgandy" initials="XY" />)
    const title = wrapper.find(`div${ui.initials}`)

    expect(title.text()).toBe('XY')
  })

  test('Initializes first/last name to two letters', () => {
    const wrapper = mount(<Avatar name="Ron Burgandy" />)
    const title = wrapper.find(`div${ui.initials}`)

    expect(title.text()).toBe('RB')
  })

  test('Initializes multi-word names to two letters', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" />)
    const title = wrapper.find(`div${ui.initials}`)

    expect(title.text()).toBe('BE')
  })

  test('Initializes single names to one letters', () => {
    const wrapper = mount(<Avatar name="Buddy" />)
    const title = wrapper.find(`div${ui.initials}`)

    expect(title.text()).toBe('B')
  })

  test('Can be overridden by count prop', () => {
    const wrapper = mount(<Avatar name="Buddy" count="Elf" />)
    const title = wrapper.find(`div${ui.initials}`)

    expect(title.text()).toBe('Elf')
  })

  test('Sets `title` attribute to the `name`', () => {
    const wrapper = mount(<Avatar name="Bobby McGee" />)
    const root = wrapper.find(`div${ui.root}`)
    expect(root.prop('title')).toBe('Bobby McGee')
  })
})

describe('Image', () => {
  test('Has the correct className', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" image="buddy.jpg" />)
    const image = wrapper.find(`div${ui.image}`)

    expect(image.exists()).toBeTruthy()
  })

  test('Background is currentColor to prevent flash of color before image loads', () => {
    cy.render(<Avatar name="Buddy the Elf" image="buddy.jpg" />)
    const crop = cy.get(`div${ui.crop}`)

    expect(crop.exists()).toBeTruthy()
    expect(crop.getComputedStyle().backgroundColor).toEqual('transparent')
  })

  test('Background is transparent if there is an image', cb => {
    global.Image.prototype.decode = () => Promise.resolve()

    const onLoad = () => {
      const crop = cy.get(`div${ui.crop}`)
      expect(crop.exists()).toBeTruthy()
      expect(crop.getComputedStyle().backgroundColor).toEqual('transparent')
      cb()
    }

    cy.render(<Avatar image="buddy.jpg" onLoad={onLoad} />)
  })

  test('Do not render image if image prop is specified but image is loading', () => {
    const src = 'buddy.jpg'
    cy.render(<Avatar name="Buddy the Elf" image={src} />)
    const image = cy.get(`div${ui.image}`)

    expect(image.exists()).toBeTruthy()
    expect(image.getComputedStyle().backgroundImage).toBeFalsy()
  })

  test('Render image if image prop is specified and image has finished loading', cb => {
    const src = 'buddy.jpg'

    const onLoad = () => {
      wrapper.update()
      const image = wrapper.find(`div${ui.image}`)
      expect(image.exists()).toBeTruthy()
      expect(image.prop('src')).toContain(src)
      cb()
    }
    const wrapper = mount(
      <Avatar name="Buddy the Elf" image={src} onLoad={onLoad} />
    )
    wrapper
      .find(AvatarImage)
      .instance()
      .image.onload()
  })

  test('Rendered image should have name within', () => {
    const name = 'Buddy the Elf'
    const wrapper = mount(<Avatar name={name} image="buddy.jpg" />)
    const image = wrapper.find(`div${ui.image}`)

    expect(image.text()).toBe(name)
  })

  test('Replaces Initials with image', () => {
    const wrapper = mount(<Avatar name="Buddy the Elf" image="buddy.jpg" />)
    const initials = wrapper.find(ui.initials)

    expect(initials.exists()).toBeFalsy()
  })

  test('Replaces image with initials on error', cb => {
    const onError = () => {
      wrapper.update()
      const initials = wrapper.find(ui.initials)
      const image = wrapper.find(`div${ui.image}`)
      expect(initials.exists()).toBeTruthy()
      expect(image.exists()).toBeFalsy()
      cb()
    }
    const wrapper = mount(
      <Avatar name="Buddy the Elf" image="buddy.jpg" onError={onError} />
    )

    wrapper
      .find(AvatarImage)
      .instance()
      .image.onerror()
  })

  test('Replaces image with fallback on error', cb => {
    const fallbackSrc = 'buddy2.jpg'

    const onLoad = () => {
      wrapper.update()
      const image = wrapper.find(`div${ui.image}`)
      expect(image.exists()).toBeTruthy()
      expect(image.prop('src')).toContain(fallbackSrc)
      cb()
    }

    const wrapper = mount(
      <Avatar
        name="Buddy the Elf"
        image="buddy.jpg"
        fallbackImage={fallbackSrc}
        onLoad={onLoad}
      />
    )
    wrapper
      .find(AvatarImage)
      .instance()
      .image.onerror()
    wrapper
      .find(AvatarImage)
      .instance()
      .image.onload()
  })

  test('Sets `title` attribute to the `name`', () => {
    const wrapper = mount(<Avatar name="Bobby McGee" />)
    const root = wrapper.find(`div${ui.root}`)
    expect(root.prop('title')).toBe('Bobby McGee')
  })

  test('Avatar src should be an array', () => {
    const firstSrc = 'test2.jpg'

    const wrapper = mount(<Avatar image={firstSrc} />)
    expect(Array.isArray(wrapper.instance().src)).toBeTruthy()
  })

  test('Updating the props will update the src value', () => {
    const firstSrc = 'test2.jpg'
    const secondSrc = 'test3.jpg'

    const wrapper = mount(<Avatar image={firstSrc} />)
    expect(wrapper.instance().src.join('')).toContain(firstSrc)
    wrapper.setProps({ image: secondSrc })
    expect(wrapper.instance().src.join('')).toContain(secondSrc)
  })

  test('Clearing the props will hide the actual image', () => {
    const wrapper = mount(<Avatar image="buddy.jpg" />)
    wrapper.setProps({ image: null })
    expect(wrapper.instance().src.join('')).toBe('')
    expect(wrapper.find(AvatarImage).state().isLoading).toBeFalsy()
  })

  test('Uses decoding image if available', cb => {
    global.Image.prototype.decode = () => Promise.resolve()

    const onLoad = () => {
      wrapper.update()
      expect(wrapper.find(AvatarImage).state().isLoaded).toBeTruthy()
      cb()
    }

    const wrapper = mount(<Avatar image="buddy.jpg" onLoad={onLoad} />)
  })

  test('Use image from the cache', () => {
    const wrapper = mount(<Avatar image="buddy.jpg" />)
    wrapper
      .find(AvatarImage)
      .instance()
      .image.onload()
    const wrapperCache = mount(<Avatar image="buddy.jpg" />)
    const state = wrapperCache.find(AvatarImage).state()
    expect(state.isLoading).toBeFalsy()
    expect(state.isLoaded).toBeTruthy()
  })

  test('Validate that image exists when calling onerror', () => {
    const wrapper = mount(<Avatar image="buddy.jpg" />)
    const instance = wrapper.find(AvatarImage).instance()
    wrapper.unmount()
    expect(instance.onError()).toBeFalsy()
  })

  test('Use cache when loading fallback image if it exists', () => {
    const wrapper1 = mount(<Avatar image="buddy.jpg" />)
    wrapper1
      .find(AvatarImage)
      .instance()
      .image.onload()

    const spy = jest.fn()
    const wrapper = mount(
      <Avatar image="buddy2.jpg" fallbackImage="buddy.jpg" onLoad={spy} />
    )
    const instance = wrapper.find(AvatarImage).instance()
    const result = instance.image.onerror()
    expect(result).toBeTruthy()
    expect(spy).toHaveBeenCalled()
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

  test('Add light classname to component and title', () => {
    const wrapper = mount(<Avatar name="Buddy" light={true} />)
    const root = wrapper.find(`div${ui.root}`)

    expect(root.props().className).toContain('is-light')
    expect(
      wrapper
        .find(ui.initials)
        .first()
        .prop('className')
    ).toContain('is-light')
  })

  test('Add active classname to component', () => {
    const wrapper = mount(<Avatar name="Buddy" active={true} />)
    const root = wrapper.find(`div${ui.root}`)

    expect(root.props().className).toContain('is-active')
  })

  test('imageWrapper received animation props', () => {
    const wrapper = mount(<Avatar animation={true} image="buddy.jpg" />)
    const imageWrapper = wrapper.find('.c-Avatar__imageWrapper').first()
    const props = imageWrapper.props()
    expect(props.animation).toBeTruthy()
    expect(props.animationEasing).toBeTruthy()
    expect(props.animationDuration).toBeTruthy()
  })

  test('imageWrapper received no animation if disabled', () => {
    const wrapper = mount(<Avatar animation={false} image="buddy.jpg" />)
    const imageWrapper = wrapper.find('.c-Avatar__imageWrapper').first()
    const props = imageWrapper.props()
    expect(props.animation).toBeFalsy()
    expect(props.animationEasing).toBeFalsy()
    expect(props.animationDuration).toBeFalsy()
  })
})

describe('Border color', () => {
  test('Can apply borderColor', () => {
    const wrapper = cy.render(<Avatar name="Buddy" borderColor="green" />)
    const crop = cy.get(`div${ui.cropBorder}`)

    expect(crop.getComputedStyle().borderColor).toBe('green')
  })

  test('Does not have a border by default', () => {
    const wrapper = cy.render(<Avatar name="Buddy" />)
    const crop = cy.get(`div${ui.cropBorder}`)

    expect(crop.getComputedStyle().borderColor).toBe('transparent')
  })

  test('CropBorder UI renders Avatar shape', () => {
    const wrapper = mount(<Avatar name="Buddy" outerBorderColor="green" />)
    const el = wrapper.find(`div${ui.cropBorder}`)

    expect(el.props().className).toContain(wrapper.prop('shape'))
  })

  test('Adds a style class to the component', () => {
    const wrapper = mount(<Avatar name="Buddy" borderColor="red" />)
    const o = wrapper.find('div.c-Avatar')

    expect(o.hasClass('has-borderColor')).toBeTruthy()
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
    const wrapper = cy.render(<Avatar name="Buddy" />)
    const el = cy.get(`div${ui.outerBorder}`)

    expect(el.getComputedStyle().borderColor).toBe('transparent')
  })

  test('Can apply outerBorderColor', () => {
    const wrapper = cy.render(
      <Avatar name="Buddy" outerBorderColor="green" shape="circle" />
    )
    const el = cy.get(`div${ui.outerBorder}`)

    expect(el.getComputedStyle().borderColor).toBe('green')
    expect(el.hasClassName('is-circle')).toBeTruthy()
  })

  test('OuterBorder UI renders Avatar shape', () => {
    const wrapper = mount(<Avatar name="Buddy" outerBorderColor="green" />)
    const el = wrapper.find(`div${ui.outerBorder}`)

    expect(el.props().className).toContain(wrapper.prop('shape'))
  })

  test('Adds a style class to the component', () => {
    const wrapper = mount(<Avatar name="Buddy" outerBorderColor="red" />)
    const o = wrapper.find('div.c-Avatar')

    expect(o.hasClass('has-outerBorderColor')).toBeTruthy()
  })
})

describe('Size', () => {
  test('Apply size classes', () => {
    const sm = mount(<Avatar name="Buddy" size="sm" />)
    const lg = mount(<Avatar name="Buddy" size="lg" />)

    expect(sm.find('div.c-Avatar').hasClass('is-sm')).toBe(true)
    expect(lg.find('div.c-Avatar').hasClass('is-lg')).toBe(true)
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
    const statusMarkup = wrapper.find('div.c-Avatar__status')
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
    wrapper
      .find(AvatarImage)
      .instance()
      .image.onerror()
    expect(spy).toHaveBeenCalled()
  })
})

describe('onLoad', () => {
  test('onLoad handler gets called when the avatar image loads', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Avatar name="Buddy" image="buddy.jpg" onLoad={spy} />
    )
    wrapper
      .find(AvatarImage)
      .instance()
      .image.onload()
    expect(spy).toHaveBeenCalled()
  })
})

describe('Action', () => {
  test("Doesn't render the action", () => {
    const wrapper = cy.render(
      <Avatar name="Buddy" size="sm" actionable={false} />
    )
    expect(wrapper.exists()).toBeTruthy()
    expect(cy.getByCy('Avatar.Action').exists()).toBeFalsy()
  })

  test('Adds action to Avatar', () => {
    const wrapper = cy.render(
      <Avatar name="Buddy" size="sm" actionable={true} />
    )
    expect(wrapper.exists()).toBeTruthy()
    expect(cy.getByCy('Avatar.Action').exists()).toBeTruthy()
  })

  test('Renders as a button element', () => {
    const wrapper = cy.render(
      <Avatar name="Buddy" size="sm" actionable={true} />
    )
    expect(cy.getByCy('Avatar').exists()).toBeTruthy()
    expect(cy.getByCy('Avatar').is('button')).toBeTruthy()
  })

  test('Renders action default trash icon', () => {
    const wrapper = cy.render(
      <Avatar name="Buddy" size="sm" actionable={true} />
    )
    expect(cy.get('.c-Icon').exists()).toBeTruthy()
    expect(cy.get('.c-Icon').hasClassName('is-iconName-trash')).toBeTruthy()
  })

  test('Renders custom action icon', () => {
    const wrapper = cy.render(
      <Avatar name="Buddy" size="sm" actionable={true} actionIcon="plus" />
    )
    expect(cy.get('.c-Icon').exists()).toBeTruthy()
    expect(cy.get('.c-Icon').hasClassName('is-iconName-plus')).toBeTruthy()
  })

  test('Updates the shape of the Action based on parent prop', () => {
    const wrapper = cy.render(
      <Avatar name="Buddy" size="sm" actionable={true} shape="rounded" />
    )
    expect(cy.getByCy('Avatar.Action').hasClassName('is-rounded')).toBeTruthy()
  })

  test('Renders a focus border', () => {
    const wrapper = cy.render(
      <Avatar name="Buddy" size="sm" actionable={true} shape="rounded" />
    )
    expect(cy.getByCy('Avatar.FocusBorder').exists()).toBeTruthy()
  })

  test('Renders an animate svg', () => {
    const wrapper = cy.render(
      <Avatar
        name="Buddy"
        size="sm"
        actionable={true}
        shape="rounded"
        animateActionBorder={true}
      />
    )
    expect(cy.getByCy('Avatar.BorderAnimation').exists()).toBeTruthy()
  })

  test('Evokes the callback when clicking on the Action component', () => {
    const fn = jest.fn()
    const wrapper = cy.render(
      <Avatar
        name="Buddy"
        size="sm"
        actionable={true}
        shape="rounded"
        onActionClick={fn}
      />
    )
    cy.getByCy('Avatar').click()
    expect(fn).toHaveBeenCalled()
  })

  test('Evokes the callback when clicking on the Action component only if the action exists', () => {
    const fn = jest.fn()
    const wrapper = cy.render(
      <Avatar
        name="Buddy"
        size="sm"
        actionable={true}
        shape="rounded"
        onActionClick={fn}
      />
    )
    cy.getByCy('Avatar').click()
    expect(fn).toHaveBeenCalled()

    wrapper.setProps({ removingAvatarAnimation: true })
    cy.getByCy('Avatar').click()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('Hide the action overlay when animating', () => {
    const fn = jest.fn()
    const wrapper = cy.render(
      <Avatar
        name="Buddy"
        size="sm"
        actionable={true}
        shape="rounded"
        onActionClick={fn}
        removingAvatarAnimation={true}
      />
    )
    expect(cy.getByCy('Avatar.Action').exists()).toBeFalsy()
  })

  test('getCircleProps will return a full props object for svg circle', () => {
    const size = 20
    const props = getCircleProps(size)

    expect(Object.keys(props).join('-')).toBe(
      ['size', 'cx', 'cy', 'r'].join('-')
    )
    expect(props.size).toBe(28)
    expect(props.cx).toBe(14)
    expect(props.cy).toBe(14)
    expect(props.r).toBe(13)
  })
})
