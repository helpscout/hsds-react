import * as React from 'react'
import {
  AvatarSelectorUI,
  AvatarSelectorWrapperUI,
  AvatarUI,
  IconAssignUI,
  IconCaretUI,
} from './AvatarSelector.css.js'

export interface Props {
  image: string
  initials: string
  isOpen: boolean
  name: string
}

export default class AvatarSelector extends React.PureComponent<Props> {
  static defaultProps = {
    image: '',
    initials: '',
    isOpen: false,
    name: '',
  }

  renderAvatar() {
    const { image, initials, name } = this.props
    return (
      <AvatarUI
        borderColor="#fff"
        size="sm"
        image={image}
        name={name}
        initials={initials || name}
      />
    )
  }

  renderBlankAvatar() {
    return <IconAssignUI name="assigned" shade="faint" />
  }

  render() {
    const { image, initials, isOpen, name } = this.props
    return (
      <AvatarSelectorWrapperUI className="c-AvatarSelector" tabIndex="0">
        {image || initials || name
          ? this.renderAvatar()
          : this.renderBlankAvatar()}
        <AvatarSelectorUI>
          <IconCaretUI
            shade="subtle"
            size="14"
            name={isOpen ? 'caret-up' : 'caret-down'}
          />
        </AvatarSelectorUI>
      </AvatarSelectorWrapperUI>
    )
  }
}
