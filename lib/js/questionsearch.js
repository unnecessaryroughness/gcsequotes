const PARSER      = require('../js/parsetext')
const PATH        = require('path')
const JMESPATH    = require('jmespath')
const CONFIG_ROOT = './etc/'
const CONFIG_NAME = 'config'


const searchForTextSet = (searchText) => {
  const config = PARSER.parseYaml(CONFIG_NAME)
  let textSet = new Array()
  searchText = searchText.toLowerCase()

  // search for a matching text first 
  let foundText = JMESPATH.search(config, `config.texts[?name=='${searchText}']`)[0]
  if (foundText) {
    textSet.push(foundText)
  } else {
    // if we didn't find a text, look for a text_group
    let foundTextGroup = JMESPATH.search(config, `config.text_groups[?name=='${searchText}']`)[0]
    if (!foundTextGroup) {
      // and if we didn't find a text group based on name look for a text group alias
      foundTextGroup = JMESPATH.search(config, `config.text_groups[?altnames[?contains(@, '${searchText}')]]`)[0]
    }
    // map the found file names into the full text objects
    textSet = foundTextGroup.texts.map((groupMemberFile) => {
      return JMESPATH.search(config, `config.texts[?file=='${groupMemberFile}']`)[0]
    })

  }
  return textSet
}


const searchForQuestions = (searchText) => {
  const textsInScope = searchForTextSet(searchText)
  const questionsInScope = textsInScope.map((textDetails) => {
    return PARSER.parseTextYaml(textDetails.file)
  })
  return questionsInScope
}


module.exports = searchForQuestions