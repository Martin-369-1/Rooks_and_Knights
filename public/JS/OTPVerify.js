document.getElementById('OTPVerifyForm').addEventListener('submit',function(event){
    event.preventDefault();
    let OTP=document.getElementById('OTP').value
    fetch('/OTP/OTPVerify',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({OTP})
    })
    .then((res)=>res.json())
    .then((data)=>{
        if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        document.getElementById('error-message').innerText=data.error;
    })
    .catch((err)=>{
        document.getElementById('error-message').innerText=err;
    })
})




        // Update the timer display
function updateTime() {
    
    fetch('/OTP/timer')
        .then(res => res.json())
        .then(data => {
            let remainingTime = data.remainingTime;
            if (remainingTime > 0) {
                document.getElementById('resendOTP').innerHTML = `<p class='text-danger'>Resend OTP in ${remainingTime} seconds</p>`;
            } else {
                let resendOTPform=`
                    <form action="/OTP/resendOTP" method="post">
                            <button type="submit" id='resend-OTP'>
                                <p class="fs-18">Resend OTP</p>
                            </button>             
                    </form>`

                    

                document.getElementById('resendOTP').innerHTML = resendOTPform;
                
                document.getElementById('resend-OTP').onclick('submit',function(){
                    const submitButton=document.getElementById('resend-OTP')
                    submitButton.disabled=true;
                })
                
                clearInterval(timerInterval); // Clear the interval when time reaches 0
                
            }
            

        })
        .catch(err => console.log(err));
}

// Start the timer interval
const timerInterval = setInterval(updateTime, 1000);
updateTime();

