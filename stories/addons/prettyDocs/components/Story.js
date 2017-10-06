import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Heading, Text } from '../../../../src/components'

const propTypes = {
  context: PropTypes.shape({
    kind: PropTypes.string,
    story: PropTypes.string
  })
}

const defaultProps = {
  context: null
}

class Story extends Component {
  render () {
    const {
      context,
      children
    } = this.props

    const {
      kind,
      story
    } = context

    const renderHeading = kind ? (
      <div className='DocStoryHeading'>
        <Heading>{kind}</Heading>
        <Text muted>{story}</Text>
        <hr />
      </div>
    ) : null

    return (
      <div className='DocStory'>
        {renderHeading}
        {children}
      </div>
    )
  }
}

Story.propTypes = propTypes
Story.defaultProps = defaultProps
Story.displayName = 'Story'

export default Story
