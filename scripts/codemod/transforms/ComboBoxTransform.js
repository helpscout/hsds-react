import { replaceModuleNames } from './ReplaceImportsTransform'

// inspired by https://github.com/jcoreio/jscodeshift-transport
export default function comboBoxTransform(fileInfo, api) {
  const moduleName = '/ComboBox'
  const moduleNameTarget = '/SearchableDropdown'
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const file = fileInfo.path

  const processClassnames = p => {
    const { node } = p
    const quasis = node.quasis.map(q =>
      j.templateElement(
        {
          cooked: q.value.cooked.replace('c-ComboBox', 'c-SearchableDropdown'),
          raw: q.value.raw.replace('c-ComboBox', 'c-SearchableDropdown'),
        },
        false
      )
    )

    node.quasis = quasis

    return node
  }

  const processComboBoxComponent = p => {
    const jSXElement = p.value
    jSXElement.openingElement.name.name = 'SearchableDropdown'
    jSXElement.closingElement.name.name = 'SearchableDropdown'
  }

  // !!! ACTIONS

  // replace import path
  replaceModuleNames(j, file, root, moduleName, moduleNameTarget, true)

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
  const elements = root.findJSXElements('ComboBox')
  elements.forEach(processComboBoxComponent)

  return root.toSource()
}
