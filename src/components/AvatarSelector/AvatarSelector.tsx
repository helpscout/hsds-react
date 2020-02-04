import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import Icon from '../Icon'
import Avatar from '../Avatar'

import {
  AvatarSelectorWrapperUI,
  IconAssignUI,
  IconCaretUI,
  AvatarWrapperUI,
} from './AvatarSelector.css.js'

export interface Props {
  image: string
  initials: string
  isOpen: boolean
  name: string
  size: string
}

export default class AvatarSelector extends React.PureComponent<Props> {
  static defaultProps = {
    image: '',
    initials: '',
    isOpen: false,
    name: '',
    size: 'lg',
  }

  renderAvatar() {
    const { image, initials, name } = this.props
    return (
      <AvatarWrapperUI>
        <Avatar
          size="smmd"
          image={image}
          name={name}
          initials={initials || name}
        />
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
    const { image, initials, isOpen, name, size } = this.props
    const classnames = classNames('c-AvatarSelector', isOpen ? 'is-open' : '')

    return (
      <AvatarSelectorWrapperUI className={classnames} tabIndex="0" size={size}>
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
