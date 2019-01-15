module.exports = {
  canHandle(handlerInput) {
    let { type, intent } = handlerInput.requestEnvelope.request
    return type === 'LaunchRequest' || (type === 'IntentRequest' && intent.name === 'StartGameIntent')
  },
  handle(handlerInput) {
    // need a slot to determine what kind of questions we want - which book/poem

    // derive parameters based on the slot content - might make this a function in its own right 
    
    // call function to gather all question data that matches the slot criteria and store in session

    // ask random questions and mark in session which questions have been asked and which were correct

    // when user says "stop" tally up the score and say it before exiting.

    // need these intents: 
      // RestartIntent
      // RepeatIntent
      // StopIntent

    let skillName = 'GCSE English'
    let speechText = 'Ok, I got to the handler ok'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, speechText)
      .getResponse();
  }
}
