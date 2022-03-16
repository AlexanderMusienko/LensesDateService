const formAnim = document.getElementById("form");
const submit = document.getElementById("output");
var changeHeight;

function submitAnim() {
    changeHeight = 200;
    changeHeight = changeHeight.toString();
    console.log(typeof changeHeight);
  submit.style.height = `${changeHeight}px`;
}

formAnim.addEventListener("submit", submitAnim);
