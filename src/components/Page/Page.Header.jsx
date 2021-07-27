import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import classNames from 'classnames'
import { HeaderUI, SubTitleUI, HeadingUI } from './Page.css'
import { PageContext } from './Page'

const Title = props => {
  const { headingLevel, isSecondary, className, children } = props
  const componentClassName = classNames('c-PageHeading', className)

  return (
    <div className="c-PageHeader__title">
      <HeadingUI
        selector={headingLevel || 'h1'}
        size={isSecondary ? 'h4' : 'md'}
        className={componentClassName}
      >
        {children}
      </HeadingUI>
    </div>
  )
}

const Subtitle = ({ children }) => (
  <SubTitleUI className="c-PageHeader__subtitle">
    <Text shade="muted">{children}</Text>
  </SubTitleUI>
)

export const PageHeader = props => {
  const { isResponsive } = useContext(PageContext)
  const {
    className,
    render,
    title,
    subtitle,
    withBorder,
    withBottomMargin,
    ...rest
  } = props
  const componentClassName = classNames(
    'c-PageHeader',
    isResponsive && 'is-responsive',
    withBorder && 'is-withBorder',
    withBottomMargin && 'is-withBottomMargin',
    className
  )

  return (
    <HeaderUI {...getValidProps(rest)} className={componentClassName}>
      {render ? (
        render({ Title, Subtitle })
      ) : (
        <div>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </div>
      )}
    </HeaderUI>
  )
}

PageHeader.defaultProps = {
  'data-cy': 'PageHeader',
  title: 'Title',
  withBorder: true,
  withBottomMargin: true,
}

PageHeader.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Enables responsive styles. Default `false`. */
  isResponsive: PropTypes.bool,
  /** function with 2 arguments: `Title` and `Subtitle`, 2 React Components with styles ready */
  render: PropTypes.func,
  /** Renders a border under the header. Default `true`. */
  withBorder: PropTypes.bool,
  /** Renders bottom margin styles. Default `true`. */
  withBottomMargin: PropTypes.bool,
  /** The `Heading` title to render. */
  title: PropTypes.string,
  /** The `Text` subtitle to render. */
  subtitle: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default PageHeader
