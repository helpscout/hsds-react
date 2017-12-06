import React from 'react'
import { mount, shallow } from 'enzyme'
import Tag from '..'
import { Animate, Icon, Text } from '../../index'
import wait from '../../../tests/helpers/wait'

const cx = 'c-Tag'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Tag />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Tag className='mugatu' />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Animate', () => {
  test('Is wrapped in an Animate component', () => {
    const wrapper = shallow(<Tag />)
    const o = wrapper.find(Animate)

    expect(o.length).toBe(1)
    expect(o.hasClass(cx)).toBe(true)
  })

  test('Animation duration can be defined', () => {
    const wrapper = shallow(<Tag animationDuration={1000} />)
    const o = wrapper.find(Animate)

    expect(o.props().duration).toBe(1000)
  })
})

describe('Content', () => {
  test('Wraps children components in <Text> ', () => {
    const wrapper = shallow(
      <Tag>Mugatu</Tag>
    )
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Mugatu')
    expect(o.props().size).toBe('12')
  })
})

describe('Remove', () => {
  test('Is not removable by default', (done) => {
    const wrapper = mount(<Tag />)

    wait()
      .then(() => {
        const icon = wrapper.find(Icon)
        expect(icon.length).toBe(0)
        done()
      })
  })

  test('Renders remove Icon if isRemovable', (done) => {
    const wrapper = mount(<Tag isRemovable />)

    wait()
      .then(() => {
        const icon = wrapper.find(Icon)
        expect(icon.length).toBe(1)
        done()
      })
  })

  test('Does not fire callback on unmount', (done) => {
    const spy = jest.fn()
    const wrapper = mount(<Tag onRemove={spy} />)

    wait()
      .then(() => {
        wrapper.unmount()
      })
      .then(() => wait(100))
      .then(() => {
        expect(spy).not.toHaveBeenCalled()
        done()
      })
  })

  test('Fires callback on remove click', (done) => {
    const spy = jest.fn()
    const wrapper = mount(<Tag isRemovable onRemove={spy} id={1} value='Ron' />)

    wait()
      .then(() => {
        const icon = wrapper.find(Icon)
        icon.simulate('click')
      })
      .then(() => wait(100))
      .then(() => {
        expect(spy).toHaveBeenCalled()
        expect(spy.mock.calls[0][0].id).toBe(1)
        expect(spy.mock.calls[0][0].value).toBe('Ron')
        done()
      })
  })
})

describe('Styles', () => {
  test('Has allCaps styles', () => {
    const wrapper = shallow(<Tag allCaps />)
    const o = wrapper.find(Text)

    expect(o.props().allCaps).toBeTruthy()
    expect(o.props().size).not.toBe('12')
  })

  test('Has color styles', () => {
    const wrapper = shallow(<Tag color='red' />)

    expect(wrapper.hasClass('is-red')).toBeTruthy()
  })

  test('Has filled styles', () => {
    const wrapper = shallow(<Tag filled />)

    expect(wrapper.hasClass('is-filled')).toBeTruthy()
  })

  test('Has pulsing styles', () => {
    const wrapper = shallow(<Tag pulsing />)

    expect(wrapper.hasClass('is-pulsing')).toBeTruthy()
  })
})

describe('Value', () => {
  test('Renders value as text', () => {
    const wrapper = shallow(<Tag value='Ron' />)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Ron')
  })

  test('Renders value instead of children, if defined', () => {
    const wrapper = shallow(<Tag value='Ron'>Champ</Tag>)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Ron')
    expect(o.html()).not.toContain('Mike')
  })
})
