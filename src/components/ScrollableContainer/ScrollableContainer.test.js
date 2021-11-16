import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {
  ScrollableContainerUI,
  HeaderUI,
  BodyUI,
  FooterUI,
} from './ScrollableContainer.storiesHelpers'

describe('renders', () => {
  test('Should render and scroll', async () => {
    const { container } = render(
      <ScrollableContainerUI
        header={
          <HeaderUI
            className="TESTING__HEADER"
            data-testprop="This gets passed"
          >
            <h1>Heading</h1>
          </HeaderUI>
        }
        body={
          <BodyUI className="TESTING__BODY">
            <p>
              Ullamco reprehenderit in irure officia dolore anim eiusmod labore
              duis ea laborum ex. Reprehenderit consequat officia ea id ex
              exercitation et sit et. Velit velit aliqua occaecat quis occaecat.
              Enim incididunt est velit pariatur adipisicing labore dolore anim
              cillum.
            </p>
            <p>
              Ullamco reprehenderit in irure officia dolore anim eiusmod labore
              duis ea laborum ex. Reprehenderit consequat officia ea id ex
              exercitation et sit et. Velit velit aliqua occaecat quis occaecat.
              Enim incididunt est velit pariatur adipisicing labore dolore anim
              cillum.
            </p>
            <p>
              Ullamco reprehenderit in irure officia dolore anim eiusmod labore
              duis ea laborum ex. Reprehenderit consequat officia ea id ex
              exercitation et sit et. Velit velit aliqua occaecat quis occaecat.
              Enim incididunt est velit pariatur adipisicing labore dolore anim
              cillum.
            </p>
            <p>
              Ullamco reprehenderit in irure officia dolore anim eiusmod labore
              duis ea laborum ex. Reprehenderit consequat officia ea id ex
              exercitation et sit et. Velit velit aliqua occaecat quis occaecat.
              Enim incididunt est velit pariatur adipisicing labore dolore anim
              cillum.
            </p>
            <p>
              Ullamco reprehenderit in irure officia dolore anim eiusmod labore
              duis ea laborum ex. Reprehenderit consequat officia ea id ex
              exercitation et sit et. Velit velit aliqua occaecat quis occaecat.
              Enim incididunt est velit pariatur adipisicing labore dolore anim
              cillum.
            </p>
            <p>
              Ullamco reprehenderit in irure officia dolore anim eiusmod labore
              duis ea laborum ex. Reprehenderit consequat officia ea id ex
              exercitation et sit et. Velit velit aliqua occaecat quis occaecat.
              Enim incididunt est velit pariatur adipisicing labore dolore anim
              cillum.
            </p>
          </BodyUI>
        }
        footer={<FooterUI className="TESTING__FOOTER">Footer</FooterUI>}
      />
    )

    const containerScroll = container.querySelector('.c-ScrollableContainer')
    const header = container.querySelector('.ScrollableContainer__Header')
    const body = container.querySelector('.ScrollableContainer__Body')
    const footer = container.querySelector('.ScrollableContainer__Footer')

    // Elements present
    expect(containerScroll).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(body).toBeInTheDocument()
    expect(footer).toBeInTheDocument()

    // Passing custom classnames
    expect(header.classList.contains('TESTING__HEADER')).toBeTruthy()
    expect(body.classList.contains('TESTING__BODY')).toBeTruthy()
    expect(footer.classList.contains('TESTING__FOOTER')).toBeTruthy()

    // Correct layout styles
    expect(window.getComputedStyle(containerScroll).display).toBe('flex')
    expect(window.getComputedStyle(containerScroll).flexDirection).toBe(
      'column'
    )
    expect(window.getComputedStyle(containerScroll).flexGrow).toBe('1')
    expect(window.getComputedStyle(containerScroll).overflow).toBe('hidden')
    expect(window.getComputedStyle(body).overflow).toBe('auto')
    expect(window.getComputedStyle(body).flexGrow).toBe('1')
    expect(window.getComputedStyle(header).zIndex).toBe('3')
    expect(window.getComputedStyle(footer).zIndex).toBe('3')

    // starter shadows
    expect(header.getAttribute('style')).toBeFalsy()
    expect(footer.getAttribute('style')).toBeFalsy()

    await fireEvent.scroll(body, {
      y: 100,
    })

    // scrolled shadows
    expect(header.getAttribute('style')).toContain('--scroll-shadow')
    expect(footer.getAttribute('style')).toContain('--scroll-shadow')
  })
})
