
function sessionTemplate () {
  this.questionList = [],
  this.currentQuestion = 0,
  this.load = (loadData) => {
    if (loadData) {
      this.questionList = JSON.parse(JSON.stringify(loadData.questionList))
      this.currentQuestion = loadData.currentQuestion
    }
    return this
  }
}

const getSession = (handlerInput) => {
  let sessionData = new sessionTemplate()
  let cachedSession = handlerInput.attributesManager.getSessionAttributes()
  if (cachedSession.questionList) {
    sessionData.load(cachedSession)
  }
  return sessionData
}

const updateSession = (handlerInput, sessionData) => {
  handlerInput.attributesManager.setSessionAttributes(sessionData)
}


module.exports = {
  getSession, 
  updateSession
}