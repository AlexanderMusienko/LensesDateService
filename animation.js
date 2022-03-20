const formAnim = document.getElementById("form");
const submitOutput = document.getElementById("output");
var submit = 1;
var day, month, lenses;

function retrieveValue() {
day = formAnim.querySelector('[name="day"]').value,
month = formAnim.querySelector('[name="month"]').value,
lenses = formAnim.querySelector('[name="lensesExpiration"]').value;
}

var formValue = [day, month, lenses];

function formMemory() {
  console.log(month);
  formValue.push(day, month, lenses);
  console.log(`Длина массива: ${formValue.length}`);
  if (formValue.length > 6) {
    formValue.splice(0, 3);
    console.log(`Длина массива после удаления: ${formValue.length}`);
    console.log(`Массив старый: ${formValue[0]};${formValue[1]};${formValue[2]}`);
    console.log(`Массив новый: ${formValue[3]};${formValue[4]};${formValue[5]}`);
  }
};


function outputAnim() {
  if (submit % 2 == 0) {
    (formValue[0] != formValue[3]) ? submitOutput.style = "animation-name: outputSwipe;" : submitOutput.style = "animation-name: outputClose;";  
  } else {  
    submitOutput.style = "animation-name: output;"; 
  }
  }

function submitClick() {
  submit++;
  console.log(`Нажатие: ${submit}`);
  return submit;
}

function submitAnim() {
  document.getElementById("submitAnim").style = "animation-name: submit;";
}

/*function staticOutTransition() {
  if (day == day && month == month && lenses == lenses) {
    submitOutput.style = "animation-name: staticOut;"
  }
}
*/

formAnim.addEventListener("submit", outputAnim);
formAnim.addEventListener("submit", submitClick);
formAnim.addEventListener("submit", retrieveValue);
formAnim.addEventListener("submit", formMemory);