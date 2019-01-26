const parseSpeech     = require('../js/parsespeech')
const sessionManager  = require('../js/sessionmanager')
const askQuestion     = require('../js/askquestion')

module.exports = {
  canHandle(handlerInput) {
    const {type, intent} = handlerInput.requestEnvelope.request
    return type === 'IntentRequest' && (intent.name === 'WhatIntent' || intent.name === 'WhoIntent' || intent.name === 'WhyIntent')
  },
  handle(handlerInput) {
    const {intent} = handlerInput.requestEnvelope.request
    let sessionData = sessionManager.getSession(handlerInput)
    let speechText = ''
    sessionData.gameType = intent.name.toLowerCase().replace('intent', '')

    // make sure the call to this intent is in-context... if the currentQuestion in state is not ZERO then it's out of context & should error
    if (sessionData.currentQuestion != 0) {
      speechText = parseSpeech('errors', 'www_out_of_context')
      sessionData.lastAction = 'error'
    } else {
      sessionData = askQuestion(sessionData)
      speechText = parseSpeech('gameplay', 'first_question').concat(sessionData.speechText)
    }
    
    sessionManager.updateSession(handlerInput, sessionData)

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  }
}
