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

inpfile.addEventListener("change", function(){
    const file = this.files[0];
    
    if(file)
    {
        const reader= new FileReader();

        hidecontent.style.display="none";
        previewimage.style.display="block";
        


        reader.addEventListener("load", function(){
            
            previewimage.setAttribute("src",this.result);
            
        });

        reader.readAsDataURL(file);

        position.addEventListener("mousedown",function(e){
        
           
            var X = `${e.x}`;
            var Y = `${e.y}`;
    
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
            X = X - ImgPos[0];
            Y = Y - ImgPos[1];
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
       
       // grph_passwd.setAttribute("readonly",true); 

        hidecontent.style.display=null;
        previewimage.style.display=null;
       
    });
    }
    else{
        hidecontent.style.display=null;
        previewimage.style.display=null;
        previewimage.setAttribute("src","");
        grph_passwd.value=null;
       
    }
});



//Listen for form submit 
document.getElementById('signup-data').addEventListener('submit',submitform);

function submitform(e){
    e.preventDefault();

    //Get Values
    var Username=getInputVal('username');
    var email=getInputVal('email');
    var txt_passwd= CryptoJS.SHA1(getInputVal('txt_passwd')).toString();
    var grph_passwd=CryptoJS.SHA1(getInputVal('grph_passwd')).toString();
    var url;
    
    
    hidecontent.style.display="none";

    
     //save message
    saveMessage(Username, email, txt_passwd, grph_passwd, url);

    
    


    //document.getElementById("grph_passwd").setAttribute("readonly",false);    

}
//function to get form values
function getInputVal(id){
   return document.getElementById(id).value;
}
//const inpfile = document.getElementById("inpfile");
inpfile.addEventListener("change", function(){
    file = this.files[0];
});

function saveMessage(Username, email, txt_passwd, grph_passwd, url)
{
   var filename = file.name;
   var storageRef = firebase.storage().ref('/Images/'+filename);
   uploadtask = storageRef.put(file);

   uploadtask.on('state_changed',function(snapshot){
       //code
   },function(error){
       //code
   },function(){

    
    //var postKey = UsersRef.ref(Username+'/Details');
    uploadtask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

        var newUsersRef = UsersRef.ref('Users/').child(Username);
        newUsersRef.set
        ({ 
            Username:Username,
            email:email,
            txt_passwd:txt_passwd,
            grph_passwd:grph_passwd,
            url:downloadURL
        
         },function(error){
            if(error){
                document.querySelector('.alert').innerHTML = 'Your Signup is failed...';
                //show  alert
                 document.querySelector('.alert').style.display='block';
                  document.querySelector('.alert').style.background = 'red';

                //hide alert after 3 secs
                setTimeout(function(){
                    document.querySelector('.alert').style.display='none';
                },2000)
                document.getElementById('signup-data').reset();
            }
            else
            {
              hidecontent.style.display=null;

                document.querySelector('.alert').style.display='block';
                document.querySelector('.alert').style.background = 'green';
                document.querySelector('.alert').innerHTML = 'Your data has been sent successfully..';
            
            
                //hide alert after 3 secs
                setTimeout(function(){
                    document.querySelector('.alert').style.display='none';
                },1000)
               
                //clear the form
                document.getElementById('signup-data').reset();
            }

         });
    
        
   });
});
}


var ref = firebase.database().ref('Users');
ref.on('value' , getData, errData);

function getData(data){
   // console.log(data.val());
    var User = data.val();
    var details = Object.keys(User);
   
    document.getElementById('username').addEventListener('change' ,check);
    function check(){
        var name = document.getElementById('username').value;
        
    
        for(var i = 0; i < details.length ; i++)
        {
            var d = details[i];
                var name = User[d].Username;
                
                if(username.value == name)
                {
                      
                
                document.querySelector('.alert').innerHTML = 'Username already exists...';
                //show  alert
                 document.querySelector('.alert').style.display='block';
                  document.querySelector('.alert').style.background = 'red';

                //hide alert after 3 secs
                setTimeout(function(){
                    document.querySelector('.alert').style.display='none';
                },2000)
                document.getElementById('signup-data').reset();
            
            }
        }
    }

}

function errData(err){
    console.log(err);
}














