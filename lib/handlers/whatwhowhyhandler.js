const parseSpeech     = require('../js/parsespeech')
const questionManager = require('../js/questionmanager')
const constructPrompt = require('../js/constructprompt')
const sessionManager  = require('../js/sessionmanager')

module.exports = {
  canHandle(handlerInput) {
    const {type, intent} = handlerInput.requestEnvelope.request
    return type === 'IntentRequest' && (intent.name === 'WhatIntent' || intent.name === 'WhoIntent' || intent.name === 'WhyIntent')
},
  handle(handlerInput) {
    const {intent} = handlerInput.requestEnvelope.request
    let sessionData = sessionManager.getSession(handlerInput)
    let speechText = ''

    // make sure the call to this intent is in-context... if the currentQuestion in state is not ZERO then it's out of context & should error
    if (sessionData.currentQuestion != 0) {
      speechText = parseSpeech('errors', 'www_out_of_context')
    } else {
      let firstQuestion = questionManager.getQuestion(sessionData.questionList)
      let firstPrompt = null
      let gameType = intent.name.toLowerCase()
      
      switch(gameType) {
        case 'whointent':
          firstPrompt = constructPrompt.constructWhoPrompt(firstQuestion)
          break
        case 'whyintent':
          firstPrompt = constructPrompt.constructWhyPrompt(firstQuestion)
          break
        case 'whatintent':
        default: 
          firstPrompt = constructPrompt.constructWhatPrompt(firstQuestion)
          break
      }

      speechText = parseSpeech('gameplay', 'first_question').concat(firstPrompt)

      sessionData.gameType = gameType.replace('intent', '')
      sessionData.currentQuestion = firstQuestion.num
      sessionData.suspendUnhandled = true
      sessionManager.updateSession(handlerInput, sessionData)
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  }
}
