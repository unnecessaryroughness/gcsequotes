const parsetext = require('../js/parsetext')
const prompts = require('../js/constructprompt')

const json = parsetext('an_inspector_calls').quotes[0]

const prompt = prompts.constructWhatPrompt(json, 'An Inspector Calls')
const promptAnswer = prompts.constructWhatPromptAnswer(json)

console.log("\n\n")
console.log(prompt)
console.log(promptAnswer)
console.log("\n")


const rprompt = prompts.constructWhoPrompt(json, 'An Inspector Calls')
const rpromptAnswer = prompts.constructWhoPromptAnswer(json)

console.log("\n")
console.log(rprompt)
console.log(rpromptAnswer)
console.log("\n")


const yprompt = prompts.constructWhyPrompt(json, 'An Inspector Calls')
const ypromptAnswer = prompts.constructWhyPromptAnswer(json)

console.log("\n")
console.log(yprompt)
console.log(ypromptAnswer)
console.log("\n")




