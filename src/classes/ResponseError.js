export default class ResponseError {
  constructor (messages, code) {
    this.messages = messages
    this.code = code
  }

  hasInput (input) {
    return !(typeof this.messages[input] === 'undefined')
  }

  getMessageFromInput (input) {
    if (!this.hasInput(input)) {
      return ''
    }
    if (Array.isArray(this.messages[input])) {
      return this.messages[input][0]
    }
    return this.messages[input]
  }

  getCode () {
    return this.code
  }
}
