import * as React from 'react'
import { classNames } from '../../utilities/classNames'

import { DetailListTitleUI } from './styles/DetailList.css'

const Title = props => {
  const { children, className, ...rest } = props

  const componentClassName = classNames('c-DetailListTitle', className)

  return (
    <DetailListTitleUI className={componentClassName} {...rest}>
      {children}
    </DetailListTitleUI>
  )
}

Title.displayName = 'DetailListTitle'

export default Title
