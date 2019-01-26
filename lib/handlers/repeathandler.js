const parseSpeech     = require('../js/parsespeech')
const sessionManager  = require('../js/sessionmanager')
const JMESPATH        = require('jmespath')

module.exports = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request
      return request.type === 'IntentRequest' && request.intent.name === 'RepeatIntent'
    },
    handle(handlerInput) {
      let sessionData = sessionManager.getSession(handlerInput) 
      if (sessionData.suspendUnhandled) {
        speechText = parseSpeech('gameplay', 'repeat_question').concat(sessionData.speechText)
      } else {
        speechText = parseSpeech('errors', 'repeat_out_of_context')
      }

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    },
  }
  