import * as React from 'react'
import Container from './OptionTile.Container'
import Centralize from '../Centralize'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import {
  OptionTileUI,
  HeaderUI,
  ContentUI,
  TitleUI,
} from './styles/OptionTile.css'
import { COMPONENT_KEY } from './OptionTile.utils'
import OptionIcon from '../OptionIcon'
import { OptionTileProps } from './OptionTile.types'

class OptionTile extends React.PureComponent<OptionTileProps> {
  static defaultProps = {
    icon: 'chat',
    title: 'Title',
    style: {},
    subtitle: 'Description',
    textAlign: 'center',
  }

  static Container = Container

  render() {
    const {
      className,
      children,
      icon,
      iconTitle,
      minHeight,
      title,
      style,
      subtitle,
      textAlign,
      ...rest
    } = this.props
    const componentClassName = classNames('c-OptionTile', className)

    const styles = {
      ...style,
      minHeight,
    }

    return (
      <OptionTileUI
        {...rest}
        className={componentClassName}
        style={styles}
        title={title}
        textAlign={textAlign}
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
