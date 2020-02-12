import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY, MODAL_STYLES } from './Modal.utils'
import {
  AlertHeaderUI,
  AlertHeaderTitleUI,
  BrandedHeaderUI,
  BrandedHeaderImageUI,
  BrandedHeaderTitleUI,
  HeaderDescriptionUI,
  HeaderUI,
  HeaderTitleUI,
} from './styles/Modal.HeaderV2.css'
import { ModalHeaderV2Props } from './Modal.types'
import Icon from '../Icon'
import Illo from '../Illo'

class HeaderV2 extends React.PureComponent<ModalHeaderV2Props> {
  static defaultProps = {
    description: null,
    icon: null,
    illo: null,
    kind: MODAL_STYLES.DEFAULT,
    title: 'Title',
  }

  renderAlertStyle() {
    const { className, children, description, title, ...rest } = this.props

    const componentClassName = classNames('c-ModalHeaderV2', className)

    return (
      <AlertHeaderUI {...rest} className={componentClassName} placement={'top'}>
        {<AlertHeaderTitleUI>{title}</AlertHeaderTitleUI>}
        {description ? (
          <HeaderDescriptionUI>{description}</HeaderDescriptionUI>
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
      title,
      ...rest
    } = this.props

    const componentClassName = classNames('c-ModalHeaderV2', className)

    return (
      <BrandedHeaderUI
        {...rest}
        className={componentClassName}
        placement={'top'}
      >
        {illo ? <BrandedHeaderImageUI>{illo}</BrandedHeaderImageUI> : null}
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
      kind,
      title,
      ...rest
    } = this.props

    const componentClassName = classNames('c-ModalHeaderV2', className)

    if (kind === MODAL_STYLES.BRANDED) {
      return this.renderBrandedStyle()
    } else if (kind === MODAL_STYLES.ALERT) {
      return this.renderAlertStyle()
    }

    return (
      <HeaderUI {...rest} className={componentClassName} placement={'top'}>
        {icon ? <Icon name={icon} key={icon} size={'20'} /> : null}
        {<HeaderTitleUI>{title}</HeaderTitleUI>}
        {children}
      </HeaderUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.HeaderV2)(HeaderV2)

export default HeaderV2
