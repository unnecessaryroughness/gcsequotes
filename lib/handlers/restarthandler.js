const parseSpeech     = require('../js/parsespeech')
const sessionManager  = require('../js/sessionmanager')
const JMESPATH        = require('jmespath')

module.exports = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request
      return request.type === 'IntentRequest' && (request.intent.name === 'RestartIntent')
    },
    handle(handlerInput) {
      let sessionData = sessionManager.getSession(handlerInput) 
      sessionData.questionList = null
      speechText = parseSpeech('gameplay', 'restart_game').concat(parseSpeech('salutations', 'pick_a_quiz'))
      sessionManager.updateSession(handlerInput, sessionData)

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    },
  }
  