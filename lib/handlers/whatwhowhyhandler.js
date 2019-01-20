const skillName = 'GCSE English Quotes'

module.exports = {
  canHandle(handlerInput) {
    const {type, intent} = handlerInput.requestEnvelope.request
    return type === 'IntentRequest' && (intent.name === 'WhatIntent' || intent.name === 'WhoIntent' || intent.name === 'WhyIntent')
},
  handle(handlerInput) {
    const {type, intent} = handlerInput.requestEnvelope.request
    const wwwSpeech = `i got a request for ${intent.name}`

    // make sure the call to this intent is in-context... if the currentQuestion in state is not ZERO then it's out of context & should error
    
    // grab the first question from the set in state

    // say that this is the first question 

    // ask the question and wait for a response

    return handlerInput.responseBuilder
      .speak(wwwSpeech)
      .reprompt(wwwSpeech)
      .getResponse();
  }
}
