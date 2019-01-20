QMAN = require('../js/questionmanager')
QS = require('../js/questionsearch')

console.log(`\n\n\n\n\n\n\n>>>>>\n`)

let questionSet = QS(process.argv[2])
let prepQuestions = QMAN.prepQuestions(questionSet)

console.log(JSON.stringify(prepQuestions, null, 2))

let nextQuestion = QMAN.getQuestion(prepQuestions)

console.log(`\nYour random question...\n`)
console.log(JSON.stringify(nextQuestion, null, 2))

console.log(`\nUpdating your random question...\n`)
let updQuestions = QMAN.updateQuestion(prepQuestions, nextQuestion.num, true, true)

console.log(JSON.stringify(updQuestions, null, 2))

console.log(`You got ${QMAN.getScore(updQuestions)} questions right!`)

console.log(`\nattempting to get another question... \n`)

// Question 2
while (nextQuestion.num) {
  nextQuestion = QMAN.getQuestion(prepQuestions)
  if (nextQuestion.num) {
    console.log(`\nYour random question...\n`)
    console.log(JSON.stringify(nextQuestion, null, 2))
    console.log(`\nUpdating your random question...\n`)
    updQuestions = QMAN.updateQuestion(prepQuestions, nextQuestion.num, true, true)
    console.log(JSON.stringify(updQuestions, null, 2))
    console.log(`You got ${QMAN.getScore(updQuestions)} questions right!`)
  } else {
    console.log('no more questions')
  }
}

