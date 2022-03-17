const formAnim = document.getElementById("form");
const submitOutput = document.getElementById("output");
var submit = 1;

function submitAnim() {
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

formAnim.addEventListener("submit", submitAnim);
formAnim.addEventListener("submit", submitClick);
