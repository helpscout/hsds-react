import React from 'react'
import { mount } from 'enzyme'
import { Notification, stripUrlPrefix } from './Notification'
import { Animate, Truncate } from '../index'

jest.useFakeTimers()

const ui = {
  message: '.c-Notification__message',
  text: '.c-Notification__text',
  textPrefix: '.c-Notification__textPrefix',
  textWrapper: '.c-Notification__textWrapper',
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Notification />)
    const el = wrapper.find('div.c-Notification')

    expect(el.length).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Notification className={customClass} />)
    const el = wrapper.find('div.c-Notification')

    expect(el.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Does not renders child content', () => {
    const wrapper = mount(
      <Notification>
        <div className="child">Hello</div>
      </Notification>
    )
    const o = wrapper.find('div.child')

    expect(o.length).toBe(0)
  })
})

describe('Align', () => {
  test('Has default alignment of right', () => {
    const wrapper = mount(<Notification />)
    const el = wrapper.find('div.c-Notification')

    expect(el.getDOMNode().classList.contains('is-align-right')).toBeTruthy()
  })

  test('Can change alignment styles, if specified', () => {
    const wrapper = mount(<Notification align="left" />)
    const el = wrapper.find('div.c-Notification')

    expect(el.getDOMNode().classList.contains('is-align-left')).toBeTruthy()
  })
})

describe('AnimationSequence', () => {
  test('Can customize animationSequence', () => {
    const wrapper = mount(<Notification animationSequence="scale" />)
    const o = wrapper.find(Animate)

    expect(o.prop('sequence')).toBe('scale')
  })
})

describe('Body', () => {
  test('Does not render body content', () => {
    const wrapper = mount(<Notification body="Santa!" />)
    const o = wrapper.find(ui.message).first()

    expect(o.length).toBe(1)
    expect(o.prop('body')).toBeFalsy()
    expect(o.html()).toContain('Santa!')
  })
})

describe('Click', () => {
  test('Stops event propagation on click', () => {
    const spy = jest.fn()
    const mockEvent = {
      stopPropagation: spy,
    }
    const wrapper = mount(<Notification />)
    wrapper.instance().handleOnClick(mockEvent)

    expect(spy).toHaveBeenCalled()
  })
})

describe('isDismissable', () => {
  test('Is not dismissable by default', () => {
    const wrapper = mount(<Notification />)

    expect(wrapper.prop('isDismissable')).toBe(false)
  })

  test('Cannot be dismissed, if isDismissable is false', () => {
    const wrapper = mount(<Notification />)
    wrapper.instance().handleOnClick()

    expect(wrapper.state('isActive')).toBe(true)
  })

  test('Can be dismissed, if enabled', () => {
    const wrapper = mount(<Notification isDismissable />)
    wrapper.instance().handleOnClick()

    expect(wrapper.state('isActive')).toBe(false)
  })

  test('onClick callback should still work', () => {
    const spy = jest.fn()
    const wrapper = mount(<Notification isDismissable onClick={spy} />)
    wrapper.instance().handleOnClick()

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onDismiss callback once dismissed', () => {
    const spy = jest.fn()
    const wrapper = mount(<Notification isDismissable onDismiss={spy} />)
    wrapper.instance().handleOnClick()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })

  test('Autodismisses, if isDismissable', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Notification isDismissable timeout={10} onDismiss={spy} />
    )

    expect(spy).not.toHaveBeenCalled()
    // Faking the timer ending
    wrapper.instance().handleOnTimeout()
    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })
})

describe('isActive', () => {
  test('Is stored as internal state', () => {
    const wrapper = mount(<Notification isActive={false} />)

    expect(wrapper.state('isActive')).toBe(false)
  })

  test('Dismisses if isActive prop is set to false', () => {
    const spy = jest.fn()
    const wrapper = mount(<Notification isActive />)
    wrapper.instance().forceDismiss = spy
    wrapper.setProps({ isActive: false })

    expect(spy).toHaveBeenCalled()
  })

  test('Does not dismiss if isActive prop is set to true', () => {
    const spy = jest.fn()
    const wrapper = mount(<Notification isActive />)
    wrapper.instance().forceDismiss = spy
    wrapper.setProps({ isActive: true })

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('setState', () => {
  test('Sets internal isMounted state to false on unmount', () => {
    const wrapper = mount(<Notification />)
    const o = wrapper.instance()
    wrapper.unmount()

    expect(o._isMounted).toBe(false)
  })

  test('Only sets state if mounted', () => {
    const wrapper = mount(<Notification />)
    wrapper.instance()._isMounted = false
    wrapper.instance().forceDismiss()

    expect(wrapper.state('isActive')).toBe(true)

    wrapper.instance()._isMounted = true
    wrapper.instance().forceDismiss()

    expect(wrapper.state('isActive')).toBe(false)
  })
})

describe('Type', () => {
  describe('Text', () => {
    test('Is type of text by default', () => {
      const wrapper = mount(<Notification />)

      expect(wrapper.prop('type')).toBe('text')
    })

    test('Adds text-based className', () => {
      const wrapper = mount(<Notification />)
      const el = wrapper.find('div.c-Notification')

      expect(el.getDOMNode().classList.contains('is-text')).toBe(true)
    })

    test('Does not pass body prop to Messages', () => {
      const wrapper = mount(<Notification body="mugatu" />)
      const o = wrapper.find(ui.message).first()

      expect(o.prop('body')).not.toBe('mugatu')
    })

    test('Passes body as children prop to Messages', () => {
      const wrapper = mount(<Notification body="mugatu" children="derek" />)
      const o = wrapper.find(ui.message).first()

      expect(o.prop('body')).toBeFalsy()
      expect(o.html()).toContain('mugatu')
      expect(wrapper.html()).not.toContain('derek')
    })

    test('Passes body as truncated content as children prop to Messages', () => {
      const wrapper = mount(<Notification body="mugatu" children="derek" />)
      const o = wrapper.find(ui.message).first()
      const t = o.find(Truncate).first()

      expect(t.length).toBe(1)
      expect(t.html()).toContain('mugatu')
    })
  })

  describe('Image', () => {
    test('Adds image-based className', () => {
      const wrapper = mount(<Notification type="image" />)
      const el = wrapper.find('div.c-Notification')

      expect(el.getDOMNode().classList.contains('is-image')).toBe(true)
    })

    test('Renders a text prefix', () => {
      const wrapper = mount(<Notification type="image" />)
      const o = wrapper.find(ui.textPrefix).first()

      expect(o.length).toBe(1)
    })

    test('Does not pass body to Message as prop', () => {
      const wrapper = mount(<Notification body="mugatu.png" type="image" />)
      const o = wrapper.find(ui.message).first()

      expect(o.prop('body')).toBeFalsy()
    })

    test('Passes image markup as children to Message', () => {
      const wrapper = mount(<Notification body="mugatu.png" type="image" />)
      const o = wrapper.find(ui.message).first()

      expect(o.prop('children')).toBeTruthy()
      expect(o.html()).toContain('mugatu.png')
    })
  })

  describe('Link', () => {
    const link = 'http://mugatu.com'
    test('Adds link-based className', () => {
      const wrapper = mount(<Notification type="link" />)
      const el = wrapper.find('div.c-Notification')

      expect(el.getDOMNode().classList.contains('is-link')).toBe(true)
    })

    test('Does not pass body to Message as prop', () => {
      const wrapper = mount(<Notification body={link} type="link" />)
      const o = wrapper.find(ui.message).first()

      expect(o.prop('body')).toBeFalsy()
    })

    test('Passes link markup as children to Message', () => {
      const wrapper = mount(<Notification body={link} type="link" />)
      const o = wrapper.find(ui.message).first()

      expect(o.prop('children')).toBeTruthy()
      expect(o.html()).toContain(link)
    })
  })
})

describe('Truncation', () => {
  test('Can customize truncation limit', () => {
    const wrapper = mount(<Notification body="DEREK!" truncateLimit={3} />)
    const o = wrapper.find(Truncate).first()

    expect(o.prop('limit')).toBe(3)
  })
})

describe('stripUrlPrefix', () => {
  test('returns argument if not a string', () => {
    expect(stripUrlPrefix(true)).toBe(true)
    expect(stripUrlPrefix(false)).toBe(false)
    expect(stripUrlPrefix(123)).toBe(123)
  })

  test('removes https://', () => {
    expect(stripUrlPrefix('https://site.com')).toBe('site.com')
  })

  test('removes http://', () => {
    expect(stripUrlPrefix('http://site.com')).toBe('site.com')
  })

  test('removes https://www', () => {
    expect(stripUrlPrefix('https://www.site.com')).toBe('site.com')
  })

  test('removes http://www', () => {
    expect(stripUrlPrefix('http://www.site.com')).toBe('site.com')
  })
})
