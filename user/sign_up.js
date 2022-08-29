function getSignUpForm() {
  const signUpObj = {};

  signUpObj.email = document.getElementById("email").value;
  signUpObj.login = document.getElementById("login").value;
  signUpObj.password = document.getElementById("password").value;

  console.log(signUpObj);

  return signUpObj;
}

function validateRegData(regData) {
  const validationState = {};

  const regEx = {
    login: /^[a-zA-Z0-9_\.]+$/, // latin, numbers, periods, underscores.
    password: /^.{8}[a-zA-Z0-9]+$/, // latin, numbers.
  };

  validationState.login = regEx.login.test(regData.login);
  console.log(`loginValidationState: ${validationState.login}`);

  validationState.password = regEx.password.test(regData.password);
  console.log(`passwordValidationState: ${validationState.password}`);

  console.log(`validationState: ${validationState.login && validationState.password}`);
  return validationState.login && validationState.password;
}

function sendSignUpData(data) {
  return fetch("http://37.235.202.133:5555/poster", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

addEventListener("submit", (e) => {
  e.preventDefault();

  const data = getSignUpForm();
  const isValidData = validateRegData(data);

  if (isValidData) {
    sendSignUpData(data)
    .then((response) => response.json())
    .then(console.log)
    .catch((error) => alert(error))
  } else {
    console.log("wrong");
  }
});
