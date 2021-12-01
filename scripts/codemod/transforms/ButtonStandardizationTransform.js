export default function buttonStandardizationTransform(fileInfo, api) {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const isCss = fileInfo.path.endsWith('.css.js')

  if (
    fileInfo.path.endsWith('.test.js') ||
    fileInfo.path.includes('.stories') ||
    fileInfo.path.includes('components/Button/Button.jsx') ||
    fileInfo.path.includes('components/Button/Button.css.js')
  )
    return root.toSource()

  const processClassnames = p => {
    const { node } = p

    ;[
      { before: 'is-default', after: 'is-default-to-refactor' },
      { before: 'is-xxl', after: 'is-size-xxl' },
      { before: 'is-xl', after: 'is-size-xl' },
      { before: 'is-lg', after: 'is-size-lg' },
      { before: 'is-md', after: 'is-size-md' },
      { before: 'is-sm', after: 'is-size-sm' },
      { before: 'is-xs', after: 'is-size-xs' },
      { before: 'is-xxs', after: 'is-size-xxs' },
      { before: 'is-primary', after: 'is-theme-blue' },
      { before: 'is-secondary', after: 'is-theme-grey' },
      { before: 'is-success', after: 'is-theme-green' },
      { before: 'is-danger', after: 'is-theme-red' },
    ].forEach(({ before, after }) => {
      const quasis = node.quasis.map(q =>
        j.templateElement(
          {
            cooked: q.value.cooked.replace(before, after),
            raw: q.value.raw.replace(before, after),
          },
          false
        )
      )
      node.quasis = quasis
    })

    return node
  }

  const getAttribute = (attributes, name) => {
    const attr = attributes.find(a => {
      if (!a || !a.name || !a.name.name) return null
      return a.name.name === name
    })
    if (!attr) return {}

    return { name: attr.name.name, value: attr.value.value }
  }

  const filterAttributes = (attributes, extraAttrsToRemoves = []) => {
    const toRemove = [
      'allowContentEventPropagation',
      'disableOnLoading',
      'fetch',
      'spinButtonOnLoading',
      'canRenderFocus',
      'isBlock',
      ...extraAttrsToRemoves,
    ]

    return attributes.filter(a => {
      if (!a || !a.name || !a.name.name) return true
      return !toRemove.includes(a.name.name)
    })
  }

  const createAttribute = (name, value) => {
    if (value === true) {
      return j.jsxAttribute(j.jsxIdentifier(name), null)
    } else if (value === false) {
      j.jsxAttribute(
        j.jsxIdentifier(name),
        j.jsxExpressionContainer({
          type: 'Literal',
          value: false,
        })
      )
    }

    if (typeof value === 'string') {
      return j.jsxAttribute(j.jsxIdentifier(name), j.literal(value))
    }

    return j.jsxAttribute(
      j.jsxIdentifier(name),
      j.jsxExpressionContainer({
        type: 'Literal',
        value: value,
      })
    )
  }

  const renameAttribute = (attributes, before, after) => {
    return attributes.map(a => {
      if (a && a.name && a.name.name && a.name.name === before) {
        a.name.name = after
      }
      return a
    })
  }

  const processAttributes = jSXElement => {
    const { attributes } = jSXElement
    const { value: kind } = getAttribute(attributes, 'kind')
    const { value: state } = getAttribute(attributes, 'state')
    const { value: size } = getAttribute(attributes, 'size')
    const { value: shape } = getAttribute(attributes, 'shape')

    const toValidateAttr = createAttribute('data-button-tovalidate', true)
    const themeDefaultAttr = createAttribute('theme', 'blue')
    const sizeDefaultAttr = createAttribute('size', 'lg')

    const outlinedAttr = createAttribute('outlined', true)
    const roundedAttr = createAttribute('rounded', true)
    const linkedAttr = createAttribute('linked', true)

    const extraAttrsToRemoves = [
      'kind',
      'size',
      'state',
      'shape',
      'withCaret',
      'isBorderless',
      'iconSize',
    ]

    // if there is no attribute at all, we'll add a data-tovalidate to list the button as a change and let developer decided what they need to do
    if (!kind && !state && !size) {
      return [
        toValidateAttr,
        themeDefaultAttr,
        sizeDefaultAttr,
        outlinedAttr,
        ...filterAttributes(attributes, extraAttrsToRemoves),
      ]
    }

    const nextAttributes = []
    if (size === 'xl' || size === 'lgxl') {
      nextAttributes.push(createAttribute('size', 'xxl'))
    } else {
      nextAttributes.push(createAttribute('size', size))
    }

    if (state === 'danger') {
      nextAttributes.push(createAttribute('theme', 'red'))
    }
    if (state === 'success' || kind === 'tertiary') {
      nextAttributes.push(createAttribute('theme', 'green'))
    }
    if (state === 'grey') {
      nextAttributes.push(createAttribute('theme', 'grey'))
    }

    if (kind === 'primary' && !state) {
      nextAttributes.push(createAttribute('theme', 'blue'))
    }
    if (kind === 'secondary' && !state) {
      nextAttributes.push(createAttribute('theme', 'grey'))
    }

    if (kind === 'link') {
      nextAttributes.push(createAttribute('theme', 'grey'))
      nextAttributes.push(linkedAttr)
    }

    if (kind === 'secondary' || kind === 'tertiary') {
      nextAttributes.push(outlinedAttr)
    }
    if (shape === 'rounded') {
      nextAttributes.push(roundedAttr)
    }

    let updatedAttributes = renameAttribute(attributes, 'innerRef', 'ref')
    updatedAttributes = renameAttribute(attributes, 'buttonRef', 'ref')
    updatedAttributes = renameAttribute(attributes, 'isLoading', 'loading')

    return [
      ...nextAttributes,
      ...filterAttributes(updatedAttributes, extraAttrsToRemoves),
    ]
  }

  const processButtonComponent = p => {
    const jSXElement = p.value

    const isIcon = jSXElement.name.name.includes('Icon')

    // jSXElement.attributes = jSXElement.attributes.filter(a => {
    //   if (a.type === 'JSXSpreadAttribute') return true
    //   return a && a.name && a.name.name !== 'version'
    // })

    jSXElement.attributes = processAttributes(jSXElement)
  }

  //replace classNames
  const cssElements = root.find(j.TemplateLiteral).filter(p => {
    const hasVariable =
      p.value.quasis.length > 0 &&
      p.value.quasis.some(n => {
        const rawString = n.value.raw.toString()
        return rawString.includes('Button')
      })
    return hasVariable
  })

  cssElements.replaceWith(processClassnames)

  // replace jsx component
  const elements = root.find(j.JSXOpeningElement).filter(el => {
    if (el.node.name.name) {
      return el.node.name.name.includes('Button')
    }
    return false
  })

  elements.forEach(processButtonComponent)

  return root.toSource()
}
