const parsetext = require('../js/parsetext')
const prompts = require('../js/constructprompt')
const texts = [
  {file: "an_inspector_calls", name: "An Inspector Calls"},
  {file: "lord_of_the_flies", name: "Lord of the Flies"}
]
const json = parsetext(texts[1].file).quotes[2]

const prompt = prompts.constructWhatPrompt(json, texts[1].name)
const promptAnswer = prompts.constructAnswer(json)

console.log("\n\n")
console.log(`Q: ${prompt}`)
console.log(`A: ${promptAnswer}`)


const wprompt = prompts.constructWhoPrompt(json, texts[1].name)

console.log("\n")
console.log(`Q: ${wprompt}`)
console.log(`A: ${promptAnswer}`)


const yprompt = prompts.constructWhyPrompt(json, texts[1].name)

console.log("\n")
console.log(`Q: ${yprompt}`)
console.log(`A: ${promptAnswer}`)
console.log("\n")




