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
    expect(header).toHaveClass('TESTING__HEADER')
    expect(body).toHaveClass('TESTING__BODY')
    expect(footer).toHaveClass('TESTING__FOOTER')

    // Correct layout styles
    expect(containerScroll).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      flexGrow: '1',
      overflow: 'hidden',
    })
    expect(body).toHaveStyle({
      flexGrow: '1',
      overflow: 'auto',
    })
    expect(header).toHaveStyle('zIndex: 3')
    expect(footer).toHaveStyle('zIndex: 3')

    // starter shadows
    expect(header.getAttribute('style')).toBeFalsy()
    expect(header).not.toHaveAttribute('style')

    await fireEvent.scroll(body, {
      y: 100,
    })

    // scrolled shadows
    expect(header).toHaveAttribute(
      'style',
      expect.stringContaining('--scroll-shadow')
    )
    expect(footer).toHaveAttribute(
      'style',
      expect.stringContaining('--scroll-shadow')
    )
  })
})
