import React from 'react'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { mount } from 'enzyme'
import { nameToInitials } from './Avatar.utils'
import { getCircleProps } from './Avatar.css'
import { Avatar } from './Avatar'
import AvatarImage, { clearCache } from './Avatar.Image'
import { StatusDot } from '../'

const ui = {
  root: '.c-Avatar',
  crop: '.c-Avatar__crop',
  cropBorder: '.c-Avatar__cropBorder',
  outerBorder: '.c-Avatar__outerBorder',
  focusBorder: '.c-Avatar__focusBorder',
  borderAnimation: '.c-Avatar__borderAnimation',
  image: '.c-Avatar__image',
  imageWrapper: '.c-Avatar__imageWrapper',
  initials: '.c-Avatar__initials',
  action: '.c-Avatar__action',
}

jest.useFakeTimers()

beforeEach(() => {
  clearCache()
  global.Image.prototype.decode = null
})

describe('Name', () => {
  test('Uses the `initials` attribute if specified', () => {
    const { getByText } = render(<Avatar name="Ron Burgandy" initials="XY" />)

    expect(getByText('XY')).toBeInTheDocument()
  })

  test('Initializes first/last name to two letters', () => {
    const { getByText } = render(<Avatar name="Ron Burgundy" />)

    expect(getByText('RB')).toBeInTheDocument()
  })

  test('Initializes multi-word names to two letters', () => {
    const { getByText } = render(<Avatar name="Buddy the Elf" />)

    expect(getByText('BE')).toBeInTheDocument()
  })

  test('Initializes single names to one letters', () => {
    const { getByText } = render(<Avatar name="Buddy" />)

    expect(getByText('B')).toBeInTheDocument()
  })

  test('Can be overridden by count prop', () => {
    const { getByText } = render(<Avatar name="Buddy" count="Elf" />)

    expect(getByText('Elf')).toBeInTheDocument()
  })

  test('Sets `title` attribute to the `name`', () => {
    const { getByTitle } = render(<Avatar name="Bobby McGee" />)

    expect(getByTitle('Bobby McGee')).toBeInTheDocument()
  })
})

describe('Image', () => {
  test('Has the correct className', () => {
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" withShadow />
    )

    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`div${ui.image}`)).toBeInTheDocument()
    expect(avatar.querySelector('.is-withShadow')).toBeInTheDocument()
  })

  test('Background is currentColor to prevent flash of color before image loads', () => {
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`div${ui.crop}`)).toBeInTheDocument()
    expect(
      window.getComputedStyle(avatar.querySelector(`div${ui.crop}`))
        .backgroundColor
    ).toEqual('transparent')
  })

  test('Background is transparent if there is an image', cb => {
    global.Image.prototype.decode = () => Promise.resolve()

    const onLoad = () => {
      const crop = avatar.querySelector(`div${ui.crop}`)
      expect(crop).toBeInTheDocument()
      expect(
        window.getComputedStyle(avatar.querySelector(`div${ui.crop}`))
          .backgroundColor
      ).toEqual('transparent')
      cb()
    }

    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" onLoad={onLoad} />
    )
    const avatar = getByTitle('Buddy the Elf')
  })

  test('Do not render image if image prop is specified but image is loading', () => {
    const src = 'buddy.jpg'
    const { getByTitle } = render(<Avatar name="Buddy the Elf" image={src} />)
    const avatar = getByTitle('Buddy the Elf')
    const image = avatar.querySelector(`div${ui.image}`)

    expect(image).toBeInTheDocument()
    expect(window.getComputedStyle(image).backgroundImage).toBeFalsy()
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
    wrapper.find(AvatarImage).instance().image.onload()
  })

  test('Rendered image should have name within', () => {
    const name = 'Buddy the Elf'
    const { getByText } = render(<Avatar name={name} image="buddy.jpg" />)

    expect(getByText(name)).toBeInTheDocument()
  })

  test('Replaces Initials with image', () => {
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`${ui.initials}`)).toBe(null)
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

    wrapper.find(AvatarImage).instance().image.onerror()
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
    wrapper.find(AvatarImage).instance().image.onerror()
    wrapper.find(AvatarImage).instance().image.onload()
  })

  test('Updating the props will update the src value', () => {
    const firstSrc = 'test2.jpg'
    const secondSrc = 'test3.jpg'
    const { getByTitle, rerender } = render(
      <Avatar name="Buddy the Elf" image={firstSrc} />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`${ui.imageWrapper}`).getAttribute('src')).toBe(
      firstSrc
    )

    rerender(<Avatar image={secondSrc} />)

    expect(avatar.querySelector(`${ui.imageWrapper}`).getAttribute('src')).toBe(
      secondSrc
    )
  })

  test('Clearing the props will hide the actual image', () => {
    const { getByTitle, rerender } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" />
    )
    const avatar = getByTitle('Buddy the Elf')
    expect(avatar.querySelector(`${ui.imageWrapper}`).getAttribute('src')).toBe(
      'buddy.jpg'
    )

    rerender(<Avatar image={null} />)

    expect(avatar.querySelector(`${ui.imageWrapper}`)).toBe(null)
  })

  test('Uses decoding image if available', cb => {
    global.Image.prototype.decode = () => Promise.resolve()

    const onLoad = () => {
      const imageWrapper = avatar.querySelector(`div${ui.imageWrapper}`)
      expect(imageWrapper.classList.contains('is-loaded')).toBeTruthy()
      cb()
    }

    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" onLoad={onLoad} />
    )
    const avatar = getByTitle('Buddy the Elf')
  })

  test('Use image from the cache', () => {
    const wrapper = mount(<Avatar image="buddy.jpg" />)
    wrapper.find(AvatarImage).instance().image.onload()
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
    wrapper1.find(AvatarImage).instance().image.onload()

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
    expect(wrapper.find(ui.initials).first().prop('className')).toContain(
      'is-light'
    )
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
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" borderColor="green" />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(
      window.getComputedStyle(avatar.querySelector(`div${ui.cropBorder}`))
        .borderColor
    ).toEqual('green')
  })

  test('Does not have a border by default', () => {
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(
      window.getComputedStyle(avatar.querySelector(`div${ui.cropBorder}`))
        .borderColor
    ).toEqual('transparent')
  })

  test('CropBorder UI renders Avatar shape', () => {
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" outerBorderColor="green" />
    )
    const avatar = getByTitle('Buddy the Elf')
    const cropBorder = avatar.querySelector(`div${ui.cropBorder}`)

    expect(cropBorder.classList.contains('is-circle')).toBeTruthy()
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
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`div${ui.crop}`)).toBeInTheDocument()
    expect(
      window.getComputedStyle(avatar.querySelector(`div${ui.outerBorder}`))
        .borderColor
    ).toEqual('transparent')
  })

  test('Can apply outerBorderColor', () => {
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" outerBorderColor="green" />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`div${ui.crop}`)).toBeInTheDocument()
    expect(
      window.getComputedStyle(avatar.querySelector(`div${ui.outerBorder}`))
        .borderColor
    ).toEqual('green')
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
    wrapper.find(AvatarImage).instance().image.onerror()
    expect(spy).toHaveBeenCalled()
  })
})

describe('onLoad', () => {
  test('onLoad handler gets called when the avatar image loads', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Avatar name="Buddy" image="buddy.jpg" onLoad={spy} />
    )
    wrapper.find(AvatarImage).instance().image.onload()
    expect(spy).toHaveBeenCalled()
  })

  test('onLoad handler gets called when the avatar image already in cache and set immediately', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Avatar name="Buddy" image="buddy.jpg" onLoad={spy} />
    )
    wrapper.find(AvatarImage).instance().image.onload()

    mount(<Avatar name="Buddy" image="buddy.jpg" onLoad={spy} />)
    expect(spy).toHaveBeenCalledTimes(2)
  })
})

describe('Action', () => {
  test("Doesn't render the action", () => {
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" actionable={false} />
    )

    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`div${ui.action}`)).toBe(null)
  })

  test('Adds action to Avatar', () => {
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" actionable />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`div${ui.action}`)).toBeInTheDocument()
  })

  test('Renders as a button element', () => {
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" actionable />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.tagName).toBe('BUTTON')
  })

  test('Renders action default trash icon', () => {
    const { getByTitle } = render(
      <Avatar name="Buddy the Elf" image="buddy.jpg" actionable />
    )
    const avatar = getByTitle('Buddy the Elf')
    const icon = avatar.querySelector('.c-Icon')

    expect(icon).toBeInTheDocument()
    expect(icon.classList.contains('is-iconName-trash')).toBeTruthy()
  })

  test('Renders custom action icon', () => {
    const { getByTitle } = render(
      <Avatar
        name="Buddy the Elf"
        image="buddy.jpg"
        actionable
        actionIcon="plus"
      />
    )
    const avatar = getByTitle('Buddy the Elf')
    const icon = avatar.querySelector('.c-Icon')

    expect(icon).toBeInTheDocument()
    expect(icon.classList.contains('is-iconName-plus')).toBeTruthy()
  })

  test('Updates the shape of the Action based on parent prop', () => {
    const { getByTitle } = render(
      <Avatar
        name="Buddy the Elf"
        image="buddy.jpg"
        actionable
        shape="rounded"
      />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(
      avatar.querySelector(`div${ui.action}`).classList.contains('is-rounded')
    ).toBeTruthy()
  })

  test('Renders a focus border', () => {
    const { getByTitle } = render(
      <Avatar
        name="Buddy the Elf"
        image="buddy.jpg"
        actionable
        shape="rounded"
      />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`${ui.focusBorder}`)).toBeInTheDocument()
  })

  test('Renders a with a Tooltip', () => {
    const { container } = render(
      <Avatar
        name="Buddy the Elf"
        image="buddy.jpg"
        shape="rounded"
        tooltipProps={{
          title: 'Ringo',
          placement: 'bottom',
        }}
      />
    )

    expect(container.querySelector('.TooltipTrigger')).toBeInTheDocument()
  })

  test('Renders an animate svg', () => {
    const { getByTitle } = render(
      <Avatar
        name="Buddy the Elf"
        image="buddy.jpg"
        actionable
        shape="rounded"
        animateActionBorder={true}
      />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`${ui.borderAnimation}`)).toBeInTheDocument()
  })

  test('Evokes the callback when clicking on the Action component', () => {
    const fn = jest.fn()
    const { getByTitle } = render(
      <Avatar
        name="Buddy the Elf"
        image="buddy.jpg"
        actionable
        shape="rounded"
        onActionClick={fn}
      />
    )
    const avatar = getByTitle('Buddy the Elf')
    user.click(avatar)

    expect(fn).toHaveBeenCalled()
  })

  test('Evokes the callback when clicking on the Action component only if the action exists', () => {
    const fn = jest.fn()
    const { getByTitle, rerender } = render(
      <Avatar
        name="Buddy the Elf"
        image="buddy.jpg"
        actionable
        shape="rounded"
        onActionClick={fn}
      />
    )
    const avatar = getByTitle('Buddy the Elf')

    user.click(avatar)

    expect(fn).toHaveBeenCalled()

    rerender(<Avatar removingAvatarAnimation />)
    user.click(avatar)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('Hide the action overlay when animating', () => {
    const fn = jest.fn()
    const { getByTitle } = render(
      <Avatar
        name="Buddy the Elf"
        image="buddy.jpg"
        actionable
        shape="rounded"
        onActionClick={fn}
        removingAvatarAnimation={true}
      />
    )
    const avatar = getByTitle('Buddy the Elf')

    expect(avatar.querySelector(`div${ui.action}`)).toBe(null)
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

describe('nameToInitials', () => {
  test('Returns empty string if no args are passed', () => {
    expect(nameToInitials()).toBe('')
  })

  test('Returns empty string if undefined is passed', () => {
    expect(nameToInitials(undefined)).toBe('')
  })

  test('Returns empty string if an empty string is passed', () => {
    expect(nameToInitials('')).toBe('')
  })

  test('Returns empty string if just whitespace is passed', () => {
    expect(nameToInitials(' ')).toBe('')
  })

  test('Returns initials string if name is passed', () => {
    expect(nameToInitials('Tom Graham')).toBe('TG')
  })

  test('Returns initials string if name is passed with extra whitespace', () => {
    expect(nameToInitials('Tom  Graham')).toBe('TG')
  })

  test('Returns initials string if name is passed with leading whitespace', () => {
    expect(nameToInitials(' Tom Graham')).toBe('TG')
  })

  test('Returns initials string if name is passed with trailing whitespace', () => {
    expect(nameToInitials('Tom Graham ')).toBe('TG')
  })
})
