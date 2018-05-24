export default class ErrorFormValidation {
  constructor (messages) {
    this.messages = messages
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
}
