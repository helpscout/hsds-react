import React from 'react'
import { shallow } from 'enzyme'
import ProgressBar from '..'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = shallow(<ProgressBar />)

    expect(wrapper.hasClass('c-ProgressBar')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = shallow(<ProgressBar className='mugatu' />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Value', () => {
  test('Accepts a string', () => {
    const wrapper = shallow(<ProgressBar value='11' />)
    const bar = wrapper.find('.c-ProgressBar__bar')

    expect(bar.prop('style').width).toBe('11%')
  })

  test('Accepts a float string', () => {
    const wrapper = shallow(<ProgressBar value='11.875' />)
    const bar = wrapper.find('.c-ProgressBar__bar')

    expect(bar.prop('style').width).toBe('11.875%')
  })

  test('Accepts a number', () => {
    const wrapper = shallow(<ProgressBar value={11} />)
    const bar = wrapper.find('.c-ProgressBar__bar')

    expect(bar.prop('style').width).toBe('11%')
  })

  test('Accepts a float number', () => {
    const wrapper = shallow(<ProgressBar value={11.875} />)
    const bar = wrapper.find('.c-ProgressBar__bar')

    expect(bar.prop('style').width).toBe('11.875%')
  })

  test('Normalizes value over 100', () => {
    const wrapper = shallow(<ProgressBar value={7000000000000} />)
    const bar = wrapper.find('.c-ProgressBar__bar')

    expect(bar.prop('style').width).toBe('100%')
  })

  test('Normalizes value under 100', () => {
    const wrapper = shallow(<ProgressBar value={-7000000000000} />)
    const bar = wrapper.find('.c-ProgressBar__bar')

    expect(bar.prop('style').width).toBe('0%')
  })
})

describe('Events', () => {
  test('onChange returns new value as percent', () => {
    const spy = jest.fn()
    const wrapper = shallow(<ProgressBar value={10} onChange={spy} />)
    wrapper.setProps({ value: '50' })

    expect(spy).toHaveBeenCalledWith('50%')
  })
})

describe('Size', () => {
  test('Applies size style', () => {
    const wrapper = shallow(<ProgressBar value={10} size='md' />)

    expect(wrapper.hasClass('is-md')).toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = shallow(<ProgressBar style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})
