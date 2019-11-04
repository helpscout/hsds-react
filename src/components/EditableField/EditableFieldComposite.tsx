import * as React from 'react'

import {
  ComponentUI,
  ComposedMaskUI,
} from './styles/EditableFieldComposite.css'

import {
  COMPOSITE_COMPONENT_KEY,
  STATES_CLASSNAMES,
  COMPOSITE_CLASSNAMES,
  EDITABLEFIELD_CLASSNAMES,
  INPUT_CLASSNAMES,
} from './EditableField.utils'
import { classNames } from '../../utilities/classNames'
import { key } from '../../constants/Keys'
import propConnect from '../PropProvider/propConnect'
import * as equal from 'fast-deep-equal'

import { CompositeProps, CompositeState } from './EditableField.types'

export class EditableFieldComposite extends React.PureComponent<
  CompositeProps,
  CompositeState
> {
  static className = COMPOSITE_CLASSNAMES.component
  static defaultProps = {
    size: 'md',
    separator: '',
  }

  constructor(props) {
    super(props)

    const { fields, maskItems } = this.getChildrenFromProps(props)

    this.state = {
      fields,
      hasActiveFields: false,
      inputState: null,
      maskItems,
    }
  }

  groupRef: HTMLDivElement
  maskRef: HTMLDivElement

  setGroupNode = node => {
    this.groupRef = node
  }

  setMaskNode = node => {
    this.maskRef = node
  }

  getChildrenFromProps = (props): any => {
    let fields: React.ReactElement<any>[] = []
    let maskItems: { name: string; text: string }[] = []

    React.Children.forEach(props.children, (child: React.ReactElement<any>) => {
      maskItems.push({
        name: child.props.name,
        text: child.props.value ? child.props.value : '',
      })

      fields.push(
        React.cloneElement(child, {
          key: child.props.name,
          inline: true,
          size: props.size,
          onInputFocus: this.handleFieldFocus(child.props.onInputFocus),
          onInputBlur: this.handleFieldBlur(child.props.onInputBlur),
          onKeyDown: this.handleFieldKeyEvent(child.props.onInputKeyDown),
          onKeyPress: this.handleFieldKeyEvent(child.props.onInputKeyPress),
          onKeyUp: this.handleFieldKeyEvent(child.props.onInputKeyUp),
          onChange: this.handleChange(child.props.onChange),
          onEnter: this.handleEnter(child.props.onEnter),
          onEscape: this.handleEscape(child.props.onEscape),
        })
      )
    })

    return { fields, maskItems }
  }

  componentDidUpdate(prevProps) {
    /* istanbul ignore next */
    if (!equal(this.props.children, prevProps.children)) {
      const { fields, maskItems } = this.getChildrenFromProps(this.props)

      this.setState({ fields, maskItems })
    }

    if (this.state.inputState === 'blurred') {
      /**
       * Beware: Trickery ahead
       *
       * Scenario: we have 2 fields: "name" an "city"
       *
       * When do we hide the mask? On focus, always
       * When do we show the mask? Can't be always on blur, because although it would technically work,
       * we would get a flash of the mask when we move the focus from "name" to "city"
       *
       * We know that moving the focus from one input (name) to another (city) triggers this sequence:
       * blur name, focus city
       *
       * Editable Field already takes care of adding a class when it's active, we just need to wait a bit
       * so that the focus event gets triggered right after the blur, and that is when we act
       */
      setTimeout(() => {
        let hasActiveFields = false
        const Fields = this.groupRef.querySelectorAll(
          `.${EDITABLEFIELD_CLASSNAMES.field}`
        )

        Fields.forEach(field => {
          // It is tested (composite test: "component did update" line:326)
          /* istanbul ignore next */
          if (field && field.classList.contains(STATES_CLASSNAMES.isActive)) {
            hasActiveFields = true
          }
        })

        // It is tested (composite test: "component did update" line:326)
        /* istanbul ignore next */
        if (!hasActiveFields) {
          // Let's remove the transition from all but the first focus indicator
          const focusIndicators = Array.from(
            this.groupRef.querySelectorAll(
              `.${INPUT_CLASSNAMES.focusIndicator}`
            )
          ).slice(1)
          /* istanbul ignore next */
          focusIndicators.forEach((fi: HTMLElement) => {
            fi.style.transition = 'none'
          })
          this.setState({ inputState: null, hasActiveFields })
        }
      }, 100)
    } else if (this.state.inputState === 'focused') {
      // Let's reinstate the transition for the focus indicators
      const focusIndicators = Array.from(
        this.groupRef.querySelectorAll(`.${INPUT_CLASSNAMES.focusIndicator}`)
      )

      /* istanbul ignore next */
      focusIndicators.forEach((fi: HTMLElement) => {
        fi.removeAttribute('style')
      })
    }
  }

  handleFieldFocus = passedFn => {
    return () => {
      passedFn && passedFn()

      this.setState({ inputState: 'focused', hasActiveFields: true })

      this.maskRef.removeAttribute('tabindex')
    }
  }

  handleFieldKeyEvent = passedFn => {
    return (...params) => {
      passedFn && passedFn(...params)
    }
  }

  handleFieldBlur = passedFn => {
    return () => {
      passedFn && passedFn()

      this.setState({ inputState: 'blurred' })
    }
  }

  handleChange = passedFn => {
    return ({ name, value }) => {
      passedFn && passedFn()

      const { maskItems } = this.state

      this.setState({
        maskItems: maskItems.map(m => {
          if (name && name.includes(m.name)) {
            return { ...m, text: value[0].value }
          }
          return m
        }),
      })
    }
  }

  handleEnter = passedFn => {
    return () => {
      passedFn && passedFn()

      this.setState({ inputState: null, hasActiveFields: false }, () => {
        this.maskRef.setAttribute('tabindex', '0')
        this.maskRef.focus()
      })
    }
  }

  handleEscape = passedFn => {
    return ({ value, name }) => {
      const { maskItems } = this.state
      passedFn && passedFn()

      this.setState(
        {
          inputState: null,
          hasActiveFields: false,
          maskItems: maskItems.map(m => {
            if (name.includes(m.name)) {
              return { ...m, text: value[0].value }
            }
            return m
          }),
        },
        () => {
          this.maskRef.setAttribute('tabindex', '0')
          this.maskRef.focus()
        }
      )
    }
  }

  handleMaskClick = name => {
    if (name === 'placeholder') {
      const input = this.groupRef.querySelector('input')

      input && input.focus()
      return
    }

    const inputs = this.groupRef.querySelectorAll('input')

    // It is tested
    /* istanbul ignore next */
    if (inputs) {
      for (let index = 0; index < inputs.length; index++) {
        const element = inputs[index]

        if (element.id.includes(name)) {
          element.setSelectionRange &&
            element.setSelectionRange(
              element.value.length,
              element.value.length
            )
          element.focus()
          return
        }
      }
    }
  }

  handleMaskKeyDown = event => {
    const isEnter = event.key === key.ENTER
    const isEscape = event.key === key.ESCAPE

    if (isEnter) {
      const input = this.groupRef.querySelector('input')

      input && input.focus()
      this.maskRef.removeAttribute('tabindex')
    }
    // It is tested
    /* istanbul ignore next */
    else if (isEscape) {
      this.maskRef.removeAttribute('tabindex')
    }
  }

  renderMaskContent = () => {
    const { placeholder, separator } = this.props
    const { maskItems } = this.state

    const maskItemsWithValue = maskItems.filter(m => Boolean(m.text))

    if (maskItemsWithValue.length > 0) {
      return maskItemsWithValue.map((m, index, self) => (
        <span
          className={COMPOSITE_CLASSNAMES.maskItem}
          key={m.name}
          onClick={() => {
            this.handleMaskClick(m.name)
          }}
        >
          {m.text}
          {index !== self.length - 1 ? `${separator}\u00a0` : ''}
        </span>
      ))
    }

    return (
      <span
        className={classNames(
          COMPOSITE_CLASSNAMES.maskItem,
          STATES_CLASSNAMES.isPlaceholder
        )}
        onClick={() => {
          this.handleMaskClick('placeholder')
        }}
      >
        {placeholder}
      </span>
    )
  }

  render() {
    const { size, className } = this.props
    const { fields, hasActiveFields } = this.state

    return (
      <ComponentUI
        className={classNames(
          className && className,
          EditableFieldComposite.className,
          hasActiveFields && STATES_CLASSNAMES.hasActiveFields,
          size === 'lg' && STATES_CLASSNAMES.isLarge
        )}
        ref={this.setGroupNode}
      >
        {fields}
        <ComposedMaskUI
          className={classNames(
            COMPOSITE_CLASSNAMES.mask,
            hasActiveFields && STATES_CLASSNAMES.isHidden
          )}
          ref={this.setMaskNode}
          onKeyDown={this.handleMaskKeyDown}
        >
          {this.renderMaskContent()}
        </ComposedMaskUI>
      </ComponentUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPOSITE_COMPONENT_KEY)(
  EditableFieldComposite
)

export default PropConnectedComponent
