function transformDayToMs(day) {  
  return (day * 24 * 60 * 60 * 1000)
}

function transformMsToDay(ms) { 
  return (ms / 1000 / 60 / 60 / 24)
}

function getInputInfo() {
  const inputInfo = {};

  inputInfo.day = document.getElementById("day-input").value;
  inputInfo.month = document.getElementById("month-input").value;
  inputInfo.expiration = document.querySelector(".option-container").value;

  console.log(inputInfo);
  return inputInfo;
}

function getOpenDate(inputInfoObj) {  
  const dateInfo = {};

  dateInfo.todayDate = new Date();
  dateInfo.openDate = new Date(`${inputInfoObj.month}/${inputInfoObj.day}/${new Date().getFullYear()}`);

  console.log(`Текущая дата: ${dateInfo.todayDate}`);
  console.log(`Дата открытия: ${dateInfo.openDate}`);

  return dateInfo;
} 

function calcDate(dateInfoObj, inputInfoObj) { 
  const outputResult = {};

  outputResult.nextDateMs = dateInfoObj.openDate.getTime() + (transformDayToMs(inputInfoObj.expiration));
  outputResult.nextDate = new Date(outputResult.nextDateMs);
  outputResult.daysLeft = Math.round(transformMsToDay(outputResult.nextDate - dateInfoObj.todayDate));

  console.log(`Следующая дата в мс: ${outputResult.nextDateMs}`);
  console.log(`Следующая дата: ${outputResult.nextDate}`);
  console.log(`Осталось дней: ${outputResult.daysLeft}`);

  return outputResult;
} 

function renderOutput(outputResultObj) {  
  const outputDiv = document.createElement('div');
  outputDiv.className = 'output';
  const landingContainer = document.querySelector('.landing-container');
  outputDiv.innerHTML = `Your next date: ${outputResultObj.nextDate.toLocaleDateString('en-US')} <br> Days left: ${outputResultObj.daysLeft}`;
  landingContainer.appendChild(outputDiv);
}

addEventListener("submit", (e) => { 
  e.preventDefault();
  const inputInfoObj = getInputInfo();
  const dateInfoObj = getOpenDate(inputInfoObj);
  const outputResultObj = calcDate(dateInfoObj, inputInfoObj);
  renderOutput(outputResultObj);
});
