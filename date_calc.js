const form = document.getElementById("form");
var today = new Date();
var formValues;
function retrieveFormValue(event) {
  event.preventDefault();

  const day = form.querySelector('[name="day"]'),
    month = form.querySelector('[name="month"]'),
    lenses = form.querySelector('[name="lensesExpiration"]');

  formValues = {
    day: day.value,
    month: month.value,
    lenses: lenses.value,
  };
}

function retrieveDesiredBuyDate() {
  var buyDate = new Date(
    `${today.getFullYear()}.${formValues.month}.${formValues.day}`
  );
  var desiredBuyDate = new Date(
    `${today.getFullYear()}.${formValues.month}.${formValues.day}`
  );
  desiredBuyDate.setDate(desiredBuyDate.getDate() + +formValues.lenses);
  var timeLeft =
    (Date.parse(desiredBuyDate) - Date.parse(today)) / (60 * 60 * 24 * 1000);
  timeLeft = timeLeft.toFixed();
  
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var easyDesiredBuyDate = desiredBuyDate.toLocaleDateString('en-US', options);

  console.log(
    `Дата покупки: ${buyDate}, Планируемая дата новой покупки: ${desiredBuyDate}, Оставшееся число дней: ${timeLeft}`
  );

  document.querySelector('.landing-output-container').innerHTML = `Next purchase: <br>${easyDesiredBuyDate}, <br>Days left: ${timeLeft}`;

}

form.addEventListener("submit", retrieveFormValue);
form.addEventListener("submit", retrieveDesiredBuyDate);
