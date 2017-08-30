/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */
class Controller {
    /**
     * Build up controller with Quiz and View parameters
     * @param {Quiz} newQuiz
     * @param {View} newView
     * @returns
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
        // Get the quiz input type
       // let quizType = Controller.myQuiz.getQuizType()
        // Create quiz image in the web
        //let questionImg = Controller.myView.createQuestionImg()
        // Get all the questionAnswer set
        let hangmans = Controller.myQuiz.myHangmans

        for (let i = 0; i < hangmans.length; i++) {
            // Create question label
            Controller.myView.createHangmanBoxElement(hangmans[i],i)
            // Create red point spot
          //  let point = Controller.myView.createPointElement(questions[i], box)
            // Best Option: draw the index to match each taget point and label
          //  Controller.myView.createIndex(point, box, i)
        }

    }

    /**
     * Set up events listeners
     */
    static setUpEventListeners() {
      //  window.addEventListener('keyupEvent', Controller.keyupEventHandler, false) // when "check" button clicked
      //  window.addEventListener('submitEvent', Controller.submitEventHandler, false) // when "submit" button clicked
      //  window.addEventListener('tryAgainEvent', Controller.tryAgainEventHandler, false) // when "Try Again" button clicked
      //  window.addEventListener('scoreUpdateEvent', Controller.scoreUpdateEventHandler, false) // when quiz score is updated
        //   window.addEventListener('resizeIframeEvent', Controller.resizeIframeEventHandler, false) // when an answer card is moved to a correct box
      //  window.addEventListener('dropEvent', Controller.dropEventHandler, false) // when an answer card is dropped to a box
    }
    /**
     * Build up check button event
     */

    static keyupEventHandler (event,i) {
        // Get all the questionAnswer set
            //let question = document.getElementById("xmlQuestion").value

          
    }
    /**
     * Build up submit button event
     */
    static submitEventHandler(event) {
        let quiztype = Controller.myQuiz.getQuizType()
        let score = Controller.myQuiz.getRoundedQuizScore()
        let passingScore = Controller.myQuiz.passingScore
        if (quiztype == 'drag') {
            Controller.myView.removeDraggableAll()
        } else {
            let questions = Controller.myQuiz.quiz.map(questionAnswerSet => questionAnswerSet)

            score = Controller.myView.calculateResultInput(questions)
        }
        Controller.myView.displayResult(score, passingScore)
        Controller.myView.sendScoreToMoodle(score)
    }
    /* Try again event when uses have been marked,
     *the button appears on the prompt window
     */
    static tryAgainEventHandler(event) {
        location.reload()
    }
    /* Update the score when the input type is "drag" in the xml
     */
    static scoreUpdateEventHandler(event) {
        let score = Controller.myQuiz.getRoundedQuizScore()
        Controller.myView.updateCurrentScore(score)
    }
    /* Control the size of the quiz, haven't use this function at the monment
     */
    static resizeIframeEventHandler(event) {
        parent.resizeIframe()
    }
    /* Drop event for dragging the answercards to the labels
     */
    static dropEventHandler(event) {
        let dropped = event.detail.question
        let dragged = event.detail.answer

        let target = Controller.myQuiz.quiz.find(questionAnswerSet => questionAnswerSet.question == dropped)
        let foundAnswer = Controller.myQuiz.findAnswer(dragged)

        if (target.answers.includes(foundAnswer)) {
            // correct answer get score
            Controller.myQuiz.addQuizScore(foundAnswer)
            Controller.myView.removeDraggable(dragged)
            Controller.myView.moveAnswerCardToBox(dragged, dropped)
        } else {
            // wrong answer reduce score
            //Controller.myQuiz.reduceAnswerScore(foundAnswer)
            Controller.myQuiz.reduceAnswerScore()

        }
    }
}