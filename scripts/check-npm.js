const checkDependencies = require('check-dependencies')

const options = {
  checkGitUrls: true,
  install: true,
  packageManager: 'npm',
  verbose: true,
}

checkDependencies.sync(options)
