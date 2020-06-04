Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = _default

function _default(babel) {
  const { types: t } = babel
  return {
    name: 'hsds-component-import',
    visitor: {
      ImportDeclaration(path, state) {
        const packages = state.opts.packages
          ? [].concat(state.opts.packages)
          : ['@helpscout/hsds-react']
        let packageName = path.node.source.value

        if (shouldBail(packageName, packages)) return null

        if (packageName.endsWith('/')) {
          packageName = packageName.slice(0, packageName.length - 1)
        }

        if (!packageName.includes('components')) {
          packageName += '/components'
        }

        const program = path.findParent(t.isProgram)

        path.node.specifiers.forEach(specifier => {
          const identifier = specifier.local
          const identifierName = identifier.name
          const defaultImportSpecifier = t.importDefaultSpecifier(identifier)
          let pkgPath = `${packageName}`

          if (!packageName.includes(identifierName)) {
            pkgPath += `/${identifierName}`
          }

          const newImportDeclaration = t.importDeclaration(
            [defaultImportSpecifier],
            t.stringLiteral(pkgPath)
          )
          program.node.body.unshift(newImportDeclaration)
        })

        path.remove()
      },
    },
  }
}

function shouldBail(packageName, packages) {
  if (!packageName) return true
  if (packageName.includes('utilities')) return true
  if (packageName.includes('adapters')) return true
  let found = false

  for (let i = 0; i < packages.length; i++) {
    if (packageName.includes(packages[i])) {
      found = true
    }
  }

  return !found
}
