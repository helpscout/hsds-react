import * as React from 'react'
import { mount } from 'enzyme'
import FormGroup from './FormGroup'
import FormGroupChoice from './FromGroup.Choice'
import Grid from './FromGroup.Grid'
import { default as GridComponent } from '../Grid'

describe('FormGroup', () => {
  describe('ClassName', () => {
    test('Applies custom className if specified', () => {
      const customClass = 'piano-key-neck-tie'
      const wrapper = mount(<FormGroup className={customClass} />)

      expect(wrapper.getDOMNode().classList.contains(customClass)).toBe(true)
    })
  })

  describe('FormGroup Children', () => {
    test('Renders child content', () => {
      const wrapper = mount(
        <FormGroup>
          <div className="child">Hello</div>
        </FormGroup>
      )
      const el = wrapper.find('div.child')

      expect(el.text()).toContain('Hello')
    })
  })
})

describe('FormGroupChoice', () => {
  describe('ClassName', () => {
    test('Applies custom className if specified', () => {
      const customClass = 'piano-key-neck-tie'
      const wrapper = mount(<FormGroupChoice className={customClass} />)

      expect(wrapper.getDOMNode().classList.contains(customClass)).toBe(true)
    })
  })

  describe('FormGroupChoice Children', () => {
    test('Renders child content', () => {
      const wrapper = mount(
        <FormGroupChoice>
          <div className="child">Hello</div>
        </FormGroupChoice>
      )
      const el = wrapper.find('div.child')

      expect(el.text()).toContain('Hello')
    })
  })

  describe('FormGroupChoice Styles', () => {
    test('Renders responsive styles, if specified', () => {
      const wrapper = mount(<FormGroupChoice isResponsive />)

      expect(wrapper.getDOMNode().classList.contains('is-responsive')).toBe(
        true
      )
    })
  })
})

describe('Grid ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = mount(<Grid />)

    expect(
      wrapper.getDOMNode().classList.contains('c-FormGroupGrid')
    ).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = mount(<Grid className="mugatu" />)

    expect(wrapper.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Grid Children', () => {
  test('Renders the Grid component', () => {
    const wrapper = mount(
      <Grid>
        <div className="mugatu" />
      </Grid>
    )

    const o = wrapper.find(GridComponent)

    expect(o.length).toBeTruthy()
  })

  test('Can render child components', () => {
    const wrapper = mount(
      <Grid>
        <div className="mugatu" />
      </Grid>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Grid Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = mount(<Grid style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})
