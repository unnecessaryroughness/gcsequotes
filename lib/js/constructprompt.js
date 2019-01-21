'use strict';

const VOICE_CHANGE_START  = "<voice name='Matthew'>"
const VOICE_CHANGE_END    = '</voice>'
const WHAT_PROMPT_STUB    = 'What did'
const WHO_PROMPT_STUB     = 'Who'
const WHY_PROMPT_STUB     = 'Why did'
const STYLE_DEFAULT       = 'say'
const TO_EXISTS           = 'to'
const TO_ABSENT           = ''
const TEXT_PRESENT        = 'in'
const TEXT_ABSENT         = ''
const SPACE               = ' '
const COMMA               = ','
const Q_MARK              = '?'
const QT_MARK             = '"'
const STYLE_TENSE_MAP     = {
  'say': 'said',
  'exclaim': 'exclaimed',
  'chant': 'chanted',
  'often repeat': 'often repeated'
}

const findInMap = (map, key) => {
  key = key || STYLE_DEFAULT
  for (let elem in map) {
    if (map.hasOwnProperty(key)) {
      return map[key]
    }
  }
}

const constructTextClause = (textName) => {
  return textName ? TEXT_PRESENT.concat(SPACE, QT_MARK, textName, QT_MARK) : TEXT_ABSENT
}

const constructWhatPrompt = (quoteJson, textName) => {
  try {
    if (!textName && quoteJson.text) {
      textName = quoteJson.text
    }
    let {quote, who, to, style, prompt, location} = quoteJson
    let textClause = constructTextClause(textName)
    return WHAT_PROMPT_STUB.concat(
      SPACE,
      who, SPACE, 
      style ? style : STYLE_DEFAULT, SPACE, 
      to ? (TO_EXISTS + SPACE + to + SPACE) : TO_ABSENT,
      textClause, SPACE,
      prompt,
      Q_MARK
    )
  } catch (e) {
    console.log(`\nAn error occoured constructing the prompt: >>> \n\n`, e, '\n')
    return false
  }
}

const constructWhoPrompt = (quoteJson, textName) => {
  try {
    if (!textName && quoteJson.text) {
      textName = quoteJson.text
    }
    let {quote, who, to, style, prompt, location} = quoteJson
    let style_tense = findInMap(STYLE_TENSE_MAP, style)
    let textClause = constructTextClause(textName)
    return WHO_PROMPT_STUB.concat(
      SPACE,
      style_tense, SPACE, 
      VOICE_CHANGE_START, QT_MARK, quote, QT_MARK, VOICE_CHANGE_END, SPACE,
      textClause,
      Q_MARK
    )
  } catch (e) {
    console.log(`\nAn error occoured constructing the prompt: >>> \n\n`, e, '\n')
    return false
  }
}

const constructWhyPrompt = (quoteJson, textName) => {
  try {
    if (!textName && quoteJson.text) {
      textName = quoteJson.text
    }
    let {quote, who, to, style, prompt, location} = quoteJson
    let textClause = constructTextClause(textName)
    return WHY_PROMPT_STUB.concat(
      SPACE,
      who, SPACE,
      style ? style : STYLE_DEFAULT, SPACE, 
      VOICE_CHANGE_START, QT_MARK, quote, QT_MARK, VOICE_CHANGE_END, SPACE,
      to ? (TO_EXISTS + SPACE + to + SPACE) : TO_ABSENT,
      textClause, SPACE,
      Q_MARK
    )
  } catch (e) {
    console.log(`\nAn error occoured constructing the prompt: >>> \n\n`, e, '\n')
    return false
  }
}

const constructAnswer = (quoteJson) => {
  try {
    let {quote, who, to, style, prompt, location} = quoteJson
    style = style || STYLE_DEFAULT
    let style_tense = findInMap(STYLE_TENSE_MAP, style)
    return who.concat(
      SPACE,
      style_tense, SPACE,
      VOICE_CHANGE_START, QT_MARK, quote, QT_MARK, VOICE_CHANGE_END, SPACE,
      to ? (TO_EXISTS + SPACE + to + SPACE) : TO_ABSENT,
      prompt
    )
  } catch (e) {
    console.log(`\nAn error occoured constructing the answer: >>> \n\n`, e, '\n')
    return false
  }
}


module.exports = {
  constructWhatPrompt,
  constructWhoPrompt,
  constructWhyPrompt,
  constructAnswer
}