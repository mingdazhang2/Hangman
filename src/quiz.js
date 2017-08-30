/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */

class Quiz {
    constructor(xml) {
        this.xml = xml // The config.xml file
        this.myHangmans = [] // [{hangman1},{hangman2}...]
        this.passingScore = 0 // The passingScore in the xml file
        this.score = 0 // The score that shows in the top of the screen
        this.incorrectWeight = 0 // For calculating the score
		
        this.setUp() 
        
    }
		/* Build up the quiz
		*/ 
    setUp() {
    		// Create Quiz elements
        this.createQuiz()
        // Set the passing score
       // this.setPassingScore()
        // Set the answerscore base on the number of the answer cards
        //this.setAnswerScore()
        // Set the weight of answer for calculating the final score
        //this.setIncorrectWeight()
    }
    /* Get the quiz type 
    * it includes "drag" and "input" types
    */ 
	getQuizType(){
			return  this.xml.getElementsByTagName('match')[0].attributes.getNamedItem("inputtype").value
  		 		
		}
		/*Get the parameters from the xml 
		*for building up the quiz.
		*/ 
    createQuiz() {	
    		// Get question list
  		  let pairs = this.xml.getElementsByTagName('pair')
  		  // Loop the question list to get "labely", "labelX", "tagetX", "tagetY" to set the location of labels and tagetPoints
  		  Array.from(pairs).forEach( pair =>{
            let question = pair.getElementsByTagName('question')[0].innerHTML
            let answer = pair.getElementsByTagName('answer')[0].innerHTML
            let hangman = {'question':question,'answer':answer}
            this.myHangmans.push(hangman)
  		  	})
          
    	
        
    }
		/*Setting the passing score of quiz
		*/ 
    setPassingScore() {
        let passingScore = this.xml.getElementsByTagName('passing-score')[0]
        if(passingScore){
        	this.passingScore = Number(passingScore.innerHTML)
        }
        
    }
		/*Call back each answer
		*/ 
    forAllAnswers(callback) {
        this.quiz.forEach(questionAnswerSet => {
            questionAnswerSet.answers.forEach(answer => {
                callback(answer)
            })
        })
    }
		/*Get the length of the quiz
		*/ 
    countQuestions() {
        return this.quiz.length
    }
		/*count answers
		*/
    countAnswers() {
        return this.quiz.reduce((acc, cur) => acc + cur.answers.length, 0)
    }
		/*Calculating the score for each answer
		*/ 
    calcAnswerScore() {
        let answerScore = 100 / this.countAnswers()
        return answerScore
    }
		/*Calculating the incorrectWeigth
		*/  
    calcIncorrectWeight() {
        let answerScore = this.calcAnswerScore()
        let incorrectWeight = answerScore * (1 / (this.countQuestions() - 1))
        return incorrectWeight
    }
		/*Set the score for each answer
		*/ 
    setAnswerScore() {
        let answerScore = this.calcAnswerScore()
        this.forAllAnswers(answer => {
            answer.setAnswerScore(answerScore)
        })
    }
		/*Reduce the Score when users get wrong answers
		*/ 
    reduceAnswerScore() {
        //this.score -= answer.reduceAnswerScore(this.incorrectWeight)
        this.score = this.score - this.calcIncorrectWeight()*this.calcAnswerScore()
        this.score = (this.score <= 0) ? 0 : this.score
        let eventInput = new Event('scoreUpdateEvent')
        window.dispatchEvent(eventInput)
    }
		/*Set the incorrectWeight by calling 
		*the calcIncorrectWeight function
		*/ 
    setIncorrectWeight() {
        this.incorrectWeight = this.calcIncorrectWeight()
    }
		/* Adding up the updating score event
		*/
    addQuizScore(answer) {
        this.score += answer.answerScore
        let eventInput = new Event('scoreUpdateEvent')
        window.dispatchEvent(eventInput)
    }
		/*Make the score to integer
		*/ 
    getRoundedQuizScore() {
        return Math.round(this.score)
    }
		/* Find the answer
		*/
    findAnswer(innerHTML) {
        let foundAnswer
        this.forAllAnswers(answer => {
            let p = document.createElement('p')
            p.innerHTML = answer.answerText
            if (p.innerHTML == innerHTML) {
                foundAnswer = answer
            }
        })
        return foundAnswer
    }
}
