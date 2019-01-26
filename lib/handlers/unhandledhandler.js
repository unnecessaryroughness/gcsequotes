const parseSpeech     = require('../js/parsespeech')
const constructPrompt = require('../js/constructprompt')
const sessionManager  = require('../js/sessionmanager')

module.exports = {
  canHandle(handlerInput) {
    return true
  },
  handle(handlerInput) {
    let sessionData = sessionManager.getSession(handlerInput)
    let speechText = ''

    if (sessionData.suspendUnhandled) {
      const questionIndex = parseInt(sessionData.currentQuestion)-1
      speechText = constructPrompt.constructAnswer(sessionData.questionList[questionIndex])
      speechText += parseSpeech('gameplay', 'did_you_get_it_right')
      sessionData.lastAction = 'answerquestion'
    } else {
      speechText = parseSpeech('errors', 'unhandled')
      sessionData.lastAction = 'unhandled'
    }

    sessionData.suspendUnhandled = false
    sessionManager.updateSession(handlerInput, sessionData)

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
}
