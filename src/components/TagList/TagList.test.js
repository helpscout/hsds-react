import React from 'react'

import { render, fireEvent } from '@testing-library/react'
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

  test('Does add a className to show all tags', () => {
    const { getByTestId } = render(
      <TagList showAll>
        <Tag />
      </TagList>
    )
    expect(getByTestId('TagList')).toHaveClass('is-showingAll')
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
