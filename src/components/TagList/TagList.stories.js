import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import TagSpec from '../../utilities/specs/tags.specs'
import { TagList, Tag } from '../index'

const stories = storiesOf('Components/TagList', module)

export class SampleComponent extends Component {
  constructor() {
    super()
    this.state = {
      tags: TagSpec.generate(28),
    }
  }

  onBeforeRemove({ id }) {
    return new Promise(resolve => {
      console.log('REMOVING', id)
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  handleOnRemove = ({ id }) => {
    this.setState({
      tags: this.state.tags.filter(tag => tag.id !== id),
    })
    console.log('removed:', id)
  }

  handleOnRemoveAll = () => {
    this.setState({
      tags: [],
    })
    console.log('removed all tags')
  }

  render() {
    const { tags } = this.state

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
        onRemove={this.handleOnRemove}
        onRemoveAll={this.handleOnRemoveAll}
        {...this.props}
      >
        {tagMarkup}
      </TagList>
    )
  }
}

stories.add('Default', () => <SampleComponent />)
stories.add('Clear all', () => <SampleComponent clearAll showAll size="md" />)
