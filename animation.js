const formAnim = document.getElementById("form");
const submitOutput = document.getElementById("output");
var submit = 0;
var day, month, lenses;
var formValue = [];
var compare; // if value is not identic return true

function valueCompare() { 
  compare = 
  (formValue[0] != formValue[3] ||
    formValue[1] != formValue[4] ||
    formValue[2] != formValue[5]);
    return compare;
}

function retrieveValue() {
  (day = formAnim.querySelector('[name="day"]').value),
    (month = formAnim.querySelector('[name="month"]').value),
    (lenses = formAnim.querySelector('[name="lensesExpiration"]').value);
  if (submit <= 1) formValue = [day, month, lenses];
}

function formMemory() {
  formValue.unshift(day, month, lenses);
  formValue.length = 6;
  console.log(`Массив: ${formValue}`);
  console.log(`Массив новый: ${formValue[0]};${formValue[1]};${formValue[2]}`);
  console.log(`Массив старый: ${formValue[3]};${formValue[4]};${formValue[5]}`);
}

function outputAnim() {
  if (submit % 2 == 0) { // четное
    compare
      ? (submitOutput.style = "animation-name: outputSwipe;")
      : (submitOutput.style = "animation-name: outputClose;");
  } else { // нечетное
    compare
      ? (submitOutput.style = "animation-name: outputSwipeRepeat;")
      : (compare == false) ? submitOutput.style = "animation-name: outputClose;" : submitOutput.style = "animation-name: output;";
  }
}

function submitClick() {
  submit++;
  console.log(`Нажатие: ${submit}`);
  return submit;
}

formAnim.addEventListener("submit", submitClick);
formAnim.addEventListener("submit", retrieveValue);
formAnim.addEventListener("submit", formMemory);
formAnim.addEventListener("submit", valueCompare);
formAnim.addEventListener("submit", outputAnim);
