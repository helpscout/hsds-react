import * as React from 'react'
import { mount } from 'enzyme'
import styled, { ThemeProvider } from '../index'
import { resetStyles } from '../testHelpers'

describe('styled integration', () => {
  afterAll(() => {
    resetStyles()
  })

  describe('Components', () => {
    test('Can create a primitive component', () => {
      const Ron = styled('div')`
        color: red;
        padding: 20px;
      `
      const wrapper = mount(<Ron />)
      const el = wrapper.find('div').getDOMNode()

      expect(el).toBeTruthy()
    })

    test('Can style an existing component', () => {
      const Base = props => <div {...props} />

      const Ron = styled(Base)`
        color: red;
        padding: 20px;
      `
      mount(<Ron />)

      expect(document.head.innerHTML).toContain('color:red')
    })

    test('Supports css interpolationg with props', () => {
      const Ron = styled('div')`
        color: red;
        padding: ${props => `${props['data-padding']}px;`};
      `
      mount(<Ron data-padding={108} />)

      expect(document.head.innerHTML).toContain('padding:108')
    })
  })

  describe('Theming', () => {
    test('ThemeProvider can pass data down to styled components', () => {
      const Ron = styled('div')`
        color: ${props => (props.theme.dark ? 'black' : 'white')};
        padding: 20px;
      `
      mount(
        <div>
          <ThemeProvider theme={{ dark: true }}>
            <Ron />
          </ThemeProvider>
        </div>
      )

      expect(document.head.innerHTML).toContain('black')
    })
  })
})
