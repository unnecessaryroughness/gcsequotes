const questionSearch = require('../js/questionsearch')

console.log(`\nsearching for ${process.argv[2]}...\n`)
let questionSet = questionSearch(process.argv[2])

console.log(JSON.stringify(questionSet, null, 2))
console.log(`\n`)
