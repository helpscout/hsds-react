import * as React from 'react'
import {
  AvatarSelectorUI,
  AvatarSelectorWrapperUI,
  AvatarUI,
  IconAssignUI,
  IconCaretUI,
} from './styles/AvatarSelector.css.js'

export interface Props {
  image: string
  isOpen: boolean
}

export default class AvatorSelector extends React.PureComponent<Props> {
  static default = {
    image: '',
    isOpen: false,
  }

  renderAvatar() {
    return <AvatarUI borderColor="#fff" size="sm" image={this.props.image} />
  }

  renderAssign() {
    return <IconAssignUI name="assigned" shade="faint" />
  }

  render() {
    const { image, isOpen } = this.props
    return (
      <AvatarSelectorWrapperUI className="c-AvatarSelector" tabIndex="1">
        {this.props.image ? this.renderAvatar() : this.renderAssign()}
        <AvatarSelectorUI>
          <IconCaretUI shade="faint" size="14" name="caret-down" />
        </AvatarSelectorUI>
      </AvatarSelectorWrapperUI>
    )
  }
}
