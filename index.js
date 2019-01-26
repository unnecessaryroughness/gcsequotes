'use strict';

const Alexa = require('ask-sdk')
const skillBuilder = Alexa.SkillBuilders.standard()


exports.handler = skillBuilder
  .addRequestHandlers(
    require('./lib/handlers/quizhandler'),
    require('./lib/handlers/whatwhowhyhandler'),
    require('./lib/handlers/yeshandler'),
    require('./lib/handlers/nohandler'),
    require('./lib/handlers/stophandler'),
    require('./lib/handlers/repeathandler'),
    require('./lib/handlers/helphandler'),
    require('./lib/handlers/restarthandler'),
    require('./lib/handlers/sessionendedhandler'),
    require('./lib/handlers/unhandledhandler')  
  )
  .addErrorHandlers(require('./lib/handlers/errorhandler'))
  .lambda()
