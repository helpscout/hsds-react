// inspired by https://github.com/jcoreio/jscodeshift-transport
export default function replaceImportTransform(
  file,
  api,
  { moduleName = 'PromoCard', moduleNameTarget = 'Card' }
) {
  const j = api.jscodeshift
  const root = j(file.source)
  replaceModuleNames(j, file.path, root, moduleName, moduleNameTarget)
  return root.toSource()
}

export const replaceModuleNames = (
  j,
  file,
  root,
  moduleName,
  moduleNameTarget,
  replaceSpecifiers = false
) => {
  const replaceAction = s => {
    return s.replace(moduleName, moduleNameTarget)
  }

  const processImport = nodePath => {
    const { node } = nodePath
    const {
      source: { value: moduleName },
    } = node
    if (replaceSpecifiers) {
      node.specifiers.forEach(s => {
        if (s.local) {
          s.local.name = moduleNameTarget
        }
      })
    }
    const replacement = replaceAction(moduleName)
    if (typeof replacement === 'string') node.source.value = replacement
  }

  const imports = root.find(j.ImportDeclaration, {
    source: { value: v => v.includes(moduleName) },
  })
  imports.forEach(processImport)
}
