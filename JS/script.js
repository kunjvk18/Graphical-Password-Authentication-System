window.addEventListener("offline",function(){
    window.location.reload();
});

window.addEventListener("online",function(){
    window.location.reload();
});






document.onkeydown = function(e){
    if(e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117)){
        return false;
    }
    else{
        return true;
    }
};


const inpfile = document.getElementById("inpfile");
const previewcontainer = document.getElementById("right");
const previewimage = previewcontainer.querySelector(".image");
const hidecontent = previewcontainer.querySelector(".aside-content");
const position = document.getElementById("pixel");
const grph_passwd = document.getElementById("grph_passwd");
const username = document.getElementById("username");
const signupform = document.getElementById("signup-data");
const txt_passwd = document.getElementById("txt_passwd");
const myImg = document.getElementById("myimgid");
const e_mail = document.getElementById("email");


