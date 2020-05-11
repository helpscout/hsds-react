import React from 'react'
import { mount } from 'enzyme'
import Header from '../Page.Header'
import { PageContext } from '../Page'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Header />)

    expect(wrapper.getDOMNode().classList.contains('c-PageHeader')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Header className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Does not renders child content', () => {
    const wrapper = mount(<Header>Channel 4</Header>)

    expect(wrapper.text()).not.toBe('Channel 4')
  })
})

describe('Title and Subtitle', () => {
  test('Can render a title', () => {
    const wrapper = mount(
      <Header render={({ Title }) => <Title>Channel 4</Title>} />
    )

    expect(wrapper.find('h1').text()).toContain('Channel 4')
  })
  test('Can render a subtitle', () => {
    const wrapper = mount(
      <Header
        render={({ Title, Subtitle }) => <Subtitle>Channel 4</Subtitle>}
      />
    )

    expect(wrapper.find('span').text()).toContain('Channel 4')
  })

  test('Title is primary heading (h1) by default', () => {
    const wrapper = mount(
      <Header render={({ Title }) => <Title>Channel 4</Title>} />
    )

    expect(wrapper.find('h1').length).toBe(1)
  })

  test('Title can render h2', () => {
    const wrapper = mount(
      <Header
        render={({ Title }) => <Title headingLevel="h2">Channel 4</Title>}
      />
    )

    expect(wrapper.find('h2').length).toBe(1)
  })

  test('Title can render smaller (secondary)', () => {
    const wrapper = mount(
      <Header
        render={({ Title }) => (
          <Title headingLevel="h2" isSecondary>
            Channel 4
          </Title>
        )}
      />
    )

    expect(wrapper.find('h2').hasClass('is-h4')).toBe(true)
  })

  test('Can render the title with "title" prop', () => {
    const wrapper = mount(<Header title="Channel 4" />)

    expect(wrapper.text()).toContain('Channel 4')
  })

  test('Can render the subtitle with "subtitle" prop', () => {
    const wrapper = mount(<Header title="Channel 4" subtitle="News team" />)

    expect(wrapper.text()).toContain('Channel 4')
    expect(wrapper.text()).toContain('News team')
  })
})

describe('Border', () => {
  test('Renders a border', () => {
    const wrapper = mount(
      <Header render={({ Title }) => <Title>Channel 4</Title>} />
    )

    expect(wrapper.getDOMNode().classList.contains('is-withBorder')).toBe(true)
  })

  test('Can not render a border, if specified', () => {
    const wrapper = mount(
      <Header
        render={({ Title }) => <Title>Channel 4</Title>}
        withBorder={false}
      />
    )

    expect(wrapper.getDOMNode().classList.contains('is-withBorder')).toBe(false)
  })
})

describe('Responsive', () => {
  test('Renders responsive styles, if specified', () => {
    const wrapper = mount(
      <PageContext.Provider value={{ isResponsive: true }}>
        <Header />
      </PageContext.Provider>
    )

    expect(
      wrapper
        .find(Header)
        .getDOMNode()
        .classList.contains('is-responsive')
    ).toBe(true)
  })

  test('Does not render responsive styles, if specified', () => {
    const wrapper = mount(
      <PageContext.Provider value={{ isResponsive: false }}>
        <Header />
      </PageContext.Provider>
    )

    expect(
      wrapper
        .find(Header)
        .getDOMNode()
        .classList.contains('is-responsive')
    ).toBe(false)
  })
})

describe('withBottomMargin', () => {
  test('Renders withBottomMargin styles, if specified', () => {
    const wrapper = mount(
      <Header
        render={({ Title }) => <Title>Channel 4</Title>}
        withBottomMargin
      />
    )

    expect(wrapper.getDOMNode().classList.contains('is-withBottomMargin')).toBe(
      true
    )
  })

  test('Does not render withBottomMargin styles, if specified', () => {
    const wrapper = mount(
      <Header
        render={({ Title }) => <Title>Channel 4</Title>}
        withBottomMargin={false}
      />
    )

    expect(wrapper.getDOMNode().classList.contains('is-withBottomMargin')).toBe(
      false
    )
  })
})
