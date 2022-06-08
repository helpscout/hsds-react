import React from 'react'
import { render } from '@testing-library/react'
import Attachment from './Attachment'
import { Provider } from './index'
import userEvent from '@testing-library/user-event'

const ui = {
  closeButton: '.c-Attachment__closeButton',
  image: '.c-Attachment__image',
  name: '.c-Attachment__name',
  size: '.c-Attachment__size',
}

describe('ClassName', () => {
  test('Has default className', () => {
    const { getByTestId } = render(<Attachment />)
    expect(getByTestId('Attachment')).toHaveClass('c-Attachment')
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const { getByTestId } = render(<Attachment className={customClass} />)

    expect(getByTestId('Attachment')).toHaveClass(customClass)
  })
})

describe('Custom attributes', () => {
  test('Can render custom HTML attributes', () => {
    const { getByTestId } = render(<Attachment data-tie="piano-key" />)

    expect(getByTestId('Attachment')).toHaveAttribute('data-tie', 'piano-key')
  })
})

describe('Children', () => {
  test('Does not render child content', () => {
    const { container } = render(
      <Attachment>
        <div className="child">Hello</div>
      </Attachment>
    )

    expect(container.querySelector('div.child')).toBeFalsy()
  })
})

describe('Events', () => {
  test('onClick callback still fires', () => {
    const spy = jest.fn()
    const { getByTestId } = render(<Attachment onClick={spy} />)

    userEvent.click(getByTestId('Attachment'))

    expect(spy).toHaveBeenCalled()
  })

  test('onClick callback provides Attachment prop data', () => {
    const spy = jest.fn()
    const { getByTestId } = render(<Attachment name="file.png" onClick={spy} />)

    userEvent.click(getByTestId('Attachment'))
    const callbackData = spy.mock.calls[0][1]

    expect(typeof callbackData).toBe('object')
    expect(callbackData.name).toBe('file.png')
  })
})

describe('Size', () => {
  test('Does not render by default', () => {
    const { container } = render(<Attachment />)

    expect(container.querySelector(ui.size)).toBeFalsy()
  })

  test('Renders if size is provided', () => {
    const size = '5KB'
    const { container } = render(<Attachment size={size} />)

    expect(container.querySelector(ui.size)).toHaveTextContent(size)
  })
})

describe('TruncateLimit', () => {
  test('Can provide custom truncate limit', () => {
    const name = 'mr-mr-mr-mugatu.png'
    const { container } = render(
      <Attachment truncateLimit={10} name="mr-mr-mr-mugatu.png" />
    )
    const o = container.querySelector(ui.name)
    expect(o).not.toHaveTextContent(new RegExp(`^${name}$`))
    expect(o).toHaveTextContent('.png')
  })

  test('Does not truncate with a higher truncate limit', () => {
    const name = 'mr-mr-mr-mugatu.png'
    const { container } = render(
      <Attachment truncateLimit={100} name="mr-mr-mr-mugatu.png" />
    )
    const o = container.querySelector(ui.name)
    expect(o).toHaveTextContent(new RegExp(`^${name}$`))
  })
})

describe('Type', () => {
  test('Renders type-based style', () => {
    const { getByTestId, rerender } = render(<Attachment type="action" />)
    expect(getByTestId('Attachment')).toHaveClass('is-action')

    rerender(<Attachment type="link" />)

    expect(getByTestId('Attachment')).not.toHaveClass('is-action')
    expect(getByTestId('Attachment')).toHaveClass('is-link')
  })
})

describe('Theme', () => {
  test('Renders default theme styles, if wrapped in Provider', () => {
    const { queryByTestId } = render(
      <Provider>
        <Attachment type="action" />
      </Provider>
    )
    const o = queryByTestId('Attachment')

    expect(o).toBeTruthy()
    expect(o).toHaveClass('is-theme-default')
  })

  test('Renders theme styles, if provided', () => {
    const { queryByTestId } = render(
      <Provider theme="preview">
        <Attachment type="action" />
      </Provider>
    )
    const o = queryByTestId('Attachment')

    expect(o).toBeTruthy()
    expect(o).toHaveClass('is-theme-preview')
  })
})

describe('Image', () => {
  test('Adds image className if image is provided', () => {
    const { queryByTestId } = render(<Attachment imageUrl="image.png" />)
    const o = queryByTestId('Attachment')

    expect(o).toHaveClass('has-image')
  })
})

describe('Content', () => {
  test('Renders provided custom content', () => {
    const { container } = render(
      <Attachment
        name="custom content"
        content={<strong>My custom content</strong>}
      />
    )

    expect(container.querySelector('strong')).toBeTruthy()

    expect(container.querySelector(ui.name)).toBeFalsy()
    expect(container.querySelector(ui.image)).toBeFalsy()
  })
})

describe('CloseButton', () => {
  test('Does not render by default', () => {
    const { container } = render(<Attachment imageUrl="image.png" />)

    expect(container.querySelector(ui.closeButton)).toBeFalsy()
  })

  test('Renders if the theme is preview', () => {
    const { container } = render(
      <Provider theme="preview">
        <Attachment imageUrl="image.png" />
      </Provider>
    )
    expect(container.querySelector(ui.closeButton)).toBeTruthy()
  })

  test('Does not renders if the theme is preview but isRemovable prop is falsy', () => {
    const { container } = render(
      <Provider theme="preview">
        <Attachment imageUrl="image.png" isRemovable={false} />
      </Provider>
    )
    expect(container.querySelector(ui.closeButton)).toBeFalsy()
  })

  test('onRemoveClick callback fires when clicked', () => {
    const spy = jest.fn()
    const { container } = render(
      <Provider theme="preview">
        <Attachment imageUrl="image.png" onRemoveClick={spy} id="1" />
      </Provider>
    )
    const o = container.querySelector(ui.closeButton)

    userEvent.click(o)

    expect(o).toBeTruthy()
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][1].id).toBe('1')
  })
})

describe('Download', () => {
  test('Autofills download attributes if url is provided', () => {
    const { getByTestId } = render(<Attachment url="file.pdf" />)

    expect(getByTestId('Attachment')).toHaveAttribute('download')
    expect(getByTestId('Attachment')).toHaveAttribute('target', '_blank')
  })

  test('Does not provide valid download attributes if url is not provided', () => {
    const { getByTestId } = render(<Attachment />)

    expect(getByTestId('Attachment')).not.toHaveAttribute('download')
    expect(getByTestId('Attachment')).toHaveAttribute('target', '')
  })

  test('Does not swallow props.download if url is provided', () => {
    const { getByTestId } = render(
      <Attachment url="file.pdf" download={false} />
    )

    expect(getByTestId('Attachment')).not.toHaveAttribute('download')
  })

  test('Does not swallow props.target if url is provided', () => {
    const { getByTestId } = render(<Attachment url="file.pdf" target="_self" />)

    expect(getByTestId('Attachment')).toHaveAttribute('target', '_self')
  })
})

describe('State', () => {
  test('Renders state className', () => {
    const { getByTestId } = render(<Attachment url="file.pdf" state="error" />)

    expect(getByTestId('Attachment')).toHaveClass('is-error')
  })
})
