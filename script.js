let LoginFunction=()=>{
    let message=document.getElementById('message');
    message.textContent="Welcome Back";
    let message2=document.getElementById('message2');
    message2.textContent="Please login to your account";

    document.getElementById('SignUp-Submit').value="Login";

    document.getElementById('SignUp-Email').id="Login-Email";
    document.getElementById('SignUp-Pass').id="Login-Pass";

    let bottomMessage1 = document.getElementById('bottomMessage1');
    let bottomMessage2 = document.getElementById('bottomMessage2');

    bottomMessage1.firstChild.textContent = "Don't have an account? ";
    bottomMessage2.textContent = "Signup";
}

let Upsubmit=document.getElementById('SignUp-Submit');
Upsubmit.addEventListener('click',(event)=>{
    event.preventDefault();
    if(Upsubmit.value=="Sign Up"){
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
        let Upemail=document.getElementById('SignUp-Email');
        let Uppass=document.getElementById('SignUp-Pass');
    
        if (Upemail.value && !emailPattern.test(Upemail.value)) {
            console.log("Invalid email");
        } else if (Upemail.value && Uppass.value) {
            localStorage.setItem('email', Upemail.value);
            localStorage.setItem('password', Uppass.value);
            LoginFunction();
        } else {
            console.log("Please fill both fields correctly.");
        }
    }
    else{
        Inemail=document.getElementById('Login-Email');
        Inpassword=document.getElementById('Login-Pass');
        if(Inemail.value&&Inpassword.value){
            if(Inemail.value==localStorage.getItem('email')&&Inpassword.value==localStorage.getItem('password')){
                // console.log("Logined");
                location.href="./dashboard.html";
            }
            else{
                console.log("Worng email or password");
            }
        }
        else{
            console.log("Please fill the all inputs");
        }
    }
});

let bottomMessage=document.getElementById('bottomMessage2');
bottomMessage.addEventListener('click',(event)=>{
    event.preventDefault();
    if(bottomMessage.textContent=="login"){
        LoginFunction();
    }
    else{
        location.reload();
    }
})