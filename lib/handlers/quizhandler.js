const questionSearch  = require('../js/questionsearch')
const parseSpeech     = require('../js/parsespeech.js')
const validProperty   = require('../js/validproperty')
const JMESPATH        = require('jmespath')

module.exports = {
  canHandle(handlerInput) {
    let { type, intent } = handlerInput.requestEnvelope.request
    return type === 'LaunchRequest' || (type === 'IntentRequest' && intent.name === 'StartGameIntent')
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    const slots = validProperty(request, 'intent.slots') ? request.intent.slots : null
    let speechText = parseSpeech('salutations', 'welcome')

    if (validProperty(slots, 'textname.value')) {
      let requestedText = slots.textname.value
      let questionSet = questionSearch(requestedText)
      let totalQuestions = JMESPATH.search(questionSet, '[*].quotes[]').length

      if (totalQuestions == 0) {
        speechText = parseSpeech('errors', 'found_no_questions', requestedText)        
      } else {
        speechText = parseSpeech('salutations', 'question_prep', totalQuestions , requestedText)
      } 

    } else {
      speechText += parseSpeech('salutations', 'pick_a_quiz')
    }



    // let sessionData = sessionManager.getSessionData(handlerInput)
    // let intentSpeechResponses = speechResponses(sessionAttributes.intentType)
    
    // ask random questions and mark in session which questions have been asked and which were correct

    // when user says "stop" tally up the score and say it before exiting.

    // need these intents: 
      // RestartIntent
      // RepeatIntent
      // StopIntent

    let skillName = 'GCSE English'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, speechText)
      .getResponse();
  }
}
