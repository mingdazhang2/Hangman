/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */
/** @class View */

class View {
  /**
   * Set up the quiz
   *
   * @param      {Quiz}  quiz    The quiz
   */
  static setUp (quiz) {
      //  View.setUpSubmitBtn('btn-submit')
       // View.setUpInput('input-answer-',quiz)
      //  View.setUpTryAgainBtn('btn-try-again')
    View.quiz = quiz
     //   View.questionLabels = [] //[{"questionBox":questionBox,"label":label}]
  }

    /**
     * Set up fireCustom event
     * @param  {String} eventName The name of event
     */
  static fireCustomEvent (eventName) {
    let eventInput = new Event(eventName)
    window.dispatchEvent(eventInput)
  }

    /* Set up try submit button
     */
    // static setUpSubmitBtn(tagId) {
    //     document.getElementById(tagId).onclick = function(event) {
    //         View.fireCustomEvent('submitEvent')
    //     }
    // }
  /**
   * Set up block of deleting operating
   *
   * @param      {String}  tagId   The tag identifier
   */
  static setUpNoDelete (tagId) {
    let inputTxt = document.getElementById(tagId)
    inputTxt.addEventListener('keydown', function (event) {
      let obj = event.target || event.srcElement

      if (event.keyCode == 8) {
                // alert(obj.readOnly)
        obj.readOnly = true
        obj.readOnly = false
        return false
      } else {
        obj.readOnly = false
      }
    })
  }
    /**
     * Set up input event
     * param      {String} tagId The targetId of a div
     */
  static setUpInput (tagId) {
    let inputTxt = document.getElementById(tagId)
    inputTxt.addEventListener('keyup', function (event) {
            // if(event.keyCode == 8){
            //     alert(8)
            //      return ;
            // }
      let clue = this.parentElement.getElementsByClassName('input-clue')[0].innerText
      let hangmanAnswerIndex = this.id.substr(-1)
      let hangman = View.quiz.myHangmans[hangmanAnswerIndex]
      let hangmanAnswer = hangman.answer
      let answerArray = clue.split('')
      let remainingLetters = 0
      
      let wrongInputTime = 0
      let guessTime = 0
      let audio = document.getElementById("failMusic");
      for (let i = 0; i < clue.length; i++) {
        if (clue[i] === '*') { remainingLetters++ }
      }
      hangman.remainingLetters=remainingLetters
            // effective!
      let guess = this.value.substr(-1)

           // let guess = this.value
      let guessLower = guess.toLowerCase()
      if (hangman.remainingLetters > 0) {
                // Get a guess from the player
        let guessArr = this.value.toLowerCase().split('')
        let inputs = ''
        if (!hangman.inputs.split('').includes(guess)){
          hangman.inputs+=guess
        }
            guessTime++
            // User inputs a wrong letter
            if (!hangmanAnswer.split('').includes(guess)) {
              
              audio.play();
              if(!hangman.wrongInput.split('').includes(guess)){
                hangman.wrongInput += guess
                hangman.wrongInputTime++
              }
              this.parentElement.getElementsByClassName('questionError-box')[0].innerText = hangman.wrongInput
              this.parentElement.getElementsByClassName('wrongInputTime-box')[0].innerText = hangman.wrongInputTime
        }
        
               // alert(guess)
              // convert toLowerCase

        if (guessLower === null) {
          alert('please input word')
        } else {
          let guessArray = guessLower.split('')
                    // alert(guessArray.toString())
          for (let i = 0; i < guessArray.length; i++) {
                        // update the game state with the guess
            for (let j = 0; j < hangmanAnswer.length; j++) {
              if (hangmanAnswer[j].toLowerCase() === guessLower[i]) {
                answerArray[j] = hangmanAnswer[j]
                this.parentElement.getElementsByClassName('input-clue')[0].innerText = answerArray.join('')
                hangman.remainingLetters--
              }
            }
          }
        }
      }else if(hangman.remainingLetters<=0){
        // if (!hangman.inputs.split('').includes(guess)){
        //   hangman.inputs+=guess
        // }
         inputTxt.style.backgroundColor =  "#9aecef"     
         // inputTxt.value.substr(0,inputTxt.value.length-1)
         inputTxt.disabled="disabled"

         // fontcolor("green");
         // alert(inputTxt.value)
          }
          inputTxt.value = hangman.inputs
    })
  }

    /* Set up try again button
     */
    // static setUpTryAgainBtn(tagId) {
    //     document.getElementById(tagId).onclick = function(event) {
    //         View.fireCustomEvent('tryAgainEvent')
    //     }
    // }

    /**
     * Create a div element with a p tag
     * @param  {String} str The content in the Div tag
     * @return {Dom} Return a div DOM object
     */
  static createDivElement (str) {
    let div = document.createElement('div')
    let p = document.createElement('p')
    p.innerHTML = str
    div.appendChild(p)
    return div
  }
    /**
     * Create clue div element with a p tag the content in the p tag filters the punctuations
     * @param  {String} str The content in the clue Div tag
     * return     {Dom} Return a div DOM object
     */
  static createClueElement (str) {
    let reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/
    let cluStr = ''
    for (let letter of str) {
      if (!reg.test(letter)) {
        letter = '*'
      }
      cluStr += letter
    }

    let div = document.createElement('div')
    let p = document.createElement('p')
    p.innerHTML = cluStr
    div.appendChild(p)
    return div
  }
    /**
     * Create a input element
     * @return {Dom} return an input DOM object
     */
  static createInputElement () {
    let input = document.createElement('input')
    input.type = 'text'
    input.className = 'input-answer'
    return input
  }
    // /*Create background image div
    //  */
    // static createQuestionImg() {
    //     let question = document.getElementById('boxes')
    //     let imgName = View.quiz.xml.getElementsByTagName('match')[0].attributes.getNamedItem("backgroundimage").value
    //     let dir = "images/" + imgName
    //     if (!document.getElementById('questionImg')) {
    //         let questionImg = document.createElement('img')
    //         questionImg.setAttribute("id", "questionImg")
    //         questionImg.setAttribute("src", dir)

    //         questionImg.setAttribute("width", "100%")
    //         questionImg.setAttribute("height", "100%")

    //         question.appendChild(questionImg)
    //     }
    //     return question
    // }
    // /*Create the point indicate the target
    //  */
    // static createPointElement(obj, box) {
    //     let boxContainer = document.getElementById('boxes')
    //     let targetX = obj.targetX
    //     let targetY = obj.targetY

    //     let questionImg = document.getElementById('questionImg')
    //     let naturalWidth = questionImg.naturalWidth
    //     let naturalHeight = questionImg.naturalHeight

    //     let top = parseInt(targetY) / parseInt(naturalHeight) * 100
    //     let left = parseInt(targetX) / parseInt(naturalWidth) * 100
    //     let div = document.createElement('div')

    //     let p = document.createElement('p')

    //     p.innerHTML = obj.question + " "
    //     div.appendChild(p)

    //     let color = box.style.backgroundColor

    //     div.setAttribute("class", "circle")
    //     div.setAttribute("style", "position:absolute")
    //     div.style.background = color
    //     div.style.top = top + "%"
    //     div.style.left = left + "%"

    //     boxContainer.appendChild(div)
    //     return div
    // }
    // /*Get a random number from the range n to m
    //  */
    // static randomNum(n, m) {
    //     let c = m - n + 1;
    //     return Math.floor(Math.random() * c + n);
    // }
    /**
     * Creat a Hangman question box with its children nodes
     * @param  {Dom} obj The target DOM object
     * @param  {number} i The index of the object
     */
    
  static createHangmanBoxElement (obj, i) {
    let boxContainer = document.getElementById('boxes')

    let hangmanDiv = document.createElement('div')
    hangmanDiv.classList.add('hangman')
    let hangmanId = 'hangman-' + (i)
    hangmanDiv.setAttribute('id', hangmanId)
        //  if (boxContainer.childNodes.length==0){
    let questionBox = View.createDivElement(obj.question)

    boxContainer.setAttribute('style', 'position:relative')
        // boxContainer.setAttribute("style", "background-image: url(" + dir + ");background-repeat: no-repeat;background-size: 100%");
    questionBox.classList.add('question-box')
        // questionBox.setAttribute("id", obj.question)
    hangmanDiv.appendChild(questionBox)

    let cluePanel = View.createClueElement(obj.answer)
    let cluePanelId = 'input-clue-' + (i)
    cluePanel.setAttribute('id', cluePanelId)
    cluePanel.setAttribute('class', 'input-clue')
    hangmanDiv.appendChild(cluePanel)

    let answerInput = View.createInputElement('')
    let asswerInputId = 'input-answer-' + (i)
    answerInput.setAttribute('id', asswerInputId)
    hangmanDiv.appendChild(answerInput)

    let questionErrorBox = View.createDivElement('')
    questionErrorBox.classList.add('questionError-box')
    hangmanDiv.appendChild(questionErrorBox)

    let wrongTimeBox = View.createDivElement('')
    wrongTimeBox.classList.add('wrongInputTime-box')
    hangmanDiv.appendChild(wrongTimeBox)

    boxContainer.appendChild(hangmanDiv)
    this.setUpInput(asswerInputId)
    this.setUpNoDelete(asswerInputId)
  }

    // /* Set up the style and position of the target point
    //  */
    // static point(x, y, index, color) {
    //     let oDiv = document.createElement('div');
    //     oDiv.style.position = 'absolute'
    //     oDiv.style.height = '0.8rem'
    //     oDiv.style.width = '0.8rem'
    //     oDiv.style.backgroundColor = color
    //     let questionImg = document.getElementById('questionImg')
    //     let boxes = document.getElementById('boxes')
    //     let imgWidth = questionImg.clientWidth
    //     let imgHeight = questionImg.clientHeight
    //     let top = parseInt(y - 6) / parseInt(imgHeight) * 100
    //     let left = parseInt(x-2) / parseInt(imgWidth) * 100
    //     oDiv.style.left = left + '%';
    //     oDiv.style.top = top + '%';
    //     let p = document.createElement('p')
    //     p.style.fontSize = '0.6rem'
    //     p.innerHTML = "" + parseInt(index + 1) + ""
    //     oDiv.appendChild(p)
    //     oDiv.setAttribute("class", "index")
    //     boxes.appendChild(oDiv);
    // }

    // /*Create the index to match which
    //  *target point match to which random label box
    //  */
    // static createIndex(point, box, index) {
    //     let pointX = point.offsetLeft
    //     let pointY = point.offsetTop

    //     let boxX = box.offsetLeft
    //     let boxY = box.offsetTop
    //     let color = box.style.backgroundColor
    //     View.point(pointX, pointY, index, color)
    //     View.point(boxX, boxY, index, color)
    // }

    // /*Create AnswerCard function
    //  */
    // static createAnswerCardElement(str) {
    //     let answerContainer = document.getElementById('answers')
    //     let answerCard = View.createDivElement(str)
    //     answerCard.classList.add('answer-card')
    //     answerContainer.appendChild(answerCard)

    //     $(answerCard).draggable({
    //         containment: 'body',
    //         revert: true
    //     })
    // }

    // /*For shuffling question boxes and answer cards
    //  */
    // static shuffleContents(tagId) {
    //     let target = document.getElementById(tagId)
    //     let divs = target.getElementsByTagName('div')
    //     for (let i = 0; i < divs.length; i++) {
    //         let randomDivNumber = Math.floor(Math.random() * divs.length)
    //         target.appendChild(Array.from(divs).splice(randomDivNumber, 1)[0])
    //     }
    // }

    // /*Find a question box or answer card of specific strings
    //  */
    // static findDiv(tagId, str) {
    //     let divs = document.getElementById(tagId).getElementsByTagName('div')
    //     let foundDiv = Array.from(divs).find(div => {
    //         //if(div.children[0].exist()){
    //         if (div.childNodes.length != 0) {
    //             let divContent = div.children[0].innerHTML
    //             if (divContent == str) {

    //                 return div
    //             }
    //         }
    //     })

    //     return foundDiv
    // }
    // /*Move answerCards to the Boxes
    //  */
    // static moveAnswerCardToBox(answer, question) {
    //     let answerDiv = View.findDiv('answers', answer)
    //     let questionDiv = View.findDiv('boxes', question)
    //     questionDiv.appendChild(answerDiv)
    //     questionDiv.setAttribute("class", "question-box finish");
    //     // resize iframe to fit height after possible expansion of question box
    //     //View.fireCustomEvent('resizeIframeEvent')
    // }
    // /*Remove draggable for the answer card
    //  *which has already in the right box
    //  */
    // static removeDraggable(answer) {
    //     let answerDiv = View.findDiv('answers', answer)
    //     // setting revertDuration to 0 makes it look like snapping into a box
    //     // revert is necessary because otherwise it keeps relative position
    //     $(answerDiv).draggable('option', 'revertDuration', 0)
    //     $(answerDiv).draggable('disable')
    // }
    // /* Remove all answers' draggable
    //  */
    // static removeDraggableAll() {
    //     let divs = document.getElementById('answers').getElementsByTagName('div')
    //     Array.from(divs).forEach(div => {
    //         $(div).draggable('disable')
    //     })
    // }
    // /*Update the socer
    //  */
    // static updateCurrentScore(score) {
    //     let currentScoreElement = document.getElementById('current-score')
    //     currentScoreElement.innerHTML = score
    // }
    // /*Send the score to Moodle
    //  */
    // static sendScoreToMoodle(score) {
    //     let form = window.parent.document.getElementById("store")
    //     form.mark.value = score
    //     //form.submit() //commented out because it refreshes page
    // }
    // /*Display the result of score
    //  */
    // static displayResult(score, passingScore) {
    //     let scoreElement = document.getElementById('score')
    //     scoreElement.innerHTML = score

    //     let passingScoreElement = document.getElementById('passing-score')
    //     passingScoreElement.innerHTML = passingScore

    //     let finalMessage = document.getElementById('final-message')
    //     if (score >= passingScore) {
    //         finalMessage.innerHTML = 'Well done! A great result!'
    //     } else {
    //         finalMessage.innerHTML = 'Sorry you failed this time, but try again!'
    //     }

    //     let resultElement = document.getElementById('result')
    //     resultElement.style.display = 'block'
    // }
    // /* Calculate the socre for input type quiz
    //  */
    // static calculateResultInput(questions) {
    //     let score = 0
    //     for (let i = 0; i < questions.length; i++) {
    //         let boxId = questions[i].answers[0].answerText
    //         let boxScore = questions[i].answers[0].answerScore
    //         let box = document.getElementById(boxId)
    //         let answer = box.getElementsByTagName("p")[0].innerHTML.trim()
    //         if (boxId.toLowerCase() === answer.toLowerCase()) {
    //             score += parseInt(boxScore)
    //         } else {

    //         }
    //     }
    //     return Math.round(score)
    // }
}
