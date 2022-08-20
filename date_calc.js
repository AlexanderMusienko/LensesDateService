const form = document.getElementById("main-form");

const inputInfo = {};
const dateInfo = {};
const outputResult = {};

function transformDayToMs(day) {  
  return (day * 24 * 60 * 60 * 1000)
}

function getInputInfo(event) {
  event.preventDefault();

  inputInfo.day = document.getElementById("day-input").value;
  inputInfo.month = document.getElementById("month-input").value;
  inputInfo.expiration = form.querySelector(".option-container").value;

  console.log(inputInfo);
}

function getOpenDate(event) {  
  event.preventDefault();

  dateInfo.todayDate = new Date();
  dateInfo.openDate = new Date(`${inputInfo.month}/${inputInfo.day}/${new Date().getFullYear()}`);

  console.log(`Текущая дата: ${dateInfo.todayDate}`);
  console.log(`Дата открытия: ${dateInfo.openDate}`);
} 

function calcDate() { 

  outputResult.nextDateMs = dateInfo.openDate.getTime() + (transformDayToMs(inputInfo.expiration));
  outputResult.nextDate = new Date(outputResult.nextDateMs);

  console.log(`Следующая дата в мс: ${outputResult.nextDateMs}`);
  console.log(`Следующая дата: ${outputResult.nextDate}`);
} 

form.addEventListener("submit", getInputInfo);
form.addEventListener("submit", getOpenDate);
form.addEventListener("submit", calcDate);
