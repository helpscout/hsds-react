import { replaceModuleNames } from './ReplaceImportsTransform'

// inspired by https://github.com/jcoreio/jscodeshift-transport
export default function dropdownV2Transform(fileInfo, api) {
  const moduleName = 'Dropdown/DropdownV2'
  const moduleNameTarget = 'Dropdown'
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const file = fileInfo.path

  const processClassnames = p => {
    const { node } = p
    const quasis = node.quasis.map(q =>
      j.templateElement(
        {
          cooked: q.value.cooked.replace('DropdownV2', 'Dropdown'),
          raw: q.value.raw.replace('DropdownV2', 'Dropdown'),
        },
        false
      )
    )

    node.quasis = quasis

    return node
  }

  // replace import path
  replaceModuleNames(j, file, root, moduleName, moduleNameTarget)

  //replace classNames
  const cssElements = root.find(j.TemplateLiteral).filter(p => {
    const hasVariable =
      p.value.quasis.length > 0 &&
      p.value.quasis.some(n => {
        const rawString = n.value.raw.toString()
        return rawString.includes('DropdownV2')
      })
    return hasVariable
  })

  cssElements.replaceWith(processClassnames)

  return root.toSource()
}
