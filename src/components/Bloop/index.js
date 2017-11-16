import React, {PureComponent as Component} from 'react'
import Collapsible from '../Collapsible'
import Text from '../Text'
import classNames from '../../utilities/classNames'

class Bloop extends Component {
  constructor (props) {
    super()
    this.state = {
      isOpen: props.isOpen
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { isOpen } = nextProps
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
      'c-Bloop',
      className
    )

    return (
      <Collapsible isOpen={isOpen} onClose={onClose}>
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

Bloop.displayName = 'Bloop'

export default Bloop
