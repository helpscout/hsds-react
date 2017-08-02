import React from 'react'
import { mount, shallow } from 'enzyme'
import Button from '..'

describe('ClassNames', () => {
  test('Accepts custom className', () => {
    const wrapper = shallow(<Button className='foo bar baz'>Click Me</Button>)
    const classNames = wrapper.prop('className')

    expect(classNames).toContain('c-Button')
    expect(classNames).toContain('foo')
    expect(classNames).toContain('bar')
    expect(classNames).toContain('baz')
  })
})

describe('Types', () => {
  test('Adds the respective classNames', () => {
    const primary = shallow(<Button primary>Primary</Button>)
    const plain = shallow(<Button plain>Plain</Button>)

    expect(primary.prop('className')).toContain('c-Button--primary')
    expect(plain.prop('className')).toContain('c-Button--link')
  })

  test('Creates a button with type="submit"', () => {
    const button = shallow(<Button submit>Submit</Button>)

    expect(button.prop('type')).toBe('submit')
  })
})

describe('Sizes', () => {
  test('Adds the respective classNames', () => {
    const lg = shallow(<Button size='lg'>Large</Button>)
    const md = shallow(<Button size='md'>Medium</Button>)
    const sm = shallow(<Button size='sm'>Small</Button>)

    expect(lg.prop('className')).toContain('c-Button--lg')
    expect(md.prop('className')).toContain('c-Button--md')
    expect(sm.prop('className')).toContain('c-Button--sm')
  })
})

describe('States', () => {
  test('Adds the respective classNames', () => {
    const success = shallow(<Button state='success'>Success</Button>)
    const error = shallow(<Button state='error'>Error</Button>)
    const warning = shallow(<Button state='warning'>Warning</Button>)

    expect(success.prop('className')).toContain('is-success')
    expect(error.prop('className')).toContain('is-error')
    expect(warning.prop('className')).toContain('is-warning')
  })

  test('Disables the button', () => {
    const callback = jest.fn()
    const disabledButton = mount(<Button disabled onClick={callback}>Disabled</Button>)
    disabledButton.simulate('click')

    expect(disabledButton.prop('disabled')).toBe(true)
    expect(callback).not.toBeCalled()
  })
})
