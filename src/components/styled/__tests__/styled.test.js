import React from 'react'
import { mount } from 'enzyme'
import styled, { ThemeProvider } from '../index'

const resetStyles = () => {
  document.head.innerHTML = ''
  styled.StyleSheet.__dangerouslyResetStyleSheet()
}

const getCSS = el => window.getComputedStyle(el)

describe('styled integration', () => {
  afterEach(() => {
    resetStyles()
  })

  describe('Components', () => {
    test('Can create a primitive component', () => {
      const Ron = styled.div`
        color: red;
        padding: 20px;
      `
      const wrapper = mount(<Ron />)
      const el = wrapper.find('div').node

      setTimeout(() => {
        expect(getCSS(el).color).toBe('red')
        expect(getCSS(el).padding).toBe('20px')
      })
    })

    test('Can style an existing component', () => {
      const Base = props => <div {...props} />

      const Ron = styled(Base)`
        color: red;
        padding: 20px;
      `
      const wrapper = mount(<Ron />)
      const el = wrapper.find('div').node

      setTimeout(() => {
        expect(getCSS(el).color).toBe('red')
        expect(getCSS(el).padding).toBe('20px')
      })
    })

    test('Supports css interpolationg with props', () => {
      const Ron = styled.div`
        color: red;
        padding: ${props => `${props['data-padding']}px;`};
      `
      const wrapper = mount(<Ron data-padding={108} />)
      const el = wrapper.find('div').node

      setTimeout(() => {
        expect(getCSS(el).color).toBe('red')
        expect(getCSS(el).padding).toBe('108px')
      })
    })
  })

  describe('Theming', () => {
    test('ThemeProvider can pass data down to styled components', () => {
      const Ron = styled.div`
        color: ${props => (props.theme === 'dark' ? 'black' : 'white')};
        padding: 20px;
      `
      const wrapper = mount(
        <div>
          <ThemeProvider theme="dark">
            <Ron />
          </ThemeProvider>
        </div>
      )
      const el = wrapper.find('div').node

      setTimeout(() => {
        expect(getCSS(el).color).toBe('black')
        expect(getCSS(el).padding).toBe('20px')
      })
    })
  })
})
