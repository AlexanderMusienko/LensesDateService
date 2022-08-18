var form = document.getElementById("main-form");

var inputInfo = {};
var dateInfo = {};
var outputResult = {};

function getInputInfo(event) {
  event.preventDefault();

  inputInfo = {
    day: document.getElementById("day-input").value,
    month: document.getElementById("month-input").value,
    expiration: form.querySelector(".option-container").value,
  };

  console.log(inputInfo);
}

function getOpenDate() {  
   
  dateInfo = {
    todayDate: new Date(),
    openDate: new Date(`${inputInfo.month}/${inputInfo.day}/${new Date().getFullYear()}`), // month | day | year
  }

  console.log(`Текущая дата: ${dateInfo.todayDate}`)
  console.log(`Дата открытия: ${dateInfo.openDate}`)
} 

function calcDate() { 
  outputResult = {  
    resultDate: dateInfo.openDate.getTime() + 
  }
}

form.addEventListener("submit", getInputInfo);
form.addEventListener("submit", getOpenDate);
