import React from 'react'
import { mount } from 'enzyme'
import { Pagination } from './Pagination'
import { NavigationUI, RangeUI, InformationUI } from './Pagination.css'
import { hasClass } from '../../tests/helpers/enzyme'
import { simulateKeyPress } from '../KeypressListener/KeypressListener.test'
import Keys from '../../constants/Keys'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Pagination />)

    expect(hasClass(wrapper, 'c-Pagination')).toBe(true)
  })
  test('Add custom className', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Pagination className={customClass} />)

    expect(hasClass(wrapper, customClass)).toBe(true)
  })
})
describe('Subject', () => {
  test('Does not render a subject by default', () => {
    const wrapper = mount(<Pagination />)
    const s = wrapper.find('.c-Pagination__subject')

    expect(s.length).not.toBeTruthy()
  })

  test('Renders a subject, if defined', () => {
    const subject = 'Customer'
    const wrapper = mount(<Pagination subject={subject} />)
    const s = wrapper.find('.c-Pagination__subject')

    expect(s.length).toBeTruthy()
    expect(s.text().trim()).toBe(subject)
  })

  test('Renders a space before the subject, if defined', () => {
    const subject = 'Customer'
    const wrapper = mount(<Pagination subject={subject} />)
    const s = wrapper.find('.c-Pagination__subject')

    expect(s.text().indexOf(' ')).toBe(0)
  })

  test('Renders a default subject if no totalItems is provided', () => {
    const subject = 'Customer'
    const wrapper = mount(<Pagination subject={subject} />)
    const s = wrapper.find('.c-Pagination__subject')

    expect(s.text().trim()).toBe(subject)
  })

  test('Renders a pluralize subject', () => {
    const subject = 'Customer'
    const wrapper = mount(<Pagination subject={subject} totalItems={100} />)
    const s = wrapper.find('.c-Pagination__subject')

    expect(s.text().trim()).toBe('Customers')
  })

  test('Renders a custom pluralized subject', () => {
    const subject = 'Customer'
    const pluralizedSubject = 'Customerzzz'

    const wrapper = mount(
      <Pagination
        subject={subject}
        totalItems={100}
        pluralizedSubject={pluralizedSubject}
      />
    )
    const s = wrapper.find('.c-Pagination__subject')

    expect(s.text().trim()).toBe(pluralizedSubject)
  })

  test('should render custom content', () => {
    const subject = 'customer'
    const totalItems = 100
    const wrapper = mount(
      <Pagination
        subject={subject}
        totalItems={totalItems}
        renderCustomContent={({
          startRange,
          endRange,
          numberOfPages,
          currentPage,
          pluralizedSubject,
        }) => {
          return (
            <div className="custom-content">
              {totalItems} total {pluralizedSubject} • 26 active
            </div>
          )
        }}
      />
    )

    const s = wrapper.find('.custom-content')

    expect(s.text().trim()).toBe(`100 total customers • 26 active`)
  })
})

describe('Navigation', () => {
  test('Does not render a navigation by default', () => {
    const wrapper = mount(<Pagination />)
    const n = wrapper.find(NavigationUI)

    expect(n.length).not.toBeTruthy()
  })

  test('Does not render a navigation, if defined && number of pages <= 1', () => {
    const wrapper = mount(
      <Pagination showNavigation={true} totalItems={10} rangePerPage={10} />
    )
    const n = wrapper.find(NavigationUI)

    expect(n.length).not.toBeTruthy()
  })

  test('Renders a navigation, if defined && number of pages > 1', () => {
    const wrapper = mount(
      <Pagination showNavigation={true} totalItems={10} rangePerPage={5} />
    )
    const n = wrapper.find(NavigationUI)

    expect(n.length).toBeTruthy()
  })

  test('Display next & last button on first page', () => {
    const wrapper = mount(
      <Pagination showNavigation={true} totalItems={10} rangePerPage={5} />
    )

    const first = wrapper.find('.c-Pagination__firstButton')
    const prev = wrapper.find('.c-Pagination__prevButton')
    const next = wrapper.find('.c-Pagination__nextButton')
    const last = wrapper.find('.c-Pagination__lastButton')

    expect(first.length).not.toBeTruthy()
    expect(prev.length).not.toBeTruthy()
    expect(next.length).toBeTruthy()
    expect(last.length).toBeTruthy()
  })

  test('Display prev & first button after first page', () => {
    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={15}
        rangePerPage={5}
        activePage={2}
      />
    )

    const first = wrapper.find('.c-Pagination__firstButton')
    const prev = wrapper.find('.c-Pagination__prevButton')
    const next = wrapper.find('.c-Pagination__nextButton')
    const last = wrapper.find('.c-Pagination__lastButton')

    expect(first.length).toBeTruthy()
    expect(prev.length).toBeTruthy()
    expect(next.length).toBeTruthy()
    expect(last.length).toBeTruthy()
  })

  test('Hides next & last button on last page', () => {
    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={15}
        rangePerPage={5}
        activePage={3}
      />
    )

    const next = wrapper.find('Button.c-Pagination__nextButton')
    const last = wrapper.find('Button.c-Pagination__lastButton')

    expect(next.length).not.toBeTruthy()
    expect(last.length).not.toBeTruthy()
  })

  test('Disables all buttons when loading', () => {
    const wrapper = mount(
      <Pagination
        isLoading={true}
        showNavigation={true}
        totalItems={15}
        rangePerPage={5}
        activePage={2}
      />
    )

    const first = wrapper.find('Button.c-Pagination__firstButton').first()
    const prev = wrapper.find('Button.c-Pagination__prevButton').first()
    const next = wrapper.find('Button.c-Pagination__nextButton').first()
    const last = wrapper.find('Button.c-Pagination__lastButton').first()

    expect(first.props('disabled')).toBeTruthy()
    expect(prev.props('disabled')).toBeTruthy()
    expect(next.props('disabled')).toBeTruthy()
    expect(last.props('disabled')).toBeTruthy()
  })

  test('Sets 1 as the minimum for currentPage', () => {
    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={15}
        rangePerPage={5}
        activePage={0}
      />
    )

    expect(wrapper.instance().getCurrentPage()).toBe(1)
  })

  test('Sets the number of pages as the maximum for currentPage', () => {
    const totalItems = 15
    const rangePerPage = 5
    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={200}
      />
    )

    expect(wrapper.instance().getCurrentPage()).toBe(totalItems / rangePerPage)
  })
})
describe('Range', () => {
  test('Sets numberOfPages on even number', () => {
    const totalItems = 15
    const rangePerPage = 5
    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
      />
    )

    expect(wrapper.instance().getNumberOfPages()).toBe(3)
  })
  test('Hides range if less than 2 pages', () => {
    const totalItems = 5
    const rangePerPage = 5
    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
      />
    )

    expect(wrapper.find('.c-Pagination__range').length).toBeFalsy()
  })

  test('Shows totalItems if less than 2 pages', () => {
    const totalItems = 5
    const rangePerPage = 5
    const subject = 'Customers'
    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
        subject={subject}
      />
    )

    expect(wrapper.find(RangeUI).text()).toBe(`${totalItems}`)
    expect(wrapper.find(InformationUI).text()).toBe(`${totalItems} ${subject}`)
  })
  test('Sets numberOfPages on uneven number', () => {
    const totalItems = 17
    const rangePerPage = 5
    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
      />
    )

    expect(wrapper.instance().getNumberOfPages()).toBe(4)
  })
  test('Sets correctly start and end range on first page', () => {
    const totalItems = 15
    const rangePerPage = 5
    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
      />
    )

    expect(wrapper.instance().getStartRange()).toBe(1)
    expect(wrapper.instance().getEndRange()).toBe(5)
  })

  test('Sets correctly start and end range on last page', () => {
    const totalItems = 15
    const rangePerPage = 5

    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={3}
      />
    )

    expect(wrapper.instance().getStartRange()).toBe(11)
    expect(wrapper.instance().getEndRange()).toBe(15)
  })

  test('Sets correctly start and uneven end range on last page', () => {
    const totalItems = 17
    const rangePerPage = 5

    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={10}
      />
    )

    expect(wrapper.instance().getStartRange()).toBe(16)
    expect(wrapper.instance().getEndRange()).toBe(17)
  })
})

describe('Clicks', () => {
  test('Navigates to next page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
        onChange={changeWatcher}
      />
    )
    wrapper.find('Button.c-Pagination__nextButton').first().simulate('click')
    expect(changeWatcher).toHaveBeenCalledWith(2)
  })

  test('Navigates to last page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
        onChange={changeWatcher}
      />
    )
    wrapper.find('Button.c-Pagination__lastButton').first().simulate('click')
    expect(changeWatcher).toHaveBeenCalledWith(4)
  })

  test('Navigates to first page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={10}
        onChange={changeWatcher}
      />
    )
    wrapper.find('Button.c-Pagination__firstButton').first().simulate('click')
    expect(changeWatcher).toHaveBeenCalledWith(1)
  })

  test('Navigates to prev page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={10}
        onChange={changeWatcher}
      />
    )
    wrapper.find('Button.c-Pagination__prevButton').first().simulate('click')
    expect(changeWatcher).toHaveBeenCalledWith(3)
  })

  test('Prev callback should not call onChange if already at first page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
        onChange={changeWatcher}
      />
    )
    wrapper.instance().handlePrevClick({ preventDefault: jest.fn() })
    expect(changeWatcher).not.toHaveBeenCalled()
  })

  test('Next callback should not call onChange if already at last page', () => {
    const totalItems = 15
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    const wrapper = mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={3}
        onChange={changeWatcher}
      />
    )
    wrapper.instance().handleNextClick({ preventDefault: jest.fn() })
    expect(changeWatcher).not.toHaveBeenCalled()
  })
})

describe('Keyboard', () => {
  test('Pressing j navigate to previous page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={2}
        onChange={changeWatcher}
      />
    )
    simulateKeyPress(Keys.KEY_J)
    expect(changeWatcher).toHaveBeenCalledWith(1)
  })

  test('Pressing k navigate to next page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    mount(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
        onChange={changeWatcher}
      />
    )
    simulateKeyPress(Keys.KEY_K)
    expect(changeWatcher).toHaveBeenCalledWith(2)
  })
})
