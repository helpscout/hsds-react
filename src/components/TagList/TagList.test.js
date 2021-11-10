import React from 'react'

import { render, fireEvent, act, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'

import TagList from './TagList'
import Tag from '../Tag'

describe('ClassName', () => {
  test('Has default className', () => {
    const { getByTestId } = render(<TagList />)

    expect(getByTestId('TagList')).toHaveClass('c-TagList')
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const { getByTestId } = render(<TagList className={customClass} />)

    expect(getByTestId('TagList')).toHaveClass(customClass)
  })
})

describe('isRemovable', () => {
  test('Is not enabled by default', () => {
    const { queryByTestId } = render(
      <TagList>
        <Tag />
      </TagList>
    )

    expect(queryByTestId('RemoveTag')).toBeFalsy()
  })

  test('Makes inner tags removable, if specified', () => {
    const { queryByTestId } = render(
      <TagList isRemovable>
        <Tag />
      </TagList>
    )
    expect(queryByTestId('RemoveTag')).toBeTruthy()
  })
})

describe('onRemove', () => {
  test('Fires callback from tag, if specified', () => {
    const spy = jest.fn()

    const { queryAllByTestId } = render(
      <TagList onRemove={spy} isRemovable>
        <Tag id={1} />
        <Tag id={2} />
      </TagList>
    )
    user.click(queryAllByTestId('RemoveTag')[0])
    fireEvent.transitionEnd(queryAllByTestId('TagGroup')[0])

    expect(spy).toHaveBeenCalled()
  })
})

describe('clearAll', () => {
  test('Adds a clearAll button if more than one tag', () => {
    const { getByTestId } = render(
      <TagList clearAll>
        <Tag id={1} />
        <Tag id={2} />
      </TagList>
    )
    expect(getByTestId('TagList.ClearAll')).toBeTruthy()
  })

  test('Does not Add a clearAll button if list contains less or equal than one tag', () => {
    const { queryByTestId } = render(
      <TagList clearAll>
        <Tag id={1} />
      </TagList>
    )
    expect(queryByTestId('TagList.ClearAll')).toBeFalsy()
  })

  test('Fires callback from clearAll button, if specified', () => {
    const spy = jest.fn()

    const { getByTestId } = render(
      <TagList onRemoveAll={spy} isRemovable clearAll>
        <Tag id={1} />
        <Tag id={2} />
      </TagList>
    )

    user.click(getByTestId('TagList.ClearAll'))

    expect(spy).toHaveBeenCalled()
  })
})

describe('Overflow', () => {
  test('Does not contain content in Overflow by default', () => {
    const { container } = render(
      <TagList>
        <Tag />
      </TagList>
    )

    expect(container.querySelector('.c-Overflow')).toBeFalsy()
  })

  test('Wraps content in Overflow, if specified', () => {
    const { container } = render(
      <TagList overflowFade>
        <Tag />
      </TagList>
    )

    expect(container.querySelector('.c-Overflow')).toBeTruthy()
  })
})

describe.only('Limit', () => {
  test('Display all tags if there is no limit', () => {
    const { queryAllByTestId } = render(
      <TagList>
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </TagList>
    )

    expect(queryAllByTestId('Tag').length).toBe(4)
  })

  test('Limits the number of tag displayed', () => {
    const { queryAllByTestId } = render(
      <TagList limit={2}>
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </TagList>
    )

    expect(queryAllByTestId('Tag').length).toBe(2)
  })

  test('Shows a +X button with the hidden items length', () => {
    const { getByText } = render(
      <TagList limit={2}>
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </TagList>
    )

    expect(getByText('+4')).toBeTruthy()
  })

  test('ClearAll is not active when there is a limit', () => {
    const { queryByTestId } = render(
      <TagList limit={2} clearAll>
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </TagList>
    )

    expect(queryByTestId('TagList.ClearAll')).toBeFalsy()
  })

  test('Clicking on the +X button will display all tags', async () => {
    const { queryAllByTestId, findByText } = render(
      <TagList limit={2}>
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </TagList>
    )

    const plusbutton = await findByText('+4')
    user.click(plusbutton)

    await waitFor(() => {
      expect(queryAllByTestId('Tag').length).toBe(6)
    })
  })
})
