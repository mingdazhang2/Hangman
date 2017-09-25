/* jsclue undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */
window.onload = function() {
    let request = new XMLHttpRequest()
    request.open('GET', 'config.xml', true)
    request.onload = function() {
        // Sent request to the moodel server, if the status between 200 to 400, that's a successful request
        if (request.status >= 200 && request.status < 400) {
            // success
            let xml = request.responseXML
            let quiz = new Quiz(xml)
            View.setUp(quiz)
            let controller = new Controller(quiz, View)

             parent.resizeIframe()
            // wait for images to be loaded and do it again
            setTimeout(function() {
                parent.resizeIframe()
            }, 1000)
        }
    }

    request.onerror = function() {
        // There was a connection erro of some sort
    }

    request.send()
   
    // function EnterPress(e) {   
    //     var e = e || window.event;
    //     if (e.keyCode == 13) {
    //         document.getElementById("txt").focus();
    //     }
    // }
}