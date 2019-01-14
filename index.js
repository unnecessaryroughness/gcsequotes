'use strict';

const Alexa = require('ask-sdk')
const skillBuilder = Alexa.SkillBuilders.standard()


exports.handler = skillBuilder
  .addRequestHandlers(
    QuizHandler = require('./lib/handlers/quizhandler')
  )
  .addErrorHandlers(ErrorHandler)
  .lambda()
