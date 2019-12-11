let nextButton = document.getElementById('nextPageButton');
let url = document.getElementById('link').value;

nextButton.onclick = function() {
    let url = document.getElementById('link').value;
    if (url.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
        let vidid = youtube_parser(url);
        window.location.replace("/edit/" + vidid);
    }
    else {
        alert("Please enter a valid Youtube URL");
    }
};

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}