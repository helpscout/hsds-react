import React, { PureComponent as Component } from 'react'
import TagSpec from '../../utilities/specs/tags.specs'
import { TagList, Tag } from '../index'

export class TagListExample extends Component {
  constructor() {
    super()
    this.state = {
      tags: TagSpec.generate(5),
    }
  }

  handleOnRemove = ({ id }) => {
    this.setState({
      tags: this.state.tags.filter(tag => tag.id !== id),
    })
  }

  handleOnRemoveAll = () => {
    this.setState({
      tags: [],
    })
  }

  render() {
    const { tags } = this.state

    const tagMarkup = tags.map(tag => {
      const { color, filled, id, value } = tag
      return (
        <Tag color={color} key={id} id={id} value={value} filled={filled} />
      )
    })

    return (
      <TagList
        onRemove={this.handleOnRemove}
        onRemoveAll={this.handleOnRemoveAll}
        {...this.props}
      >
        {tagMarkup}
      </TagList>
    )
  }
}
