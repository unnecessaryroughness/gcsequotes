const errorOccurred = 'An error occurred'

module.exports = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`)
      return handlerInput.responseBuilder
        .speak(errorOccurred)
        .reprompt(errorOccurred)
        .getResponse();
    }
  }

