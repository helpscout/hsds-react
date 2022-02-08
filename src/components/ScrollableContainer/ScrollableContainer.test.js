import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {
  ScrollableContainerUI,
  HeaderUI,
  BodyUI,
  FooterUI,
  SimpleBarExample,
} from './ScrollableContainer.storiesHelpers'

jest.useFakeTimers()

describe('renders', () => {
  beforeAll(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
  })

  afterAll(() => {
    window.ResizeObserver = undefined
  })

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
    const header = container.querySelector('.ScrollableContainer__header')
    const body = container.querySelector('.ScrollableContainer__body')
    const footer = container.querySelector('.ScrollableContainer__footer')

    // Elements present
    expect(containerScroll).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(body).toBeInTheDocument()
    expect(footer).toBeInTheDocument()

    // Passing custom classnames
    expect(header).toHaveClass('TESTING__HEADER')
    expect(header).toHaveAttribute('data-testprop')
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

  test('Should render with string sections', () => {
    const { container } = render(
      <ScrollableContainerUI
        header="Header section"
        body="Body section"
        footer="Footer section"
      />
    )

    const containerScroll = container.querySelector('.c-ScrollableContainer')
    const header = container.querySelector('.ScrollableContainer__header')
    const body = container.querySelector('.ScrollableContainer__body')
    const footer = container.querySelector('.ScrollableContainer__footer')

    // Elements present
    expect(containerScroll).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(body).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
    expect(header).toHaveTextContent('Header section')
    expect(body).toHaveTextContent('Body section')
    expect(footer).toHaveTextContent('Footer section')
  })

  test('Should render with string sections and simplebar', () => {
    const { container } = render(
      <ScrollableContainerUI
        header="Header section"
        body="Body section"
        footer="Footer section"
        withSimpleBar
      />
    )

    const containerScroll = container.querySelector('.c-ScrollableContainer')
    const header = container.querySelector('.ScrollableContainer__header')
    const body = container.querySelector('.ScrollableContainer__body')
    const footer = container.querySelector('.ScrollableContainer__footer')
    const simplebar = container.querySelector('[data-simplebar]')

    // Elements present
    expect(simplebar).toBeInTheDocument()
    expect(containerScroll).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(body).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
    expect(header).toHaveTextContent('Header section')
    expect(body).toHaveTextContent('Body section')
    expect(footer).toHaveTextContent('Footer section')
  })

  test('Should work with simplebar', async () => {
    const { container } = render(
      <ScrollableContainerUI
        height="500px"
        withSimpleBar
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
    const simplebar = container.querySelector('[data-simplebar]')
    const scrollable = container.querySelector('.simplebar-content-wrapper')
    const header = container.querySelector('.ScrollableContainer__header')
    const body = container.querySelector('.ScrollableContainer__body')
    const footer = container.querySelector('.ScrollableContainer__footer')

    // Elements present
    expect(simplebar).toBeInTheDocument()
    expect(scrollable).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(body).toBeInTheDocument()
    expect(footer).toBeInTheDocument()

    // Passing custom classnames
    expect(header).toHaveClass('TESTING__HEADER')
    expect(header).toHaveAttribute('data-testprop')
    expect(body).toHaveClass('TESTING__BODY')
    expect(footer).toHaveClass('TESTING__FOOTER')

    expect(header).toHaveStyle('zIndex: 3')
    expect(footer).toHaveStyle('zIndex: 3')

    // starter shadows
    expect(header.getAttribute('style')).toBeFalsy()
    expect(header).not.toHaveAttribute('style')

    expect(containerScroll).toHaveStyle('height: calc(500px)')
    // Attempts to calculate the correct height for the simplebar content,
    // JSDOM doesn't support layout measurement so we just want to make sure the "calc" is in
    // the string
    expect(simplebar).toHaveStyle('height: calc(500px - 0px);')

    await fireEvent.scroll(scrollable, {
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

  test('should render nested', () => {
    const { container } = render(<SimpleBarExample />)

    const mainFooter = container.querySelector('.ScrollableContainer__footer')

    expect(mainFooter).toHaveClass('c-ScrollableContainer')
  })
})
