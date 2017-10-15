/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */

class Hangman {
  constructor (question, answer) {
    this.question = question
    this.answer = answer
    this.clue = ''
    this.wrongInput = ''
    this.wrongInputTime = 0
    this.inputs = ''
    this.remainingLetters = 0
    this.chance = 0
    this.isCorrect = false
  }
}
