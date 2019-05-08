import * as React from 'react'
import { mount } from 'enzyme'
import Page from '../Page'
import ConnectedPage from '../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Page />)
    expect(wrapper.getDOMNode().classList.contains('c-Page')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Page className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Can render child content', () => {
    const wrapper = mount(<Page>Channel 5</Page>)

    expect(wrapper.html()).toContain('Channel 5')
  })

  test('Can render child component', () => {
    const wrapper = mount(
      <Page>
        <div className="ron">Channel 4</div>
      </Page>
    )

    expect(wrapper.find('div.ron').length).toBe(1)
  })
})

describe('Responsive', () => {
  test('Renders responsive styles, if specified', () => {
    const wrapper = mount(<Page isResponsive={true} />)

    expect(wrapper.getDOMNode().classList.contains('is-responsive')).toBe(true)
  })

  test('Does not render responsive styles, if specified', () => {
    const wrapper = mount(<Page isResponsive={false} />)

    expect(wrapper.getDOMNode().classList.contains('is-responsive')).toBe(false)
  })

  test('Passes responsive config to sub-components', () => {
    const wrapper = mount(
      <ConnectedPage isResponsive={true}>
        <ConnectedPage.Card>
          <ConnectedPage.Section>
            <ConnectedPage.Header />
          </ConnectedPage.Section>
        </ConnectedPage.Card>
        <ConnectedPage.Actions />
      </ConnectedPage>
    )

    expect(
      wrapper
        .find(Page.Section)
        .getDOMNode()
        .classList.contains('is-responsive')
    ).toBe(true)

    expect(
      wrapper
        .find(Page.Header)
        .getDOMNode()
        .classList.contains('is-responsive')
    ).toBe(true)
  })
})

describe('Sub-components', () => {
  test('Can render sub-components', () => {
    const wrapper = mount(
      <Page>
        <Page.Card>
          <Page.Header />
        </Page.Card>
        <Page.Actions />
      </Page>
    )

    expect(wrapper.find(Page.Card).length).toBe(1)
    expect(wrapper.find(Page.Header).length).toBe(1)
    expect(wrapper.find(Page.Actions).length).toBe(1)
  })
})
