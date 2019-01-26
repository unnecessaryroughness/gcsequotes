const parseSpeech     = require('../js/parsespeech')
const questionManager = require('../js/questionmanager')
const constructPrompt = require('../js/constructprompt')


const configureEndGame = (sessionData) => {
  sessionData.speechText = parseSpeech('gameplay', 'end_game', sessionData.score, sessionData.score != 1 ? 's' : '', sessionData.questionList.length)
  sessionData.speechText += parseSpeech('gameplay', 'restart_or_stop')
  sessionData.lastAction = 'endgame'
  sessionData.currentQuestion = 0
  return sessionData
}

const configureNextQuestion = (sessionData, question) => {
  let prompt = null
  switch(sessionData.gameType) {
    case 'who':
      prompt = constructPrompt.constructWhoPrompt(question)
      break
    case 'why':
      prompt = constructPrompt.constructWhyPrompt(question)
      break
    case 'what':
    default: 
      prompt = constructPrompt.constructWhatPrompt(question)
      break
  }
  sessionData.speechText = prompt
  sessionData.lastAction = 'askquestion'
  sessionData.currentQuestion = question.num
  sessionData.questionList[parseInt(question.num)-1].asked = true
  sessionData.suspendUnhandled = true  
  return sessionData
}

module.exports = (sessionData, intent) => {
  let question = questionManager.getQuestion(sessionData.questionList)
  if (question.endGame) {
    sessionData = configureEndGame(sessionData)
  } else {
    sessionData = configureNextQuestion(sessionData, question)
  }
  return sessionData
}