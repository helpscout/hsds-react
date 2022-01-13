import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './Button'
import Icon from '../Icon'
import userEvent from '@testing-library/user-event'
import { MemoryRouter as Router } from 'react-router-dom'

const wrap = fn => Component => fn(<Router>{Component}</Router>)
const renderWithRouter = wrap(render)

describe('ClassNames', () => {
  test('Accepts custom className', () => {
    const { getByTestId } = render(
      <Button className="foo bar baz">Click Me</Button>
    )

    expect(getByTestId('Button')).toHaveClass('foo')
    expect(getByTestId('Button')).toHaveClass('bar')
    expect(getByTestId('Button')).toHaveClass('baz')
  })
})

describe('Theme', () => {
  test('Adds the respective classNames', () => {
    const { getByTestId, rerender } = render(<Button theme="blue">blue</Button>)

    expect(getByTestId('Button')).toHaveClass('is-theme-blue')

    rerender(<Button theme="red">Red</Button>)
    expect(getByTestId('Button')).toHaveClass('is-theme-red')

    rerender(<Button theme="green">Red</Button>)
    expect(getByTestId('Button')).toHaveClass('is-theme-green')

    rerender(<Button linked>Plain</Button>)

    expect(getByTestId('Button')).toHaveClass('is-style-link')
  })

  test('Creates a button with type="submit"', () => {
    const { getByTestId } = render(<Button submit>Submit</Button>)

    expect(getByTestId('Button')).toHaveAttribute('type', 'submit')
  })
})

describe('Sizes', () => {
  test('Adds the respective classNames', () => {
    const { getByText } = render(
      <>
        <Button size="xl">ExtraLarge</Button>
        <Button size="lg">Large</Button>
        <Button size="md">Medium</Button>
        <Button size="sm">Small</Button>
        <Button size="xs">ExtraSmall</Button>
        <Button size="xxs">ExtraExtraSmall</Button>
        <Button>Default</Button>
      </>
    )
    expect(getByText('Default')).toHaveClass('is-size-lg')
    expect(getByText('ExtraExtraSmall')).toHaveClass('is-size-xxs')
    expect(getByText('ExtraSmall')).toHaveClass('is-size-xs')
    expect(getByText('Small')).toHaveClass('is-size-sm')
    expect(getByText('Medium')).toHaveClass('is-size-md')
    expect(getByText('Large')).toHaveClass('is-size-lg')
    expect(getByText('ExtraLarge')).toHaveClass('is-size-xl')
  })
})

describe('States', () => {
  test('Disables the button', () => {
    const callback = jest.fn()
    const { getByTestId } = render(
      <Button disabled onClick={callback}>
        Disabled
      </Button>
    )
    userEvent.click(getByTestId('Button'))

    expect(getByTestId('Button')).toBeDisabled()
    expect(callback).not.toHaveBeenCalled()
  })

  test('primary lg & xl have a minimum width of 120px', () => {
    const { getByTestId } = render(
      <Button theme="blue" size="lg">
        Button
      </Button>
    )

    const styles = window.getComputedStyle(getByTestId('Button'))
    expect(styles.getPropertyValue('min-width')).toBe('var(--buttonMinWidth)')
    expect(styles.getPropertyValue('--buttonMinWidth')).toBe('120px')
  })
})

describe('Styles', () => {
  test('Renders isFirst styles', () => {
    const { getByTestId } = render(<Button isFirst />)

    expect(getByTestId('Button')).toHaveClass('is-first')
  })

  test('Renders isNotOnly styles', () => {
    const { getByTestId } = render(<Button isNotOnly />)

    expect(getByTestId('Button')).toHaveClass('is-notOnly')
  })

  test('Renders isLast styles', () => {
    const { getByTestId } = render(<Button isLast />)

    expect(getByTestId('Button')).toHaveClass('is-last')
  })
})

describe('Events', () => {
  test('Fires onBlur callback', () => {
    const spy = jest.fn()
    const { getByTestId } = render(<Button onBlur={spy} />)

    fireEvent.blur(getByTestId('Button'))

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onClick callback', () => {
    const spy = jest.fn()
    const { getByTestId } = render(<Button onClick={spy} />)

    userEvent.click(getByTestId('Button'))

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onFocus callback', () => {
    const spy = jest.fn()
    const { getByTestId } = render(<Button onFocus={spy} />)

    getByTestId('Button').focus()

    expect(spy).toHaveBeenCalled()
  })
})

describe('Icon', () => {
  test('Can render an Icon', () => {
    const { container } = render(
      <Button>
        <Icon />
      </Button>
    )

    expect(container.querySelector('.c-Icon')).toBeTruthy()
  })

  test('Can render an Icon + Text', () => {
    const { getByTestId, container } = render(
      <Button>
        <Icon /> News
      </Button>
    )

    expect(container.querySelector('.c-Icon')).toBeTruthy()
    expect(getByTestId('Button')).toHaveTextContent('News')
  })

  test('Provides Icon with offsetLeft prop', () => {
    const { getByTestId, container } = render(
      <Button>
        <Icon /> News
      </Button>
    )

    expect(container.querySelector('.c-Icon')).toHaveClass('is-offsetLeft')
    expect(container.querySelector('.c-Icon')).not.toHaveClass('is-offsetRight')

    expect(getByTestId('Button')).toHaveTextContent('News')
  })

  test('Provides Icon with offsetRight prop', () => {
    const { getByTestId, container } = render(
      <Button>
        News <Icon />
      </Button>
    )

    expect(container.querySelector('.c-Icon')).not.toHaveClass('is-offsetLeft')
    expect(container.querySelector('.c-Icon')).toHaveClass('is-offsetRight')
    expect(getByTestId('Button')).toHaveTextContent('News')
  })
})

describe('Content event propagation', () => {
  test('Allows content event propagation by default', () => {
    const spy = jest.fn()
    const { container } = render(
      <Button onClick={spy}>
        <Icon />
      </Button>
    )
    userEvent.click(container.querySelector('.c-Icon'))

    expect(spy).toHaveBeenCalled()
  })
})

describe('Link', () => {
  test('Can render a link, if href is defined', () => {
    const { getByText } = renderWithRouter(<Button href="/" />)

    expect(
      getByText((content, element) => {
        return element.tagName.toLowerCase() === 'a'
      })
    ).toBeTruthy()
  })

  test('Can render a link, if to is defined', () => {
    const { getByText } = renderWithRouter(<Button to="/" />)
    expect(
      getByText((content, element) => {
        return element.tagName.toLowerCase() === 'a'
      })
    ).toBeTruthy()
  })

  test('Can render a link based props', () => {
    const { getByTestId } = renderWithRouter(
      <Button href="/" target="_blank" />
    )

    expect(getByTestId('Button')).toHaveAttribute('target', '_blank')
  })

  test('Render a button element type', () => {
    const { getByText } = renderWithRouter(<Button />)
    expect(
      getByText((content, element) => {
        return element.tagName.toLowerCase() === 'button'
      })
    ).toBeTruthy()
  })
})

describe('Loading', () => {
  test('Add loading className, if isLoading', () => {
    const { getByTestId } = render(<Button loading />)

    expect(getByTestId('Button')).toHaveClass('is-loading')
  })

  test('Renders a spinner if isLoading', () => {
    const { container } = render(<Button loading />)
    expect(container.querySelector('.c-Spinner')).toBeTruthy()
  })

  test('Does not renders a spinner if not isLoading', () => {
    const { container } = render(<Button />)
    expect(container.querySelector('.c-Spinner')).toBeFalsy()
  })

  test('Becomes disabled if isLoading, by default', () => {
    const { getByTestId } = render(<Button loading />)
    expect(getByTestId('Button')).toBeDisabled()
  })
})
