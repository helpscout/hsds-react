import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import { TagList, Tag } from '../src/index.js'
import TagSpec from './Tag/specs/Tag'

const stories = storiesOf('TagList', module)

export class SampleComponent extends Component {
  constructor() {
    super()
    this.state = {
      tags: TagSpec.generate(28),
    }
    this.handleOnRemove = this.handleOnRemove.bind(this)
  }

  onBeforeRemove({ id }) {
    return new Promise(resolve => {
      console.log('REMOVING', id)
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  handleOnRemove({ id }) {
    this.setState({
      tags: this.state.tags.filter(tag => tag.id !== id),
    })
    console.log('removed:', id)
  }

  render() {
    const { tags } = this.state
    const handleOnRemove = this.handleOnRemove

    console.log('tag count:', tags.length)

    const tagMarkup = tags.map(tag => {
      const { color, filled, id, value } = tag
      return (
        <Tag color={color} key={id} id={id} value={value} filled={filled} />
      )
    })

    return (
      <TagList
        onBeforeRemove={this.onBeforeRemove}
        isRemovable
        onRemove={handleOnRemove}
        {...this.props}
      >
        {tagMarkup}
      </TagList>
    )
  }
}

stories.add('Default', () => <SampleComponent />)
stories.add('Clear all', () => <SampleComponent clearAll showAll />)
