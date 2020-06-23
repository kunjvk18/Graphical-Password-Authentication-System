var firebaseConfig = {
    apiKey: "AIzaSyCGYo2AEUasMi31IWkJpCv5cZ96qfz4M9I",
    authDomain: "g-p-a-s.firebaseapp.com",
    databaseURL: "https://g-p-a-s.firebaseio.com",
    projectId: "g-p-a-s",
    storageBucket: "g-p-a-s.appspot.com",
    messagingSenderId: "371929838684",
    appId: "1:371929838684:web:55193db4b5f8b71abf2299",
    measurementId: "G-PJTC275J64"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //variable declaration
  var file;
  var uploadtask;
 
  
  //Reference messages collection
var UsersRef = firebase.database();

var ref = firebase.database().ref('Users/');

//username changes
function getData(){
       ref.orderByChild('Username').equalTo(username.value).on("value",function (snapshot){
           if(snapshot.exists())
           {
               console.log('set');
               //continue;
           }
           else
           {
            username.value="";
            document.querySelector('.alert').style.display='block';
            document.querySelector('.alert').style.background = 'red';
            document.querySelector('.alert').innerHTML = 'Username does not exists Signup-->..';
        
        
            //hide alert after 3 secs
            setTimeout(function(){
                document.querySelector('.alert').style.display='none';
            },3000)
                   
           }
       });
}
//check txt passwd
function getPasswd(){
    ref.on('value' , Data);
    function Data(data){
        // console.log(data.val());
        //Get Values
        
        var User = data.val();
        var details = Object.keys(User);
        
        
        for(var i=0; i<details.length;i++)
        {
            var d = details[i];
            var name = User[d].Username;
            var txtpasswd = User[d].txt_passwd;
          
           var passwd =  CryptoJS.SHA1(txt_passwd.value).toString();
            if(username.value == name)
            {
                
                if(passwd == txtpasswd)
                {
                    console.log('set');
                  // continue;
                }
                else{
                    txt_passwd.value="";
                    document.querySelector('.alert').style.display='block';
                    document.querySelector('.alert').style.background = 'red';
                    document.querySelector('.alert').innerHTML = 'Textual Password did not match..';
                
                
                    //hide alert after 3 secs
                    setTimeout(function(){
                        document.querySelector('.alert').style.display='none';
                    },3000)

                }
            }
            else{continue;}
        }
    
    }

}
var count = 0;
//check graphical passwd
function getGPasswd(){
    count += 1;
    ref.on('value' , Data);
    function Data(data){
        // console.log(data.val());
        //Get Values
        
        var User = data.val();
        var details = Object.keys(User);
        
        if(count<3)
        {
            for(var i=0; i<details.length;i++)
            {
                var d = details[i];
                var name = User[d].Username;
                var grphpasswd = User[d].grph_passwd;
                var url = User[d].url;
                if(username.value == name)
                {
                    hidecontent.style.display="none";
                    previewimage.style.display="block";

                    previewimage.setAttribute("src",url);
                    
                    position.addEventListener("mousedown",function(e){
            
                        var PosX = 0;
                        var PosY = 0;
                        var ImgPos;
                        ImgPos = FindPosition(myImg);
                        function FindPosition(oElement)
                        {
                        if(typeof( oElement.offsetParent ) != "undefined")
                        {
                            for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
                            {
                            posX += oElement.offsetLeft;
                            posY += oElement.offsetTop;
                            }
                            return [ posX, posY ];
                            }
                            else
                            {
                            return [ oElement.x, oElement.y ];
                            }
                        }
                        if (!e) var e = window.event;
                        if (e.pageX || e.pageY)
                        {
                            PosX = e.pageX;
                            PosY = e.pageY;
                        }
                        else if (e.clientX || e.clientY)
                            {
                            PosX = e.clientX + document.body.scrollLeft
                                + document.documentElement.scrollLeft;
                            PosY = e.clientY + document.body.scrollTop
                                + document.documentElement.scrollTop;
                            }
                        PosX = PosX - ImgPos[0];
                        PosY = PosY - ImgPos[1];
                        var X = PosX;
                        var Y = PosY;
                        if(X < 100){
                            X = 0;
                        }
                        else if (X<200) {
                            X = 1;
                        }
                        else if (X<300) {
                            X = 2;
                        }
                        else {
                            X = 3;
                        }
                        if(Y < 100){
                            Y = 0;
                        }
                        else if (Y<200) {
                            Y = 1;
                        }
                        else if (Y<300) {
                            Y = 2;
                        }
                        else{
                            Y = 3;
                        }
                        
                    
                        grph_passwd.value= X+","+Y;
                    
                        PosX = 0;
                        PosY = 0;
                        // grph_passwd.setAttribute("readonly",true); 
                
                        hidecontent.style.display=null;
                        previewimage.style.display=null;
                        
                    });
                }
                else{continue;}
            }
        }
        else
        {
             document.querySelector('.alert').style.display='block';
             document.querySelector('.alert').style.background = 'red';
             document.querySelector('.alert').innerHTML = 'Point selection max limit reached..';
            location.reload();
            count=0;
        }
    
    }

}
//on submit
document.getElementById('bttn').addEventListener('click',submitform);
function submitform(e){
    
    ref.on('value' , Data);
    function Data(data){
        // console.log(data.val());
        //Get Values
        
        var User = data.val();
        var details = Object.keys(User);
        
        
        for(var i=0; i<details.length;i++)
        {
            var d = details[i];
            var name = User[d].Username;
            var grphpasswd = User[d].grph_passwd;
            var gpasswd =  CryptoJS.SHA1(grph_passwd.value).toString();
            if(username.value == name)
            {
                if(gpasswd == grphpasswd &&  txt_passwd.value !="" )
                {
                    
                   
                    window.location.href = "Welcome.html";
                    document.querySelector('.alert').style.display='block';
                    document.querySelector('.alert').style.background = 'green';
                    document.querySelector('.alert').innerHTML = 'Login Success..';
                   
                
                    //hide alert after 3 secs
                    setTimeout(function(){
                        document.querySelector('.alert').style.display='none';
                    },3000)
                   
                }
                
                else {
                   
                    document.querySelector('.alert').style.display='block';
                    document.querySelector('.alert').style.background = 'red';
                    document.querySelector('.alert').innerHTML = 'Graphical Password did not match..';
                    grph_passwd.value="";
                
                    //hide alert after 3 secs
                    setTimeout(function(){
                        document.querySelector('.alert').style.display='none';
                    },3000)

                }
            }
            else if(username.value =="" || txt_passwd.value =="" || grph_passwd.value ==""){

                document.querySelector('.alert').style.display='block';
                document.querySelector('.alert').style.background = 'red';
                document.querySelector('.alert').innerHTML = 'Enter details properly..';
                     //hide alert after 3 secs
                setTimeout(function(){
                    document.querySelector('.alert').style.display='none';
                },3000)
            }
        }
       
       
    
        
    
    }

}














