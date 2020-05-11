export default function buttonTransform(fileInfo, api) {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  const processClassnames = p => {
    const { node } = p
    const quasis = node.quasis.map(q =>
      j.templateElement(
        {
          cooked: q.value.cooked.replace('c-ButtonV2', 'c-Button'),
          raw: q.value.raw.replace('c-ButtonV2', 'c-Button'),
        },
        false
      )
    )

    node.quasis = quasis

    return node
  }

  const processButtonComponent = p => {
    const jSXElement = p.value
    jSXElement.attributes = jSXElement.attributes.filter(a => {
      if (a.type === 'JSXSpreadAttribute') return true
      return a && a.name && a.name.name !== 'version'
    })

    jSXElement.attributes.forEach(a => {
      if (
        a &&
        a.name &&
        a.name.name === 'kind' &&
        a.value.value === 'primaryAlt'
      ) {
        a.value.value = 'primary'
      }
      if (
        a &&
        a.name &&
        a.name.name === 'kind' &&
        a.value.value === 'secondaryAlt'
      ) {
        a.value.value = 'tertiary'
      }
    })
  }

  // !!! ACTIONS
  //replace classNames
  const cssElements = root.find(j.TemplateLiteral).filter(p => {
    const hasVariable =
      p.value.quasis.length > 0 &&
      p.value.quasis.some(n => {
        const rawString = n.value.raw.toString()
        return rawString.includes('ButtonV2')
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
