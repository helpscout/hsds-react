import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import Icon from '../Icon'
import Avatar from '../Avatar'

import {
  AvatarSelectorWrapperUI,
  IconAssignUI,
  IconCaretUI,
  AvatarWrapperUI,
} from './AvatarSelector.css.js'

export default class AvatarSelector extends React.PureComponent {
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

AvatarSelector.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  image: PropTypes.string,
  initials: PropTypes.string,
  isHovered: PropTypes.bool,
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.string,
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
