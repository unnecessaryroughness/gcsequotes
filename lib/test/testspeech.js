const parseSpeech = require('../js/parsespeech')

console.log(`\nsearching for ${process.argv[2]} ${process.argv[3]}...\n`)

let params = process.argv.slice(2)

let speech = parseSpeech(...params)

console.log(speech)
console.log(`\n`)
