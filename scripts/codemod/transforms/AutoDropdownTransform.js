import { replaceModuleNames } from './ReplaceImportsTransform'

export default function autoDropdownTransform(fileInfo, api) {
  const moduleName = '/AutoDropdown'
  const moduleNameTarget = '/SearchableDropdown'
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const file = fileInfo.path

  const processClassnames = p => {
    const { node } = p
    const quasis = node.quasis.map(q =>
      j.templateElement(
        {
          cooked: q.value.cooked.replace(
            'c-AutoDropdown',
            'c-SearchableDropdown'
          ),
          raw: q.value.raw.replace('c-AutoDropdown', 'c-SearchableDropdown'),
        },
        false
      )
    )

    node.quasis = quasis

    return node
  }

  const processAutoDropdownComponent = p => {
    const jSXElement = p.value
    jSXElement.openingElement.name.name = 'SearchableDropdown'
    const newAttribute = j.jsxAttribute(
      j.jsxIdentifier('autoInput'),
      j.jsxExpressionContainer({ type: 'Literal', value: false })
    )
    jSXElement.openingElement.attributes = [
      newAttribute,
      ...jSXElement.openingElement.attributes,
    ]
    if (jSXElement.closingElement) {
      jSXElement.closingElement.name.name = 'SearchableDropdown'
    }
  }

  // !!! ACTIONS

  // replace import path
  replaceModuleNames(j, file, root, moduleName, moduleNameTarget)

  //replace classNames
  const cssElements = root.find(j.TemplateLiteral).filter(p => {
    const hasVariable =
      p.value.quasis.length > 0 &&
      p.value.quasis.some(n => {
        const rawString = n.value.raw.toString()
        return rawString.includes('c-ComboBox')
      })
    return hasVariable
  })

  cssElements.replaceWith(processClassnames)

  // replace jsx component
  const elements = root.findJSXElements('AutoDropdown')
  elements.forEach(processAutoDropdownComponent)

  return root.toSource()
}
