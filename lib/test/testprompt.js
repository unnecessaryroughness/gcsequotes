const parsetext = require('../js/parsetext')
const prompts = require('../js/constructprompt')

const json = parsetext('an_inspector_calls').quotes[0]
const prompt = prompts.constructPrompt(json)

console.log(prompt)

