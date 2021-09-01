import React, { PureComponent as Component } from 'react'
import TagSpec, { SelectingSpec } from '../../utilities/specs/tags.specs'
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

const originalTags = SelectingSpec.generate(15)

export const SelectingTags = () => {
  const [selectedTags, setSelected] = React.useState([])
  const [tags, setTags] = React.useState(originalTags)

  const toggleTag = id => {
    if (selectedTags.includes(id)) {
      setSelected(selectedTags.filter(i => i !== id))
    } else {
      setSelected([...selectedTags, id])
    }
  }

  const handleOnRemove = ({ id }) => {
    setTags([...tags.filter(t => t.id !== id)])
  }

  const handleOnRemoveAll = () => {
    setTags([])
  }

  const handleToggleTag = (e, { id }) => {
    e.preventDefault()
    toggleTag(id)
  }

  const tagMarkup = tags.map(tag => {
    const { color, id, value } = tag
    return (
      <Tag
        color={color}
        key={id}
        id={id}
        value={value}
        filled={selectedTags.includes(id)}
        onClick={handleToggleTag}
      />
    )
  })

  return (
    <TagList
      onRemove={handleOnRemove}
      onRemoveAll={handleOnRemoveAll}
      clearAll={true}
      showAll={true}
      isRemovable={true}
      size="md"
    >
      {tagMarkup}
    </TagList>
  )
}
