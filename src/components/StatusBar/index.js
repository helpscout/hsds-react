import React, {PureComponent as Component} from 'react'
import { default as Collapsible, collapsibleTypes } from '../Collapsible'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = collapsibleTypes
const defaultProps = {
  isOpen: false,
  onClick: noop,
  onClose: noop,
  onOpen: noop
}

class StatusBar extends Component {
  constructor (props) {
    super()
    this.state = {
      isOpen: props.isOpen
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { isOpen } = nextProps
    /* istanbul ignore else */
    if (isOpen !== undefined) {
      this.setState({ isOpen })
    }
  }

  handleOnClick () {
    const { onClick } = this.props
    this.setState({ isOpen: false })
    onClick()
  }

  render () {
    const {
      className,
      children,
      isOpen: propsIsOpen,
      onClick,
      onOpen,
      onClose,
      ...rest
    } = this.props
    const { isOpen } = this.state

    const handleOnClick = this.handleOnClick

    const componentClassName = classNames(
      'c-StatusBar',
      className
    )

    return (
      <Collapsible isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <div
          className={componentClassName}
          onClick={handleOnClick}
          {...rest}
        >
          <Text size='12'>
            {children}
          </Text>
        </div>
      </Collapsible>
    )
  }
}

StatusBar.propTypes = propTypes
StatusBar.defaultProps = defaultProps
StatusBar.displayName = 'StatusBar'

export default StatusBar
