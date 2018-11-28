import React from 'react'
import { storiesOf } from '@storybook/react'
import Artboard from '@helpscout/artboard'
import ComboBox from '../src/components/ComboBox'
import InfiniteScroller from '../src/components/InfiniteScroller'
import { createSpec, faker } from '@helpscout/helix'

const stories = storiesOf('ComboBox', module)
stories.addDecorator(storyFn => (
  <Artboard
    name="dropdown-v2"
    withCenterGuides={false}
    artboardWidth={480}
    artboardHeight={300}
  >
    <div
      style={{ boxSizing: 'border-box', width: 480, height: 300, padding: 30 }}
    >
      {storyFn()}
    </div>
  </Artboard>
))

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
})

const items = [
  {
    items: ItemSpec.generate(8),
    label: 'Group 1',
    value: 'thing',
    type: 'group',
  },
  {
    items: [
      ...ItemSpec.generate(8),
      { type: 'divider' },
      ...ItemSpec.generate(3),
    ],
    label: 'Group 2',
    type: 'group',
    value: 'thing2',
  },
]

stories.add('Default', () => {
  return <ComboBox itemFilterKey="label" items={items} isOpen={true} />
})

stories.add('Infinite Scroll', () => {
  class Test extends React.Component {
    state = {
      items: ItemSpec.generate(30),
      showInfiniteScroller: true,
    }

    onInputChange = inputValue => {
      this.setState({
        showInfiniteScroller: inputValue.length === 0,
      })
    }

    loadMore = () => {
      console.log('ComboBox: Infinite Scroll: Load More!')
      this.setState({
        items: [...this.state.items, ...ItemSpec.generate(30)],
      })
    }

    renderMenuEnd = () => {
      return (
        this.state.showInfiniteScroller && (
          <InfiniteScroller
            onLoading={this.loadMore}
            offset={100}
            getScrollParent={({ node }) =>
              node.closest('.c-DropdownV2MenuWrapper')
            }
          />
        )
      )
    }

    render() {
      return (
        <ComboBox
          itemFilterKey="label"
          items={this.state.items}
          isOpen={true}
          onInputChange={this.onInputChange}
          renderMenuEnd={this.renderMenuEnd}
        />
      )
    }
  }

  return <Test />
})
