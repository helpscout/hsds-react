// @flow
import React, { Children, Component } from 'react'
import classNames from '../../utilities/classNames'
import Body from './Body'
import Section from './Section'
import Title from './Title'

type Props = {
  allowMultiple?: boolean,
  className?: string,
}

class Accordion extends Component<Props> {
  static Body = Body
  static Section = Section
  static Title = Title

  constructor(props) {
    super(props)

    this.state = {
      sections: {},
    }
    this.setOpen = this.setOpen.bind(this)
  }

  setOpen(uuid, expanded) {
    const { allowMultiple } = this.props
    if (allowMultiple) {
      this.setState({
        sections: {
          ...this.state.sections,
          [uuid]: expanded,
        },
      })
    } else {
      this.setState({
        sections: {
          [uuid]: expanded,
        },
      })
    }
  }

  render() {
    const { allowMultiple, className, children, ...rest } = this.props
    const { sections } = this.state

    const componentClassName = classNames(
      'c-Accordion',
      allowMultiple && 'is-allow-multiple',
      className
    )

    return (
      <div className={componentClassName} role="tablist" {...rest}>
        {Children.map(children, child => {
          return React.cloneElement(child, {
            ...child.props,
            sections,
            setOpen: this.setOpen,
          })
        })}
      </div>
    )
  }
}

export default Accordion
