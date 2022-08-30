const button = document.getElementById('test-button');

// document.cookie = 'LensesService=MTY2MTg5MjY2OXxEdi1CQkFFQ180SUFBUkFCRUFBQUh2LUNBQUVHYzNSeWFXNW5EQWtBQjNWelpYSmZhV1FEYVc1MEJBSUFJZz09fHGuGShaIcg5PF0DIyYC71sfMnsVxj9Ga1jo_sTqAQRd; Path=/; Expires=Thu, 29 Sep 2022 20:51:09 GMT; Max-Age=2592000';

function getWhoAmI() {  
    return fetch("https://9c3f-37-235-202-133.eu.ngrok.io/private/whoami", {
      method: "GET",
      body: JSON.stringify(),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  
function sendSignInData(data) {
    return fetch("https://9c3f-37-235-202-133.eu.ngrok.io/sessions", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

button.addEventListener('click', (e) => { 
    e.preventDefault();
    const signInInputObj = {    
        login: 'admin',
        password: '0000000000'
    }

    sendSignInData(signInInputObj)
    
    getWhoAmI()
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
})