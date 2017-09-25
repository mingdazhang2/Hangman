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
     * Build up check button event
     */

 //    static keyupEventHandler (event) {
    
 //    let errorMsg = 'Error letters'
 //    let chancTip = 'Chance'
 // if(event.keyCode == 224||event.keyCode ==9||event.keyCode == 16||event.keyCode == 17||event.keyCode == 18){
                
 //                 return ;
 //            }
      
 //      let hangmanAnswerIndex = event.id.substr(-1)
 //      let hangman = View.quiz.myHangmans[hangmanAnswerIndex]
 //      let clue = this.parentElement.parentElement.getElementsByClassName('input-clue')[0].innerText
 //      let hangmanAnswer = hangman.answer
 //      let answerArray = clue.split('')
     
 //      let limitGuessTime = hangman.limit
 //      let audio = document.getElementById("failMusic");
     
 //            // effective!
 //      let guess = this.value.substr(-1)

 //           // let guess = this.value
 //      let guessLower = guess.toLowerCase()

     

 //      if (hangman.remainingLetters > 0) {
 //          // Get a guess from the player
 //        let guessArr = this.value.toLowerCase().split('')
 //       //If user inputs same letter more than twice, it will ignore the input  
 //        if (!hangman.inputs.split('').includes(guess)){
 //          hangman.inputs+=guess
         
 //          // User inputs a wrong letter
 //             if (!hangmanAnswer.split('').includes(guess)) {
              
 //              audio.play();
 //              if(!hangman.wrongInput.split('').includes(guess)&&event.keyCode!=8){
 //                hangman.wrongInput += guess
 //                hangman.chance--
                
 //              }

 //              this.parentElement.parentElement.getElementsByClassName('questionError-box')[0].innerText = errorMsg +':'+ hangman.wrongInput
 //              this.parentElement.parentElement.getElementsByClassName('tip')[0].innerText = chancTip+':'+(hangman.chance)+'/'+limitGuessTime
 //        }
 //                      // convert toLowerCase

       
 //          let guessArray = guessLower.split('')

 //          for (let i = 0; i < guessArray.length; i++) {
 //                        // update the game state with the guess
 //            for (let j = 0; j < hangmanAnswer.length; j++) {
 //              if (hangmanAnswer[j].toLowerCase() === guessLower[i]) {
 //                answerArray[j] = hangmanAnswer[j]
 //                this.parentElement.parentElement.getElementsByClassName('input-clue')[0].innerText = answerArray.join('')
 //                hangman.remainingLetters--
 //              }
 //            }
     
 //          }

 //        }
 //      } 
    
 //    if(hangman.remainingLetters<=0){
        
 //         this.style.backgroundColor =  "#9aecef"     
 //          this.disabled='disabled'

 //         this.parentElement.getElementsByClassName('check-icon')[0].style.visibility = 'visible'
 //         this.parentElement.getElementsByClassName('check-icon')[0].setAttribute('src','images/tick.png')
         
 //          }
 //       if(hangman.chance==0){
 //       this.disabled='disabled'
 //       this.style.backgroundColor =  "lightgrey"
 //        this.parentElement.getElementsByClassName('check-icon')[0].style.visibility = 'visible'
 //        this.parentElement.getElementsByClassName('check-icon')[0].setAttribute('src','images/cross.png')
 //      }
 //          this.value = hangman.inputs          
 //    }
    /**
     * Build up submit button event
     */
    static submitEventHandler(event) {

        let passingScore = Controller.myQuiz.passingScore
        let questions = Controller.myQuiz.myHangmans.map(questionAnswerSet => questionAnswerSet)

        let score = Controller.myQuiz.calculateResult(questions)
        
         Controller.myView.displayResult(score, passingScore)
        // Controller.myView.sendScoreToMoodle(score)
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
       let score = Controller.myQuiz.calculateResult()
       Controller.myView.updateCurrentScore(score)
            }

}