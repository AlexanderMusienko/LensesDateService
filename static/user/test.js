import path from "../path.js";

const sendButton = document.getElementById("test-button-send");
const getButton = document.getElementById("test-button-get");

function getWhoAmI() {
  return fetch(`${path}/private/whoami`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function sendSignInData(data) {
  return fetch(`${path}/sessions`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  const signInInputObj = {
    login: "admin",
    password: "0000000000",
  };

  sendSignInData(signInInputObj);
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();

  getWhoAmI()
    .then((response) =>
      response.json().then((data) => {
        document.getElementById("output").innerHTML = `getWhoAmI response: ${JSON.stringify(data)}`;
        console.log(data);
      })
    )
    .catch((err) => (document.getElementById("output").innerHTML = `getWhoAmI error: ${err}`));
});
