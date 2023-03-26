const billsInput = document.querySelector(".bill-input");
const tipPercent = document.querySelectorAll(".tip__percent");
const customInput = document.querySelector(".custom__input");
const peopleInput = document.querySelector(".people-input");
const tipsShow = document.querySelector(".tip__value");
const totalShow = document.querySelector(".total__value");
const typeValidation = document.querySelector(".type-validation");
const zeroValidation = document.querySelector(".zero-validation");
const btn = document.querySelector(".reset");

let billValue = 0;
let peopleValue = 1;
let tipValue = 0;
let tipPerPerson = 0.00;
let totalPerPerson = 0.00;
tipPercent[0].classList.add('selected');

// handle bill input
billsInput.addEventListener("input", () => {
  validationCheck();
  billValue = parseFloat(billsInput.value);
  calculate();
});
// handle tip selection
tipPercent.forEach((tip) => {
  tip.addEventListener('click', () => {
    customInput.value = '';
    tipPercent.forEach((tipBtn) => {
      tipBtn.classList.remove('selected');
    });
    tip.classList.add('selected');
    tipValue = parseFloat(tip.dataset.percentage / 100);
    calculate();
  });
});
// handle custom tip input
customInput.addEventListener("click", () => {
  removeTipSelection();
  customInput.addEventListener("input", () => {
    if(customInput.value === ''){
      tipsShow.innerHTML = `$0.00`;
      totalShow.innerHTML = `$0.00`;
      tipValue = 0;
    }
    tipValue = parseFloat(customInput.value / 100);
    calculate();
  });
});
// handle number of people input
peopleInput.addEventListener("input", () => {
  peopleValue = Number(peopleInput.value);
  calculate();
});

function calculate(){
  let totalTips = tipValue * billValue;
  let totalBill = billValue + totalTips;
  tipPerPerson = totalTips / peopleValue;
  totalPerPerson = totalBill / peopleValue;
  if(peopleValue < 1){
    tipsShow.innerHTML = `$0.00`;
    totalShow.innerHTML = `$0.00`;
  } else{
    tipsShow.innerHTML = `$${tipPerPerson.toFixed(2)}`;
    totalShow.innerHTML = `$${totalPerPerson.toFixed(2)}`;
  }
}
function validationCheck(){
  if(isNaN(billsInput.value)) return 
  else typeValidation.innerHTML = ``;
}
btn.addEventListener("click", reset);
function reset() {
  billsInput.value = '';
  customInput.value = "";
  peopleInput.value = 1;
  tipsShow.innerHTML = `$0.00`;
  totalShow.innerHTML = `$0.00`;
  removeTipSelection();
}

function removeTipSelection(){
  tipPercent.forEach((tip) => {
    tip.classList.remove('selected');
  });
}
