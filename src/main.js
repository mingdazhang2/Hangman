/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */
window.onload = function() {
    let request = new XMLHttpRequest()
    request.open('GET', 'config.xml', true)
    request.onload = function() {
        // Sent request to the moodel server, if the status between 200 to 400, that's a successful request
        if (request.status >= 200 && request.status < 400) {
            // success
            let xml = request.responseXML


            //create an array of words
            //var words =["amazing","monkey","amazing","amazing"];

            //pick a random words
            //var words= words[Math.floor(Math.random() * words.length)];

            let question = document.getElementById("xmlQuestion").value

            let hint = document.getElementById("xmlHint").innerHTML


            //set up the answer array
            var answerArray = hint.split('');
            // alert(hint)
            var remainingLetters = 0
            for (var i = 0; i < hint.length; i++) {

                if (hint[i] === "_")
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
                                document.getElementById("xmlHint").innerHTML = answerArray.join("")
                                remainingLetters--;
                            }
                        }
                    }

                }


            }

        }
    }

    request.onerror = function() {
        // There was a connection erro of some sort
    }

    request.send()

    function EnterPress(e) { //传入 event   
        var e = e || window.event;
        if (e.keyCode == 13) {
            document.getElementById("txt").focus();
        }
    }
}