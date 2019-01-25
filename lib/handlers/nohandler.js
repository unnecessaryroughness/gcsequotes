const parseSpeech     = require('../js/parsespeech')
const constructPrompt = require('../js/constructprompt')
const sessionManager  = require('../js/sessionmanager')
const askQuestion     = require('../js/askquestion')

module.exports = {
  canHandle(handlerInput) {
    const {type, intent} = handlerInput.requestEnvelope.request
    return type === 'IntentRequest' && intent.name === 'AMAZON.NoIntent'
  },
  handle(handlerInput) {
    let sessionData = sessionManager.getSession(handlerInput)
    let speechText = ''

    switch (sessionData.lastAction) {
      case "answerquestion": 
        const questionIndex = parseInt(sessionData.currentQuestion)-1
        sessionData.questionList[questionIndex].correct = false
        sessionData = askQuestion(sessionData)
        speechText = parseSpeech('gameplay', 'bad_luck')
        if (sessionData.currentQuestion > 0) {
          speechText += parseSpeech('gameplay', 'next_question')
        }
        speechText += sessionData.speechText
        break
      default: 
        speechText = parseSpeech('errors', 'no_out_of_context')
        sessionData.lastAction = 'error'
        break
    }

    sessionManager.updateSession(handlerInput, sessionData)

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
}
