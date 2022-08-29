function getSignInInput() {   
    const signInInput = {};

    signInInput.login = document.getElementById('login').value;
    signInInput.password = document.getElementById('password').value;

    console.log(signInInput);
    return signInInput;
}

function sendSignInData(data) { 
    return fetch("http://37.235.202.133:5555/poster", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
}

addEventListener('submit', (e) => {   
    e.preventDefault();

    const signInInputObj = getSignInInput();
    sendSignInData(signInInputObj)
    .then((response) => console.log(response))
    .catch((error) => console.log(`sendSignInData catch: ${error}`))
    
});