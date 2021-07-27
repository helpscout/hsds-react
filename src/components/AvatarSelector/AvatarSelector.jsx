import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import Icon from '../Icon'
import Avatar from '../Avatar'
import {
  AvatarSelectorWrapperUI,
  IconAssignUI,
  IconCaretUI,
  AvatarWrapperUI,
} from './AvatarSelector.css.js'

class AvatarSelector extends React.PureComponent {
  renderAvatar() {
    const { image, initials, name } = this.props

    return (
      <AvatarWrapperUI>
        <Avatar size="smmd" image={image} name={name} initials={initials} />
      </AvatarWrapperUI>
    )
  }

  renderBlankAvatar() {
    return (
      <IconAssignUI>
        <Icon name="assigned" size="24" />
      </IconAssignUI>
    )
  }

  render() {
    const {
      image,
      initials,
      isHovered,
      isOpen,
      name,
      size,
      ...rest
    } = this.props
    const classnames = classNames(
      'c-AvatarSelector',
      isOpen ? 'is-open' : '',
      isHovered && 'is-hovered'
    )

    return (
      <AvatarSelectorWrapperUI
        className={classnames}
        tabIndex="0"
        size={size}
        {...getValidProps(rest)}
      >
        {image || initials || name
          ? this.renderAvatar()
          : this.renderBlankAvatar()}
        <IconCaretUI>
          <Icon size="14" name={isOpen ? 'caret-up' : 'caret-down'} />
        </IconCaretUI>
      </AvatarSelectorWrapperUI>
    )
  }
}

AvatarSelector.defaultProps = {
  'data-cy': 'AvatarSelector',
  image: '',
  initials: '',
  isHovered: false,
  isOpen: false,
  name: '',
  size: 'lg',
}

AvatarSelector.propTypes = {
  /** URL of the image. */
  image: PropTypes.string,
  /** Initials of image */
  initials: PropTypes.string,
  /** Fallback for the image. */
  name: PropTypes.string,
  /** Used to control the direction of the caret. */
  isOpen: PropTypes.bool,
  /** Size of the avatar. */
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'smmd', 'sm', 'xxs']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default AvatarSelector
