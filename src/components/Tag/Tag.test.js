import React from 'react'
import { mount } from 'enzyme'

import { render, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'

import { Tag } from './Tag'
import { Animate, Icon, Text } from '../index'

jest.useFakeTimers()

describe('ClassNames', () => {
  test('Has default className', () => {
    const { getByTestId } = render(<Tag />)

    expect(getByTestId('Tag')).toHaveClass('c-Tag')
  })

  test('Accepts custom classNames', () => {
    const { getByTestId } = render(<Tag className="mugatu" />)

    expect(getByTestId('Tag')).toHaveClass('mugatu')
  })
})

describe('Content', () => {
  test('Renders children', () => {
    const { getByText } = render(<Tag>Mugatu</Tag>)
    expect(getByText('Mugatu')).toBeTruthy()
  })

  test('Renders value as children', () => {
    const { getByText } = render(<Tag value="Mugatu" />)
    expect(getByText('Mugatu')).toBeTruthy()
  })

  test('Renders value over children', () => {
    const { getByText, queryByText } = render(
      <Tag value="Mugatu">children</Tag>
    )
    expect(getByText('Mugatu')).toBeTruthy()
    expect(queryByText('children')).toBeFalsy()
  })
})

describe('Remove', () => {
  test('Is not removable by default', () => {
    const { queryByTestId } = render(<Tag />)
    expect(queryByTestId('RemoveTag')).toBeFalsy()
  })

  test('Renders remove Icon if isRemovable', () => {
    const { queryByTestId } = render(<Tag isRemovable />)
    expect(queryByTestId('RemoveTag')).toBeTruthy()
  })

  test('Does not fire callback on unmount', () => {
    const spy = jest.fn()
    const wrapper = mount(<Tag onRemove={spy} />)

    wrapper.unmount()
    expect(spy).not.toHaveBeenCalled()
  })

  test('Fires callback on remove click', () => {
    const spy = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <Tag isRemovable onRemove={spy} id={1} value="Ron" />
    )
    user.click(getByTestId('RemoveTag'))
    fireEvent.transitionEnd(queryByTestId('TagGroup'))
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0].id).toBe(1)
    expect(spy.mock.calls[0][0].value).toBe('Ron')
  })
})

describe('Styles', () => {
  test('Has allCaps styles', () => {
    const { getByTestId } = render(<Tag allCaps />)
    expect(getByTestId('Tag')).toHaveClass('is-all-caps')
    expect(getByTestId('Tag')).toHaveStyle('text-transform: uppercase;')
  })

  test('Has color styles', () => {
    const { getByTestId } = render(<Tag color="red" />)
    expect(getByTestId('Tag')).toHaveClass('is-red')
  })

  test('Has size styles', () => {
    const { getByTestId } = render(<Tag size="md" />)
    expect(getByTestId('Tag')).toHaveClass('is-md')
  })

  test('Has display flex styles', () => {
    const { getByTestId } = render(<Tag display="block" />)

    expect(getByTestId('TagGroup')).toHaveClass('is-display-block')
    expect(getByTestId('TagGroup')).toHaveStyle('display: flex;')
  })
  test('Has display inline-flex styles', () => {
    const { getByTestId } = render(<Tag display="inline" />)

    expect(getByTestId('TagGroup')).toHaveClass('is-display-inline')
    expect(getByTestId('TagGroup')).toHaveStyle('display: inline-flex;')
  })

  test('Has filled styles', () => {
    const { getByTestId } = render(<Tag filled />)
    expect(getByTestId('Tag')).toHaveClass('is-filled')
  })
})

describe('count', () => {
  test('Keeps count hidden if size if sm', () => {
    const { queryByTestId } = render(<Tag count={125} size="sm" />)
    expect(queryByTestId('Tag.Count')).toBeFalsy()
  })
  test('Keeps count hidden if size if md', () => {
    const { queryByTestId } = render(<Tag count={125} size="md" />)
    expect(queryByTestId('Tag.Count')).toBeFalsy()
  })
  test('Renders a count element if size if lg', () => {
    const { queryByTestId, getByText } = render(<Tag count={125} size="lg" />)
    expect(queryByTestId('Tag.Count')).toBeTruthy()
    expect(getByText('125')).toBeTruthy()
  })
})
describe('clickable', () => {
  test('onClick set the tag as clickable', () => {
    const spy = jest.fn()
    const { getByTestId } = render(<Tag onClick={spy} id={1} value="Ron" />)
    user.click(getByTestId('Tag'))
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][1].id).toBe(1)
    expect(spy.mock.calls[0][1].value).toBe('Ron')
  })
  test('href set the tag as clickable', () => {
    const { getByRole } = render(<Tag href="http://google.com/" />)

    expect(getByRole('link')).toHaveAttribute('href', 'http://google.com/')
  })
})
