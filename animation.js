const formAnim = document.getElementById("form");
const submitOutput = document.getElementById("output");
var submit = 1;

const day = formAnim.querySelector('[name="day"]'),
month = formAnim.querySelector('[name="month"]'),
lenses = formAnim.querySelector('[name="lensesExpiration"]');

var formValue = { 
  day: day,
  month: month,
  lenses: lenses
}

function formBuffer() { 

}

function outputAnim() {
  if (submit % 2 == 0) {
    submitOutput.style = "animation-name: outputClose;";
  } else {
    submitOutput.style = "animation-name: output;";
  }
}

function submitClick() {
  submit++;
  console.log(submit);
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
//formAnim.addEventListener("submit", submitAnim);
formAnim.addEventListener("submit", formBuffer);