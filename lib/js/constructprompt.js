'use strict';

const PROMPT_STUB   = 'What did'
const STYLE_DEFAULT = 'say'
const TO_EXISTS     = 'to'
const TO_ABSENT     = ''
const SPACE         = ' '
const Q_MARK        = '?'


const constructPrompt = (quoteJson) => {
  try {
    console.log(quoteJson)
    let {quote, who, to, style, prompt, location} = quoteJson
    style = style || STYLE_DEFAULT 

    return PROMPT_STUB.concat(
      SPACE,
      who, SPACE, 
      style ? style : STYLE_DEFAULT, SPACE, 
      to ? (TO_EXISTS + SPACE + to + SPACE) : TO_ABSENT,
      prompt,
      Q_MARK
    )
  } catch (e) {
    console.log(`\nAn error occoured constructing the prompt: >>> \n\n`, e, '\n')
  }
}

const constructReversePrompt = (quoteJson) => {
  try {

  } catch (e) {

  }
}

module.exports = {
  constructPrompt,
  constructReversePrompt
}