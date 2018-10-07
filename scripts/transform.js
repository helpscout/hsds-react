const fs = require('fs')
const path = require('path')
const glob = require('glob')

glob('stories/*.js', (err, files) => {
  files.forEach(file => {
    const dirname = path.dirname(file)
    const filename = path.basename(file)

    let ext = '.stories.js'
    // const content = fs.readFileSync(file)
    // if (content.indexOf("from 'react'") >= 0) {
    //   ext = '.tsx'
    // }

    const newFile = path.join(dirname, filename.replace('.js', ext))

    fs.renameSync(file, newFile)
  })
})
