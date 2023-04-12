import path from "./path.js";

function getSignInInput() {
  const signInInput = {};

  signInInput.login = document.getElementById("login").value;
  signInInput.password = document.getElementById("password").value;

  console.log(signInInput);
  return signInInput;
}

function sendSignInData(data) {
  console.log(path);
  return fetch(`${path}/sessions`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function signInWelcome(element, login) {
  element.classList.add("disappear");
  const welcomeElement = document.createElement("div");
  welcomeElement.className = "user-welcome";
  welcomeElement.innerHTML = `Welcome, ${login}`;

  setTimeout(() => {
    document.body.appendChild(welcomeElement);
  }, 2000);

  setTimeout(() => {
    window.location.replace("/home");
  }, 3000);
}

async function showIncorrectGlowing(element) {
  element.classList.remove("default-glowing");
  element.classList.add("incorrect-glowing");

  await new Promise(() =>
    setTimeout(() => {
      element.classList.remove("incorrect-glowing");
      element.classList.add("default-glowing");
    }, 5000)
  );
  console.log("Done");
}

addEventListener("submit", (e) => {
  e.preventDefault();
  const signInElement = document.querySelector(".sign-in-container");
  const signInInputObj = getSignInInput();

  sendSignInData(signInInputObj)
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((data) => signInWelcome(signInElement, data));
      } else {
        showIncorrectGlowing(signInElement);
      }
    })
    .catch((error) => console.log(`sendSignInData catch: ${error}`));
});
