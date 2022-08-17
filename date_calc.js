var form = document.getElementById("main-form");

var inputInfo = {};

function getInputInfo(event) {
  event.preventDefault();

  inputInfo = {
    day: document.getElementById("day-input").value,
    month: document.getElementById("month-input").value,
    expiration: form.querySelector(".option-container").value,
  };
  console.log(inputInfo);
}

const dateInfo = {
  todayDate: new Date(),
}

form.addEventListener("submit", getInputInfo);
