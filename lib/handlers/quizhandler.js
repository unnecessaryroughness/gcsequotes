const questionSearch  = require('../js/questionsearch')
const parseSpeech     = require('../js/parsespeech')
const validProperty   = require('../js/validproperty')
const questionManager = require('../js/questionmanager')
const sessionManager  = require('../js/sessionmanager')
const constructPrompt = require('../js/constructprompt')
const JMESPATH        = require('jmespath')

// need these intents: 
  // RestartIntent
  // RepeatIntent
  // StopIntent

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
      let sessionData = sessionManager.getSession(handlerInput)
      let requestedText = slots.textname.value
      let questionSet = questionSearch(requestedText)
      
      sessionData.questionList = questionManager.prepQuestions(questionSet)
      sessionManager.updateSession(handlerInput, sessionData)
      
      let totalQuestions = sessionData.questionList.length

      if (totalQuestions == 0) {
        speechText = parseSpeech('errors', 'found_no_questions', requestedText)        
      } else {
        speechText = parseSpeech('setup', 'question_prep', totalQuestions , requestedText)
        speechText += parseSpeech('setup', 'which_game_type')
      } 
    } else {
      speechText += parseSpeech('salutations', 'pick_a_quiz')
    }

    let skillName = 'GCSE Quotes'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, '')
      .getResponse();
  }
}
