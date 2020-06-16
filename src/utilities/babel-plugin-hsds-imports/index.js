'use strict'
const { readdirSync, statSync } = require('fs')
const { join, resolve } = require('path')

const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())
let COMPONENT_NAMES = []

try {
  COMPONENT_NAMES = dirs(resolve(__dirname, '../../components'))
} catch (e) {
  throw new Error('Components dir not found')
}

module.exports = function(babel) {
  const { types: t } = babel

  return {
    name: 'hsds-component-import',
    visitor: {
      ImportDeclaration(path, state) {
        const packages = state.opts.packages
          ? [].concat(state.opts.packages)
          : ['@helpscout/hsds-react']
        let packageName = path.node.source.value

        if (isWrongPackage(packageName, packages)) return null
        if (!areAllValidComponents(path.node.specifiers)) return null

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

function areAllValidComponents(specifiers) {
  if (!specifiers.length) return false
  if (!COMPONENT_NAMES.length) return false
  // If Button is not present something odd happened, bail
  if (!COMPONENT_NAMES.includes('Button')) return false

  for (let i = 0; i < specifiers.length; i++) {
    if (!COMPONENT_NAMES.includes(specifiers[i].local.name)) {
      return false
    }
  }

  return true
}

function isWrongPackage(packageName, packages) {
  if (!packageName) return true

  let found = false

  for (let i = 0; i < packages.length; i++) {
    if (packageName.includes(packages[i])) {
      found = true
    }
  }

  return !found
}
