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
  mount(<TestComponent isOpen />)
  const o = document.querySelector('.content')

  expect(o).toBeTruthy()
  expect(o.innerHTML).toContain('Content')
})

test('Can pass className to composed component', () => {
  const TestComponent = Drop()(ContentComponent)
  mount(<TestComponent className='ron' isOpen />)
  const o = document.querySelector('.content')

  expect(o.classList.contains('ron')).toBeTruthy()
})

test('Should not steal composed component custom className', () => {
  const TestComponent = Drop()(ContentComponent)
  mount(<TestComponent className='ron' isOpen />)
  const o = document.querySelector('.c-Drop')
  const content = document.querySelector('.content')

  expect(o.classList.contains('ron')).not.toBeTruthy()
  expect(content.classList.contains('ron')).toBeTruthy()
})

test('Can styles to composed component', () => {
  const TestComponent = Drop()(ContentComponent)
  mount(<TestComponent style={{background: 'red'}} isOpen />)
  const o = document.querySelector('.content')

  expect(o.style.background).toBe('red')
})

test('Adds default ID', () => {
  const TestComponent = Drop()(ContentComponent)
  mount(<TestComponent isOpen />)
  const o = document.body.childNodes[0]

  expect(o.id).toContain('Drop')
})

test('Override default ID with options', () => {
  const options = {
    id: 'Brick'
  }
  const TestComponent = Drop(options)(ContentComponent)
  mount(<TestComponent isOpen />)
  const o = document.body.childNodes[0]

  expect(o.id).toContain('Brick')
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
