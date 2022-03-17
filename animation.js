const formAnim = document.getElementById("form");
const submitOutput = document.getElementById("output");
var submit = 1;

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
  document.getElementById("submitAnim").style = "animation-name: submit;"
}

formAnim.addEventListener("submit", outputAnim);
formAnim.addEventListener("submit", submitClick);
formAnim.addEventListener("submit", submitAnim);