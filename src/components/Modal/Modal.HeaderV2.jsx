import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { MODAL_KIND } from './Modal.utils'
import {
  AlertHeaderUI,
  AlertHeaderTitleUI,
  AlertHeaderDescriptionUI,
  BrandedHeaderUI,
  BrandedHeaderImageUI,
  BrandedHeaderTitleUI,
  DotStepperUI,
  HeaderDescriptionUI,
  HeaderUI,
  HeaderTitleUI,
} from './Modal.HeaderV2.css'
import DotStepper from '../DotStepper'
import Icon from '../Icon'

class ModalHeaderV2 extends React.PureComponent {
  renderAlertStyle() {
    const { className, children, description, title, ...rest } = this.props
    const componentClassName = classNames('c-ModalHeaderV2', className)

    return (
      <AlertHeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        placement={'top'}
      >
        {<AlertHeaderTitleUI>{title}</AlertHeaderTitleUI>}
        {description ? (
          <AlertHeaderDescriptionUI>{description}</AlertHeaderDescriptionUI>
        ) : null}
        {children}
      </AlertHeaderUI>
    )
  }

  renderBrandedStyle() {
    const {
      className,
      children,
      description,
      illo,
      illoSize,
      title,
      ...rest
    } = this.props

    const componentClassName = classNames('c-ModalHeaderV2', className)

    return (
      <BrandedHeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        placement={'top'}
      >
        {illo ? (
          <BrandedHeaderImageUI size={illoSize}>{illo}</BrandedHeaderImageUI>
        ) : null}
        {<BrandedHeaderTitleUI>{title}</BrandedHeaderTitleUI>}
        {description ? (
          <HeaderDescriptionUI>{description}</HeaderDescriptionUI>
        ) : null}
        {children}
      </BrandedHeaderUI>
    )
  }

  renderSequenceStyle() {
    const {
      className,
      children,
      description,
      illo,
      numSteps,
      step,
      title,
      ...rest
    } = this.props

    const componentClassName = classNames('c-ModalHeaderV2', className)

    return (
      <BrandedHeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        placement={'top'}
      >
        <DotStepperUI>
          <DotStepper numSteps={numSteps} step={step} />
        </DotStepperUI>
        {<BrandedHeaderTitleUI>{title}</BrandedHeaderTitleUI>}
        {description ? (
          <HeaderDescriptionUI>{description}</HeaderDescriptionUI>
        ) : null}
        {children}
      </BrandedHeaderUI>
    )
  }

  render() {
    const {
      className,
      children,
      description,
      icon,
      iconSize,
      kind,
      title,
      ...rest
    } = this.props

    const componentClassName = classNames('c-ModalHeaderV2', className)

    if (kind === MODAL_KIND.BRANDED) {
      return this.renderBrandedStyle()
    } else if (kind === MODAL_KIND.ALERT) {
      return this.renderAlertStyle()
    } else if (kind === MODAL_KIND.SEQUENCE) {
      return this.renderSequenceStyle()
    }

    return (
      <HeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        placement={'top'}
      >
        {icon ? <Icon name={icon} key={icon} size={iconSize} /> : null}
        {<HeaderTitleUI>{title}</HeaderTitleUI>}
        {children}
      </HeaderUI>
    )
  }
}

ModalHeaderV2.defaultProps = {
  'data-cy': 'ModalHeaderV2',
  description: null,
  icon: null,
  iconSize: '24',
  illo: null,
  illoSize: 60,
  kind: MODAL_KIND.DEFAULT,
  numSteps: 1,
  step: 1,
  title: 'Title',
}

ModalHeaderV2.propTypes = {
  /** Renders in version 2 Modals beneath the title. */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Renders as an `Icon` in the top left corner of a version 2 Modal header. */
  icon: PropTypes.string,
  /** The size to render the provided `Icon` in a version 2 Modal header. */
  iconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Expects an `Illo` to be displayed in a version 2 Modal header. */
  illo: PropTypes.any,
  /** The size to render the provided `Illo` in a version 2 Modal header. */
  illoSize: PropTypes.number,
  /** The kind of version 2 Modal style to apply. (DEFAULT, BRANDED, ALERT, SEQUENCE). Default `DEFAULT` */
  kind: PropTypes.oneOf(['alert', 'default', 'branded', 'sequence']),
  /** Total number of steps to be used in a version 2 Sequence Modal. */
  numSteps: PropTypes.number,
  /** Current step to be used in a version 2 Sequence Modal. */
  step: PropTypes.number,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ModalHeaderV2
