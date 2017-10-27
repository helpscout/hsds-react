import React from 'react'
import { mount, shallow } from 'enzyme'
import Drop from '..'
import classNames from '../../../utilities/classNames'

const ContentComponent = props => {
  const { className, style } = props
  const componentClassName = classNames(
    'content',
    className
  )
  const handleClick = () => {
    console.log('wee')
  }
  return (
    <div
      className={componentClassName}
      onClick={handleClick}
      style={style}
    >
      Content
    </div>
  )
}
const trigger = (
  <a className='trigger'>Trigger</a>
)

afterEach(() => {
  document.body.innerHTML = ''
})

test('Can create a component as a HOC', () => {
  const TestComponent = Drop()(ContentComponent)
  const wrapper = mount(<TestComponent isOpen />)
  const o = document.querySelector('.content')

  expect(o).toBeTruthy()
  expect(o.innerHTML).toContain('Content')

  wrapper.unmount()
})

test('Can pass className to composed component', () => {
  const TestComponent = Drop()(ContentComponent)
  const wrapper = mount(<TestComponent className='ron' isOpen />)
  const o = document.querySelector('.content')

  expect(o.classList.contains('ron')).toBeTruthy()

  wrapper.unmount()
})

test('Can styles to composed component', () => {
  const TestComponent = Drop()(ContentComponent)
  const wrapper = mount(<TestComponent style={{background: 'red'}} isOpen />)
  const o = document.querySelector('.content')

  expect(o.style.background).toBe('red')

  wrapper.unmount()
})

test('Adds default ID', () => {
  const TestComponent = Drop()(ContentComponent)
  const wrapper = mount(<TestComponent isOpen />)
  const o = document.body.childNodes[0]

  expect(o.id).toContain('Drop')

  wrapper.unmount()
})

test('Override default ID with options', () => {
  const options = {
    id: 'Brick'
  }
  const TestComponent = Drop(options)(ContentComponent)
  const wrapper = mount(<TestComponent isOpen />)
  const o = document.body.childNodes[0]

  expect(o.id).toContain('Brick')

  wrapper.unmount()
})

describe('Trigger', () => {
  test('Can render', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = shallow(
      <TestComponent isOpen trigger={trigger} />
    )
    const el = wrapper.find('.trigger')

    expect(el.exists()).toBeTruthy()
    expect(el.text()).toBe('Trigger')
  })

  test('Automatically receives click event', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = shallow(<TestComponent isOpen trigger={trigger} />)
    const el = wrapper.find('.trigger')

    expect(el.prop('onClick')).toBeInstanceOf(Function)
  })
})
