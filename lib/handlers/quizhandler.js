const questionSearch = require('../js/questionsearch')
const parseSpeech = require('../js/parsespeech.js')

module.exports = {
  canHandle(handlerInput) {
    let { type, intent } = handlerInput.requestEnvelope.request
    return type === 'LaunchRequest' || (type === 'IntentRequest' && intent.name === 'StartGameIntent')
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    const slots = (request.intent && request.intent.slots) ? request.intent.slots : null
    let speechText = parseSpeech('salutations', 'welcome')

    if (slots && slots.textname && slots.textname.value) {
      let requestedText = slots.textname.value
      let questionSet = questionSearch(requestedText)
      speechText = parseSpeech('salutations', 'question_prep', requestedText)
    } else {
      speechText += parseSpeech('salutations', 'pick_a_quiz')
    }

    //TODO: NEED TO HANDLE SLOTS THAT DON'T MARRY UP TO A REAL TEXT OR TEXT-GROUP 



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
