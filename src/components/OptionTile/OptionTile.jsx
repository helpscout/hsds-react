import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import FluffyCardContainer from './OptionTile.Container'
import Centralize from '../Centralize'
import Text from '../Text'
import classNames from 'classnames'
import { OptionTileUI, HeaderUI, ContentUI, TitleUI } from './OptionTile.css'
import OptionIcon from './OptionIcon'

class OptionTile extends React.PureComponent {
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
        {...getValidProps(rest)}
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

OptionTile.defaultProps = {
  'data-cy': 'OptionTile',
  icon: 'chat',
  title: 'Title',
  style: {},
  subtitle: 'Description',
  textAlign: 'center',
}

OptionTile.propTypes = {
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  href: PropTypes.string,
  /** Icon to render within the `OptionIcon` */
  icon: PropTypes.string,
  /** The title for the Icon. */
  iconTitle: PropTypes.string,
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  to: PropTypes.string,
  /** The title for the component. */
  title: PropTypes.string,
  style: PropTypes.object,
  /** The subtitle for the component. */
  subtitle: PropTypes.string,
  textAlign: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default OptionTile
