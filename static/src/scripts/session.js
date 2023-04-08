import path from "./path.js";

function removeElement(element) {
  element.remove();
}

function addProfileElement(profileName) {
  const navbar = document.querySelector(".navbar");
  const profileElement = document.createElement("a");
  const profileAvatar = document.createElement('img')
  profileAvatar.src = `static/asserts/users/${profileName}/avatar.png`
  profileElement.className = "profile-item";
  profileElement.innerHTML = profileName;
  profileElement.href = "static/user/profile.html";
  navbar.appendChild(profileElement);
  profileElement.appendChild(profileAvatar)
}

function addSignElement() { 
  const navbar = document.querySelector(".navbar");
  const signContainer = document.createElement('div');
  signContainer.classList.add('sign-container');

  const signInElement = document.createElement("a")
  const signUpElement = document.createElement("a");
  signInElement.classList.add('sign-element');
  signInElement.innerHTML = 'Sign In';
  signInElement.href = 'Sign In';
  signUpElement.classList.add('sign-element');
  signUpElement.innerHTML = 'Sign Up';
  signUpElement.href = 'sign-up';

  navbar.appendChild(signContainer);
  signContainer.appendChild(signInElement);
  signContainer.appendChild(signUpElement);
}

console.log(path);

fetch(`${path}/private/whoami`)
  .then((response) => {
    if (response.ok) {
      response.json()
      .then(data => addProfileElement(data.login))
    } else {
      addSignElement();
    }
  })
  .catch((err) => console.log(err));
