// script.js
const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convert");

// Populate currency dropdowns
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
    })
    .catch(error => {
        result.textContent = "Failed to load currencies.";
        console.error(error);
    });

// Perform currency conversion
convertBtn.addEventListener("click", () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = parseFloat(amount.value);

    if (isNaN(amountValue) || amountValue <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    fetch(`${apiUrl}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to] / data.rates[from];
            const convertedAmount = (amountValue * rate).toFixed(2);
            result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
        })
        .catch(error => {
            result.textContent = "Conversion failed. Try again.";
            console.error(error);
        });
});
