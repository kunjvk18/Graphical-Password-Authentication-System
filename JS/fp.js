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
        
        
            //hide alert after 2 secs
            setTimeout(function(){
                document.querySelector('.alert').style.display='none';
            },2000)
                   
           }
       });
}

//on submit
document.getElementById('bttn').addEventListener('click',submitform);
function submitform(e){
    
    ref.on('value' , Data);
    function Data(data){
        
        //Get Values
        
        var User = data.val();
        var details = Object.keys(User);
        
        if(username.value =="" ||  e_mail.value ==""){

            document.querySelector('.alert').style.display='block';
            document.querySelector('.alert').style.background = 'red';
            document.querySelector('.alert').innerHTML = 'Enter details properly..';
                 //hide alert after 3 secs
            setTimeout(function(){
                document.querySelector('.alert').style.display='none';
            },3000)
        }
        
        for(var i=0; i<details.length;i++)
        {
            var d = details[i];
            var name = User[d].Username;
            var email = User[d].email;
            if(username.value == name)
            {
               
                if(e_mail.value == email)
                {
                    
                    var b = username.value;
                     var url1= 'Update.html?Username=' + encodeURIComponent(b);
                    document.querySelector('.alert').style.display='block';
                    document.querySelector('.alert').style.background = 'green';
                    document.querySelector('.alert').innerHTML = 'You can update your password..';
                    document.location.href = url1;
                   document.getElementById('fp').reset();
                
                    //hide alert after 3 secs
                    setTimeout(function(){
                        document.querySelector('.alert').style.display='none';
                    },2000)
                   
                }
                
                else {
                   
                    document.querySelector('.alert').style.display='block';
                    document.querySelector('.alert').style.background = 'red';
                    document.querySelector('.alert').innerHTML = 'E-mail id did not match..';
                    e_mail.value="";
                
                    //hide alert after 3 secs
                    setTimeout(function(){
                        document.querySelector('.alert').style.display='none';
                    },2000)

                }
            }
            else{continue;}
        }
       
       
    
        
    
    }

}














