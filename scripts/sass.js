const fs = require('fs');
const mkdirp = require('mkdirp');
const harvester = require('seed-harvester');
const sass = require('node-sass');

const includePaths = harvester([
  './src/styles'
]);

// Default .css compile
sass.render({
  file: './src/styles/blue.scss',
  includePaths: includePaths,
  outputStyle: 'compact'
}, function(error, result) {
  if (error) {
    console.error(error);
    return process.exit(1);
  }
  else {
    mkdirp('./lib');
    fs.writeFile('./lib/styles.css', result.css, function(err){
      if(!err){
        return console.log('styles.css created.');
      }
    })
  }
});
