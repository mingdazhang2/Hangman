/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */

class Quiz {
    /**
     * The constructor function
     * @param  {Object} XML file Object
     */
    constructor(xml) {
        this.xml = xml // The config.xml file
        this.myHangmans = [] // [{hangman1},{hangman2}...]
        this.passingScore = 0 // The passingScore in the xml file
        this.score = 0 // The score that shows in the top of the screen
        this.incorrectWeight = 0 // For calculating the score
		this.numOfHangman = 0
        this.setUp() 
        
    }
	/**
     * Build up the quiz function
     */
    setUp() {
    		// Create Quiz elements
        this.createQuiz()
        // Set the passing score
        this.setPassingScore()
       
    }
  
	   /**
        *Get the parameters from the xml,for building up the quiz. 
		*/ 
    createQuiz() {	
    	
  		  let pairs = this.xml.getElementsByTagName('pair')
          let numOfHangman = this.xml.getElementsByTagName('match')[0].attributes.getNamedItem('numberofmemoryquestions').value
          let numOfQuestion = this.xml.getElementsByTagName('question').length
          

  		  Array.from(pairs).forEach( pair =>{
            let question = pair.getElementsByTagName('question')[0].innerHTML.trim()
            let answer = pair.getElementsByTagName('answer')[0].innerHTML.trim()
            let clue = this.createClue(answer)
            let remainingLetters = 0
            for (let i = 0; i < clue.length; i++) {
                
                if (clue[i] === '*') {
                remainingLetters++ 
                }
            }
            let hangman = {'question':question,'answer':answer,'wrongInput':'','wrongInputTime':0,'inputs':'','clue':clue,'remainingLetters':remainingLetters,'chance':3,'limit':3,'isCorrect':false}
            
            this.myHangmans.push(hangman)
  		  	}) 
          if (numOfHangman-numOfQuestion<0){
            this.myHangmans = this.getRandomArrayElements(this.myHangmans,numOfHangman)
            }      
    }
    /**
     * Create clue string
     * @param  {String} str The content in the clue Div tag
     * @return  {String} Return a clue string
     */
    createClue (str) {
    let reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/
    let cluStr = ''
    for (let letter of str) {
      if (!reg.test(letter)) {
        letter = '*'
      }
      cluStr += letter
    }
    return cluStr
}
    /**
     * Gets the random array elements from all the question.
     *
     * @param      {Array}  arr     The random sub array
     * @param      {Number}  count   The numbers of sub array elements
     * @return     {Array}  The random array elements.
     */
    getRandomArrayElements(arr, count) {
            let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        }

		/*Setting the passing score of quiz
		*/ 
    setPassingScore() {
        let passingScore = this.xml.getElementsByTagName('passing-score')[0]
        if(passingScore){
        	this.passingScore = Number(passingScore.innerHTML)
        }
        
    }
		/**
         *Get the length of the quiz
         *return     {Number} The number of hangmang questions
	     */ 
    countQuestions() {
        return this.myHangmans.length
    }
	/**
     * Calculate the socre of total questions
     * @return     {Number} Returns the finall score of the Hangman quiz 
     */
    calculateResult(questions) {
        let score = 0
        for (let i = 0; i < questions.length; i++) {
         if(questions[i].isCorrect){
            score+=questions[i].chance/questions[i].limit*this.getQuestionScore()
            }
        }
        return Math.round(score)
    }
		/**
         *Calculating the score for each answer
		 *@return     {Number} The score for each hangman question
         */ 
    getQuestionScore() {
        let answerScore = 100 / this.countQuestions()
        return answerScore
    }

}
