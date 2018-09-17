// @flow
import React, { PureComponent as Component } from 'react'
import Container from './Container'
import Centralize from '../Centralize'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import {
  OptionTileUI,
  HeaderUI,
  ContentUI,
  TitleUI,
} from './styles/OptionTile.css.js'
import { COMPONENT_KEY } from './utils'
import OptionIcon from '../OptionIcon'

type Props = {
  children?: any,
  className?: string,
  href?: string,
  icon: string,
  iconTitle?: string,
  to?: string,
  title?: string,
  subtitle?: string,
}

class OptionTile extends Component<Props> {
  static defaultProps = {
    icon: 'chat',
    title: 'Title',
    subtitle: 'Description',
  }

  static Container = Container

  render() {
    const {
      className,
      children,
      icon,
      iconTitle,
      title,
      subtitle,
      ...rest
    } = this.props
    const componentClassName = classNames('c-OptionTile', className)

    return (
      <OptionTileUI
        {...rest}
        className={componentClassName}
        title={title}
        textAlign="center"
      >
        <HeaderUI className="c-OptionTile__header">
          <Centralize>
            <OptionIcon icon={icon} iconTitle={iconTitle} />
          </Centralize>
        </HeaderUI>
        <ContentUI className="c-OptionTile__content">
          <TitleUI className="c-OptionTile__titleWrapper">
            <Text
              className="c-OptionTile__title"
              block
              isPlainLink
              noUnderline
              weight="500"
              size="14"
            >
              {title}
            </Text>
          </TitleUI>
          <Text className="c-OptionTile__subtitle" shade="muted" noUnderline>
            {subtitle}
          </Text>
        </ContentUI>
      </OptionTileUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(OptionTile)

export default OptionTile
