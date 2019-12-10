var button = document.getElementById("download");
var input = document.getElementById("link");
var link = '';

button.addEventListener('click',function(){
  if(input.value != ''){
    link = input.value;
    console.log(link);
    //this needs to be replaced with the path of the file for every case
    window.location = "C:/Users/Jace Parks/Desktop/final-project-group-4/public/download_page/download.html";
  }
});
