// @flow
import React, { PureComponent as Component } from 'react'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id'
import { isFunction, isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import Radio from '../Radio'
import { RadioCardUI, IconWrapperUI } from './styles/RadioCard.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  checked: boolean,
  className?: string,
  icon: string | Function,
  iconSize: number,
  id?: string,
  title?: string,
  onChange: (value: any) => void,
}

type State = {
  id: string,
}

const uniqueID = createUniqueIDFactory('RadioCard')

class RadioCard extends Component<Props, State> {
  static defaultProps = {
    checked: false,
    onChange: noop,
    icon: 'fab-chat',
    iconSize: 52,
  }

  defaultIcon: string = 'fab-chat'

  constructor(props: Props) {
    super(props)

    this.state = {
      id: props.id || uniqueID(),
    }
  }

  getIconMarkup = () => {
    const { icon, iconSize } = this.props

    if (isFunction(icon)) {
      return React.createElement(icon)
    }

    const iconName = isString(icon) ? icon : this.defaultIcon

    return <Icon name={iconName} size={iconSize} />
  }

  render() {
    const { className, checked, icon, title, ...rest } = this.props
    const { id } = this.state

    const componentClassName = classNames(
      'c-RadioCard',
      checked && 'is-checked'
    )

    const iconMarkup = this.getIconMarkup()

    return (
      <RadioCardUI htmlFor={id} className={componentClassName} title={title}>
        <IconWrapperUI
          className={classNames(
            'c-RadioCard__iconWrapper',
            checked && 'is-checked'
          )}
        >
          {iconMarkup}
        </IconWrapperUI>
        <Radio {...rest} checked={checked} kind="custom" id={id} />
      </RadioCardUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(RadioCard)

export default RadioCard
