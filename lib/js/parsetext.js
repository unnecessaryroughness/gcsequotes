'use strict';

const YAML      = require('js-yaml'),
      FS        = require('fs'),
      PATH      = require('path'),
      YAMLROOT  = '../../etc/texts/',
      YAMLEXT   = '.yml',
      FORMAT    = 'utf8'

const parseYaml = (yamlFile) => {
  try {
    const yamlFilePath = PATH.format({
      root: YAMLROOT, 
      name: yamlFile,
      ext: YAMLEXT
    })
    var doc = YAML.safeLoad(FS.readFileSync(yamlFilePath))
    return {
      quotes: doc.quotes,
      length: doc.quotes.length
    }
  } catch (e) {
    console.log(`\nerror reading YAML file: >>> \n\n`, e, '\n')
  }
}

module.exports = parseYaml
