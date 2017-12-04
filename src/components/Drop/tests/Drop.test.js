import React from 'react'
import { mount, shallow } from 'enzyme'
import Drop from '..'
import classNames from '../../../utilities/classNames'
import wait from '../../../tests/helpers/wait'

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

test('Can create a component as a HOC', (done) => {
  const TestComponent = Drop()(ContentComponent)
  const wrapper = mount(<TestComponent isOpen />)

  wait()
    .then(() => {
      const o = document.querySelector('.content')

      expect(o).toBeTruthy()
      expect(o.innerHTML).toContain('Content')
      wrapper.unmount()
      done()
    })
})

test('Can pass className to composed component', (done) => {
  const TestComponent = Drop()(ContentComponent)
  const wrapper = mount(<TestComponent className='ron' isOpen />)

  wait()
    .then(() => {
      const o = document.querySelector('.content')

      expect(o.classList.contains('ron')).toBeTruthy()
      wrapper.unmount()
      done()
    })
})

test('Should not steal composed component custom className', (done) => {
  const TestComponent = Drop()(ContentComponent)
  const wrapper = mount(<TestComponent className='ron' isOpen />)

  wait()
    .then(() => {
      const o = document.querySelector('.c-Drop')
      const content = document.querySelector('.content')

      expect(o.classList.contains('ron')).not.toBeTruthy()
      expect(content.classList.contains('ron')).toBeTruthy()
      wrapper.unmount()
      done()
    })
})

test('Can styles to composed component', (done) => {
  const TestComponent = Drop()(ContentComponent)
  const wrapper = mount(<TestComponent style={{background: 'red'}} isOpen />)

  wait()
    .then(() => {
      const o = document.querySelector('.content')

      expect(o.style.background).toBe('red')
      wrapper.unmount()
      done()
    })
})

test('Adds default ID', (done) => {
  const TestComponent = Drop()(ContentComponent)
  const wrapper = mount(<TestComponent isOpen />)

  wait()
    .then(() => {
      const o = document.body.childNodes[0]

      expect(o.id).toContain('Drop')
      wrapper.unmount()
      done()
    })
})

test('Override default ID with options', (done) => {
  const options = {
    id: 'Brick'
  }
  const TestComponent = Drop(options)(ContentComponent)
  const wrapper = mount(<TestComponent isOpen />)

  wait()
    .then(() => {
      const o = document.body.childNodes[0]

      expect(o.id).toContain('Brick')
      wrapper.unmount()
      done()
    })
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
