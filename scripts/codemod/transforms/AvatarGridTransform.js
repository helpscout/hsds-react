import { replaceModuleNames } from './ReplaceImportsTransform'

export default function avatarGridTransform(fileInfo, api) {
  const moduleName = '/AvatarGrid'
  const moduleNameTarget = '/AvatarList'
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const file = fileInfo.path

  const processClassnames = p => {
    const { node } = p
    const quasis = node.quasis.map(q =>
      j.templateElement(
        {
          cooked: q.value.cooked.replace('c-AvatarGrid', 'c-AvatarList'),
          raw: q.value.raw.replace('c-AvatarGrid', 'c-AvatarList'),
        },
        false
      )
    )

    node.quasis = quasis

    return node
  }

  const processAvatarGridComponent = p => {
    const jSXElement = p.value

    const gridAttribute = j.jsxAttribute(
      j.jsxIdentifier('grid'),
      j.jsxExpressionContainer({ type: 'Literal', value: true })
    )
    const centerAttribute = j.jsxAttribute(
      j.jsxIdentifier('center'),
      j.jsxExpressionContainer({ type: 'Literal', value: true })
    )

    jSXElement.openingElement.name.name = 'AvatarList'

    if (jSXElement.closingElement) {
      jSXElement.closingElement.name.name = 'AvatarList'
    }

    jSXElement.openingElement.attributes = [
      gridAttribute,
      centerAttribute,
      ...jSXElement.openingElement.attributes,
    ]
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
        return rawString.includes('AvatarGrid')
      })
    return hasVariable
  })

  cssElements.replaceWith(processClassnames)

  // replace jsx component
  const elements = root.findJSXElements('AvatarGrid')

  elements.forEach(processAvatarGridComponent)

  return root.toSource()
}
