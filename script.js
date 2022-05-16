let leftButtons = document.querySelectorAll(".left-btn");
let leftInput = document.querySelector(".left-input");
let leftCurrency = document.querySelector(".left-currency");

let rightButtons = document.querySelectorAll(".right-btn");
let rightInput = document.querySelector(".right-input");
let rightCurrency = document.querySelector(".right-currency");

let leftActiveButton = "RUB";
let rightActiveButton = "USD";

let activeInput;

leftButtons.forEach(element => {
    element.addEventListener("click" , () => {
        
        leftButtons.forEach(btn => {
            btn.classList.remove('active');
        })

        element.classList.add('active');

        leftActiveButton = element.innerText;

        rightButtons.forEach(rbtn => {
            if (rbtn.classList.contains('active')){
                rightActiveButton = rbtn.innerText; 
            }
        })
        if (activeInput == "left"){
            leftInputExchange();
        }
        else{
            rightInputExchange();
        }
    })
    leftInputExchange();
})

rightButtons.forEach(element => {
    element.addEventListener("click" , () => {
        rightButtons.forEach(btn => {
            btn.classList.remove('active');
        }); 

        element.classList.add('active');

        rightActiveButton = element.innerText;

        leftButtons.forEach(lbtn => {
            if (lbtn.classList.contains('active')){
                leftActiveButton = lbtn.innerText; 
            }
        })
        if (activeInput == "left"){
            leftInputExchange();
        }
        else{
            rightInputExchange();
        }
    })
    rightInputExchange();
})

leftInput.addEventListener("input", leftInputExchange);

function leftInputExchange () {
    activeInput = "left";
    fetch(`https://api.exchangerate.host/latest?base=${leftActiveButton}&symbols=${rightActiveButton}`)
        .then(response => response.json())
        .then(data => {
            if (leftInput.value !== ""){
                rightInput.value = (Number(leftInput.value) * data.rates[`${rightActiveButton}`]).toFixed(3);
            }
            else{
                rightInput.value = "";
            }
            leftCurrency.innerText = `1 ${leftActiveButton} = ${(data.rates[`${rightActiveButton}`]).toFixed(3)} ${rightActiveButton}`
            rightCurrency.innerText = `1 ${rightActiveButton} = ${(1 / data.rates[`${rightActiveButton}`]).toFixed(3)} ${leftActiveButton}`
        })
}

rightInput.addEventListener("input", rightInputExchange);

function rightInputExchange () {
    activeInput = "right"
    fetch(`https://api.exchangerate.host/latest?base=${rightActiveButton}&symbols=${leftActiveButton}`)
        .then(response => response.json())
        .then(data => {
            if (rightInput.value !== ""){
                leftInput.value = (Number(rightInput.value) * data.rates[`${leftActiveButton}`]).toFixed(3);
            }
            else{
                leftInput.value = "";
            }
            rightCurrency.innerText = `1 ${rightActiveButton} = ${(data.rates[`${leftActiveButton}`]).toFixed(3)} ${leftActiveButton}`
            leftCurrency.innerText = `1 ${leftActiveButton} = ${(1 / data.rates[`${leftActiveButton}`]).toFixed(3)} ${rightActiveButton}`
        })
}