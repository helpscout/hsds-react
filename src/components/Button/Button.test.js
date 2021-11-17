import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './Button'
import Icon from '../Icon'
import userEvent from '@testing-library/user-event'

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

describe('Kind', () => {
  test('Adds the respective classNames', () => {
    const { getByTestId, rerender } = render(
      <Button kind="primary">Primary</Button>
    )

    expect(getByTestId('Button')).toHaveClass('is-primary')

    rerender(<Button kind="link">Plain</Button>)

    expect(getByTestId('Button')).toHaveClass('is-link')
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
        <Button size="lgxl">LargeExtraLarge</Button>
        <Button size="xl">ExtraLarge</Button>
        <Button size="lg">Large</Button>
        <Button size="md">Medium</Button>
        <Button size="sm">Small</Button>
        <Button size="xs">ExtraSmall</Button>
        <Button size="xxs">ExtraExtraSmall</Button>
        <Button>Default</Button>
      </>
    )
    expect(getByText('Default')).toHaveClass('is-md')
    expect(getByText('ExtraExtraSmall')).toHaveClass('is-xxs')
    expect(getByText('ExtraSmall')).toHaveClass('is-xs')
    expect(getByText('Small')).toHaveClass('is-sm')
    expect(getByText('Medium')).toHaveClass('is-md')
    expect(getByText('Large')).toHaveClass('is-lg')
    expect(getByText('ExtraLarge')).toHaveClass('is-xl')
    expect(getByText('LargeExtraLarge')).toHaveClass('is-xl')
  })
})

describe('States', () => {
  test('Adds the respective classNames', () => {
    const { getByText } = render(
      <>
        <Button state="success">Success</Button>
        <Button state="danger">Danger</Button>
        <Button state="warning">Warning</Button>
      </>
    )

    expect(getByText('Success')).toHaveClass('is-success')
    expect(getByText('Danger')).toHaveClass('is-danger')
    expect(getByText('Warning')).toHaveClass('is-warning')
  })

  test('Adds the active classNames', () => {
    const { getByTestId } = render(<Button isActive>Button</Button>)

    expect(getByTestId('Button')).toHaveClass('is-active')
  })

  test('Adds the focus classNames', () => {
    const { getByTestId } = render(<Button isFocused>Button</Button>)

    expect(getByTestId('Button')).toHaveClass('is-focused')
  })

  test('Adds the hover classNames', () => {
    const { getByTestId } = render(<Button isHovered>Button</Button>)

    expect(getByTestId('Button')).toHaveClass('is-hovered')
  })

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
      <Button kind="primary" size="lg">
        Button
      </Button>
    )

    const styles = window.getComputedStyle(getByTestId('Button'))
    expect(styles.getPropertyValue('min-width')).toBe('var(--buttonMinWidth)')
    expect(styles.getPropertyValue('--buttonMinWidth')).toBe('120px')
  })
})

describe('Styles', () => {
  test('Applies suffix styles', () => {
    const { getByTestId } = render(<Button isSuffix>Click Me</Button>)

    expect(getByTestId('Button')).toHaveClass('is-suffix')
  })
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

describe('Themes', () => {
  test('Can add theme className', () => {
    const { getByTestId } = render(<Button theme="editing" />)

    expect(getByTestId('Button')).toHaveClass('is-editing')
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
    const { getByText } = render(<Button href="/" />)

    expect(
      getByText((content, element) => {
        return element.tagName.toLowerCase() === 'a'
      })
    ).toBeTruthy()
  })

  test('Can render a link, if to is defined', () => {
    const { getByText } = render(<Button to="/" />)
    expect(
      getByText((content, element) => {
        return element.tagName.toLowerCase() === 'a'
      })
    ).toBeTruthy()
  })

  test('Can render a link based props', () => {
    const { getByTestId } = render(<Button href="/" target="_blank" />)

    expect(getByTestId('Button')).toHaveAttribute('target', '_blank')
  })

  test('Render a button element type', () => {
    const { getByText } = render(<Button />)
    expect(
      getByText((content, element) => {
        return element.tagName.toLowerCase() === 'button'
      })
    ).toBeTruthy()
  })
})

describe('Loading', () => {
  test('Add loading className, if isLoading', () => {
    const { getByTestId } = render(<Button isLoading />)

    expect(getByTestId('Button')).toHaveClass('is-loading')
  })

  test('Renders a spinner if isLoading', () => {
    const { container } = render(<Button isLoading />)
    expect(container.querySelector('.c-Spinner')).toBeTruthy()
  })

  test('Does not renders a spinner if not isLoading', () => {
    const { container } = render(<Button isLoading={false} />)
    expect(container.querySelector('.c-Spinner')).toBeFalsy()
  })

  test('Becomes disabled if isLoading, by default', () => {
    const { getByTestId } = render(<Button isLoading />)
    expect(getByTestId('Button')).toBeDisabled()
  })
})
