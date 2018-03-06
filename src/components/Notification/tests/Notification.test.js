import React from 'react'
import {mount, shallow} from 'enzyme'
import Notification from '../index'
import {Animate} from '../../'

const ui = {
  message: '.c-Notification__message',
  text: '.c-Notification__text',
  textPrefix: '.c-Notification__textPrefix',
  textWrapper: '.c-Notification__textWrapper'
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Notification />)

    expect(wrapper.hasClass('c-Notification')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Notification className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Does not renders child content', () => {
    const wrapper = shallow(
      <Notification>
        <div className='child'>Hello</div>
      </Notification>
    )
    const o = wrapper.find('div.child')

    expect(o.length).toBe(0)
  })
})

describe('AnimationSequence', () => {
  test('Can customize animationSequence', () => {
    const wrapper = shallow(
      <Notification animationSequence='scale' />
    )
    const o = wrapper.find(Animate)

    expect(o.prop('sequence')).toBe('scale')
  })
})

describe('Body', () => {
  test('Renders body content, if provided', () => {
    const wrapper = shallow(
      <Notification body='Santa!' />
    )
    const o = wrapper.find(ui.message)

    expect(o.length).toBe(1)
    expect(o.prop('body')).toBe('Santa!')
  })

  test('Can render HTML as body content', () => {
    const wrapper = mount(
      <Notification body='<h1>Santa!</h1>' />
    )
    const o = wrapper.find(ui.message)

    expect(o.length).toBe(1)
    expect(o.node.querySelector('h1')).toBeTruthy()
  })
})

describe('isDismissable', () => {
  test('Is not dismissable by default', () => {
    const wrapper = mount(
      <Notification />
    )

    expect(wrapper.prop('isDismissable')).toBe(false)
  })

  test('Cannot be dismissed, if isDismissable is false', () => {
    const wrapper = shallow(
      <Notification />
    )
    wrapper.instance().handleOnClick()

    expect(wrapper.state('isActive')).toBe(true)
  })

  test('Can be dismissed, if enabled', () => {
    const wrapper = mount(
      <Notification isDismissable />
    )
    wrapper.instance().handleOnClick()

    expect(wrapper.state('isActive')).toBe(false)
  })

  test('onClick callback should still work', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Notification isDismissable onClick={spy} />
    )
    wrapper.instance().handleOnClick()

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onDismiss callback once dismissed', (done) => {
    const spy = jest.fn()
    const wrapper = mount(
      <Notification isDismissable onDismiss={spy} />
    )
    wrapper.instance().handleOnClick()

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      done()
    }, 300)
  })

  test('Autodismisses, if isDismissable', (done) => {
    const spy = jest.fn()
    const wrapper = mount(
      <Notification isDismissable timeout={10} onDismiss={spy} />
    )

    expect(spy).not.toHaveBeenCalled()
    // Faking the timer ending
    wrapper.instance().handleOnTimeout()

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      done()
    }, 300)
  })
})

describe('isActive', () => {
  test('Is stored as internal state', () => {
    const wrapper = shallow(
      <Notification isActive={false} />
    )

    expect(wrapper.state('isActive')).toBe(false)
  })

  test('Dismisses if isActive prop is set to false', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Notification isActive />
    )
    wrapper.instance().forceDismiss = spy
    wrapper.setProps({ isActive: false })

    expect(spy).toHaveBeenCalled()
  })

  test('Does not dismiss if isActive prop is set to true', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Notification isActive />
    )
    wrapper.instance().forceDismiss = spy
    wrapper.setProps({ isActive: true })

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('setState', () => {
  test('Sets internal isMounted state to false on unmount', () => {
    const wrapper = mount(
      <Notification />
    )
    wrapper.unmount()

    expect(wrapper.node._isMounted).toBe(false)
  })

  test('Only sets state if mounted', () => {
    const wrapper = mount(
      <Notification />
    )
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
      const wrapper = mount(
        <Notification />
      )

      expect(wrapper.prop('type')).toBe('text')
    })

    test('Adds text-based className', () => {
      const wrapper = mount(
        <Notification />
      )

      expect(wrapper.hasClass('is-text')).toBe(true)
    })

    test('Passes body prop to Messages', () => {
      const wrapper = shallow(
        <Notification body='mugatu' />
      )
      const o = wrapper.find(ui.message)

      expect(o.prop('body')).toBe('mugatu')
    })

    test('Does not pass children prop to Messages', () => {
      const wrapper = shallow(
        <Notification body='mugatu' children='derek' />
      )
      const o = wrapper.find(ui.message)

      expect(o.prop('body')).toBe('mugatu')
      expect(o.prop('children')).toBeFalsy()
    })
  })

  describe('Image', () => {
    test('Adds image-based className', () => {
      const wrapper = mount(
        <Notification type='image' />
      )

      expect(wrapper.hasClass('is-image')).toBe(true)
    })

    test('Renders a text prefix', () => {
      const wrapper = mount(
        <Notification type='image' />
      )
      const o = wrapper.find(ui.textPrefix)

      expect(o.length).toBe(1)
    })

    test('Does not pass body to Message as prop', () => {
      const wrapper = shallow(
        <Notification body='mugatu.png' type='image' />
      )
      const o = wrapper.find(ui.message)

      expect(o.prop('body')).toBeFalsy()
    })

    test('Passes image markup as children to Message', () => {
      const wrapper = shallow(
        <Notification body='mugatu.png' type='image' />
      )
      const o = wrapper.find(ui.message)

      expect(o.prop('children')).toBeTruthy()
      expect(o.html()).toContain('mugatu.png')
    })
  })

  describe('Link', () => {
    const link = 'http://mugatu.com'
    test('Adds link-based className', () => {
      const wrapper = mount(
        <Notification type='link' />
      )

      expect(wrapper.hasClass('is-link')).toBe(true)
    })

    test('Does not pass body to Message as prop', () => {
      const wrapper = shallow(
        <Notification body={link} type='link' />
      )
      const o = wrapper.find(ui.message)

      expect(o.prop('body')).toBeFalsy()
    })

    test('Passes link markup as children to Message', () => {
      const wrapper = shallow(
        <Notification body={link} type='link' />
      )
      const o = wrapper.find(ui.message)

      expect(o.prop('children')).toBeTruthy()
      expect(o.html()).toContain(link)
    })
  })
})
