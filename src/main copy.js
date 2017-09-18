/* jsclue undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */
window.onload = function() {
    let request = new XMLHttpRequest()
    request.open('GET', 'config.xml', true)
    request.onload = function() {
        // Sent request to the moodel server, if the status between 200 to 400, that's a successful request
        if (request.status >= 200 && request.status < 400) {
            // success
            let xml = request.responseXML
            let inputTxt = document.getElementById('txt')
            inputTxt.addEventListener("keyup", guessWord);
            //guessWord()
        }
    }

    request.onerror = function() {
        // There was a connection erro of some sort
    }

    request.send()
    function guessWord(){
            let question = document.getElementById("xmlQuestion").value

            let clue = document.getElementById("xmlClue").innerHTML


            //set up the answer array
            var answerArray = clue.split('');
            // alert(clue)
            var remainingLetters = 0
            for (var i = 0; i < clue.length; i++) {

                if (clue[i] === "_")
                    remainingLetters++
            }


            //The game loop
            if (remainingLetters >= 0) {

                //show the player their progress
                //alert(answerArray.join(" "));

                //Get a guess from the player
                var guess = document.getElementById("txt").value
                //alert(guess)


                //convert toLowerCase
                var guessLower = guess.toLowerCase();
                if (guessLower === null) {
                    alert("please input word")

                } else {
                    let guessArray = guessLower.split('')
                    //alert(guessArray.toString())
                    for (let i = 0; i < guessArray.length; i++) {

                        //update the game state with the guess
                        for (var j = 0; j < question.length; j++) {
                            if (question[j].toLowerCase() === guessLower[i]) {
                                answerArray[j] = question[j];
                                document.getElementById("xmlClue").innerHTML = answerArray.join("")
                                remainingLetters--;
                            }
                        }
                    }

                }


            }
    }
    // function EnterPress(e) {   
    //     var e = e || window.event;
    //     if (e.keyCode == 13) {
    //         document.getElementById("txt").focus();
    //     }
    // }
}