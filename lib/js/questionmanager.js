const JMESPATH  = require('jmespath')
const RANDINT   = require('random-int')

const prepQuestions = (questionList) => {
  let questionNum = 0
  let questionsPrep = questionList.map((question) => {
    let quotesPrep = question.quotes.map((quote) => {
      questionNum++ 
      return {
        num: questionNum.toString(),
        asked: false, 
        correct: false,
        text: question.text,
        ...quote
      }
    })
    return quotesPrep
  })
  return JMESPATH.search(questionsPrep, '[*][?quote][]')
}

const getQuestion = (flatQuestionList) => {
  let availableQuestions = JMESPATH.search(flatQuestionList, '[?!asked]')
  let maxQuestion = availableQuestions.length
  console.log(`maxQuestion is ${maxQuestion}`)
  if (maxQuestion == 0) {
    return {endGame: true}
  } else {
    let randomQuestionNum = RANDINT(0, maxQuestion-1)
    return availableQuestions[randomQuestionNum]
  }
}

const updateQuestion = (flatQuestionList, qNumber, qAsked, qCorrect) => {
  let askedQuestion = JMESPATH.search(flatQuestionList, `[?num == '${qNumber}']`)[0]
  askedQuestion.asked = qAsked
  askedQuestion.correct = qCorrect 
  return flatQuestionList
}

const getScore = (flatQuestionList) => {
  return JMESPATH.search(flatQuestionList, '[?correct]').length
}



module.exports = {
  prepQuestions, 
  getQuestion, 
  updateQuestion,
  getScore
}