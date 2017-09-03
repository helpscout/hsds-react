const fs = require('fs')
const mkdirp = require('mkdirp')
const harvester = require('seed-harvester')
const sass = require('node-sass')

const includePaths = harvester([
  './src/styles'
])

mkdirp('./dist')
mkdirp('./dist/css')
mkdirp('./dist/scss')

const files = [
  'blue',
  'blue.hs-app'
]

const renderFile = (fileName) => {
  // Default .css compile
  return sass.render({
    file: `./src/styles/${fileName}.scss`,
    includePaths: includePaths,
    outputStyle: 'compact'
  }, function (error, result) {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      fs.writeFile(`./dist/css/${fileName}.css`, result.css, function (err) {
        if (err) {
          console.error(error)
          return process.exit(1)
        }
        console.log(`${fileName}.css created.`)

        fs.writeFile(`./dist/scss/${fileName}.scss`, result.css, function (err) {
          if (err) {
            console.error(error)
            return process.exit(1)
          }
          console.log(`${fileName}.scss created.`)
        })
      })
    }
  })
}

files.forEach(file => renderFile(file))
