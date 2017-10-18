import path from 'path'
import fse from 'fs-extra'
import glob from 'glob'

function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../dist/', path.basename(file))
  return new Promise(resolve => {
    fse.copy(file, buildPath, err => {
      if (err) throw err
      resolve()
    })
  }).then(() => console.log(`Copied ${file} to ${buildPath}`))
}

function createPackageFile() {
  return new Promise(resolve => {
    fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8', (err, data) => {
      if (err) {
        throw err
      }

      resolve(data)
    })
  })
    .then(data => JSON.parse(data))
    .then(packageData => {
      const { nyc, ...packageDataOther } = packageData

      const minimalPackage = {
        ...packageDataOther,
        main: './index.js',
        module: './index.es.js',
        private: false,
      }

      return new Promise(resolve => {
        const buildPath = path.resolve(__dirname, '../dist/package.json')
        const data = JSON.stringify(minimalPackage, null, 2)
        fse.writeFile(buildPath, data, err => {
          if (err) throw err
          console.log(`Created package.json in ${buildPath}`)
          resolve()
        })
      })
    })
}

const files = ['README.md', 'LICENSE']

Promise.all(files.map(file => copyFile(file)))
  .then(() => createPackageFile())