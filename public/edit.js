let submitButton = document.getElementById('submit');

submitButton.onclick = function () {
    let body = {
        "url": document.getElementById('url').innerText,
        "start": document.getElementById('start').value,
        "time": document.getElementById('time').value
    };
    console.log(body);
    var postRequest = new XMLHttpRequest();
    var requestURL = '/newgif';
    postRequest.open('POST', requestURL);

    var requestBody = JSON.stringify(body);

    console.log("== requestBody:", requestBody);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    postRequest.addEventListener('load', function (event) {
      if (event.target.status !== 200) {
        alert("Error processing GIF on the server");
      } else {
        window.location.replace("/gif/" + event.target.response);
      }
    });

    postRequest.send(requestBody);
}