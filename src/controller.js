/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */
class Controller {
    /**
     * Build up controller with Quiz and View parameters
     * @param {Quiz} newQuiz
     * @param {View} newView
     */
    constructor(newQuiz, newView) {
        // Model: Quiz instance
        Controller.myQuiz = newQuiz
        // View: View class 
        Controller.myView = newView
        // The array of the labels or the input boxess
       // Controller.boxes = []
        Controller.createQuizElements()
        Controller.setUpEventListeners()
    }

    /**
     * Create Quiz elements, create the boxes and answer cards
     * and the index of boxes
     */
    static createQuizElements() {
       
        // Get all the questionAnswer set
        let hangmans = Controller.myQuiz.myHangmans

        for (let i = 0; i < hangmans.length; i++) {
            // Create question label
            Controller.myView.createHangmanBoxElement(hangmans[i],i)
          
        }

    }

    /**
     * Set up events listeners
     */
    static setUpEventListeners() {
      //  window.addEventListener('keyupEvent', Controller.keyupEventHandler, false) // when "check" button clicked
        window.addEventListener('submitEvent', Controller.submitEventHandler, false) // when "submit" button clicked
        window.addEventListener('tryAgainEvent', Controller.tryAgainEventHandler, false) // when "Try Again" button clicked
       }
  /**
   * Sleeping function
   * @param  {Number} time The time that system sleep
   * @return {Promise}      Returns a Promise object
   */
  static sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
    /**
     * Build up submit button event
     */
    static submitEventHandler(event) {

        let passingScore = Controller.myQuiz.passingScore
        let questions = Controller.myQuiz.myHangmans.map(questionAnswerSet => questionAnswerSet)

        let score = Controller.myQuiz.calculateResult(questions)
        
         Controller.myView.displayResult(score, passingScore)
         Controller.sleep(3000).then(() => {
    // The action after sleeping    
    Controller.myView.sendScoreToMoodle(score)
    }) 
         
    }
    /** Try again event when uses have been marked,the button appears on the prompt window
     */
    static tryAgainEventHandler(event) {
        location.reload()
    }
    /** Update the score when the input type is "drag" in the xml
     */
    static scoreUpdateEventHandler(event) {
       let score = Controller.myQuiz.calculateResult()
       Controller.myView.updateCurrentScore(score)
            }

}