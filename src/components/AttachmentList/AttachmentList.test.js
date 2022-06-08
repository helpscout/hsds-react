import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from 'enzyme'
import { AttachmentList } from './AttachmentList'
import { Attachment, Icon } from '../index'
import userEvent from '@testing-library/user-event'

const ui = {
  content: '.c-AttachmentList__content',
  download: '.AttachmentList__DownloadAll',
}

describe('ClassName', () => {
  test('Has default className', () => {
    const { getByTestId } = render(<AttachmentList />)

    expect(getByTestId('AttachmentList')).toHaveClass('c-AttachmentList')
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const { getByTestId } = render(<AttachmentList className={customClass} />)
    expect(getByTestId('AttachmentList')).toHaveClass(customClass)
  })
})

describe('Custom attributes', () => {
  test('Can render custom HTML attributes', () => {
    const { getByTestId, container } = render(
      <AttachmentList data-tie="piano-key" />
    )

    expect(getByTestId('AttachmentList')).toHaveAttribute(
      'data-tie',
      'piano-key'
    )
  })
})

describe('Children', () => {
  test('Does not render non-Attachment child content', () => {
    const { container } = render(
      <AttachmentList>
        <div className="child">Hello</div>
      </AttachmentList>
    )

    expect(container.querySelector('div.child')).toBeFalsy()
  })

  test('Renders Attachment children', () => {
    const { queryAllByTestId } = render(
      <AttachmentList showDownloadAll={false}>
        <Attachment />
        <Attachment />
        <Attachment />
      </AttachmentList>
    )

    expect(queryAllByTestId('Attachment').length).toBe(3)
  })
})

describe('Download All', () => {
  test('Does not render if there is only 1 attachment', () => {
    const { queryAllByTestId, container } = render(
      <AttachmentList>
        <Attachment />
      </AttachmentList>
    )

    expect(queryAllByTestId('Attachment').length).toBe(1)
    expect(container.querySelector(ui.download)).toBeFalsy()
  })

  test('Renders by default for more than 1 attachment', () => {
    const { container } = render(
      <AttachmentList>
        <Attachment />
        <Attachment />
      </AttachmentList>
    )

    expect(container.querySelector(ui.download)).toBeTruthy()
  })

  test('Can be disabled', () => {
    const { queryAllByTestId, container } = render(
      <AttachmentList showDownloadAll={false}>
        <Attachment />
        <Attachment />
      </AttachmentList>
    )

    expect(queryAllByTestId('Attachment').length).toBe(2)
    expect(container.querySelector(ui.download)).toBeFalsy()
  })

  test('Fires callback on click', () => {
    const spy = jest.fn()
    const { container } = render(
      <AttachmentList onDownloadAllClick={spy}>
        <Attachment />
        <Attachment />
      </AttachmentList>
    )

    userEvent.click(container.querySelector(ui.download))

    expect(spy).toHaveBeenCalled()
  })
})

describe('Icon', () => {
  test('Has Attachment Icon', () => {
    const { container } = render(<AttachmentList />)
    const o = container.querySelector('.c-Icon')
    expect(o).toBeTruthy()
    expect(o).toHaveAttribute('data-icon-name', 'attachment')
  })
})

describe('Theme', () => {
  test('Renders default theme styles, if wrapped in Provider', () => {
    const { getByTestId } = render(
      <Attachment.Provider>
        <AttachmentList />
      </Attachment.Provider>
    )
    const o = getByTestId('AttachmentList')

    expect(o).toBeTruthy()
    expect(o).toHaveClass('is-theme-default')
  })

  test('Renders theme styles, if provided', () => {
    const { getByTestId } = render(
      <Attachment.Provider theme="preview">
        <AttachmentList />
      </Attachment.Provider>
    )
    const o = getByTestId('AttachmentList')

    expect(o).toBeTruthy()
    expect(o).toHaveClass('is-theme-preview')
  })
})

describe('New attachments', () => {
  test('Scrolls to end when a new attachment is added', () => {
    const spy = jest.fn()
    const { rerender } = render(<AttachmentList onScrollEnd={spy} />)

    rerender(
      <AttachmentList onScrollEnd={spy}>
        <Attachment />
        <Attachment />
        <Attachment />
      </AttachmentList>
    )

    expect(spy).toHaveBeenCalled()
  })
})
