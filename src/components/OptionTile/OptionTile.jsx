import React from 'react'
import PropTypes from 'prop-types'
import FluffyCardContainer from './OptionTile.Container'
import Centralize from '../Centralize'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { OptionTileUI, HeaderUI, ContentUI, TitleUI } from './OptionTile.css'
import OptionIcon from './OptionIcon'

class OptionTile extends React.PureComponent {
  static defaultProps = {
    icon: 'chat',
    title: 'Title',
    style: {},
    subtitle: 'Description',
    textAlign: 'center',
  }

  static Container = FluffyCardContainer

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

OptionTile.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string,
  iconTitle: PropTypes.string,
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  to: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  subtitle: PropTypes.string,
  textAlign: PropTypes.string,
}

export default OptionTile
