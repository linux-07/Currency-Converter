const API = "bd1df83f4fbc44c28c9f17ad9b4e9fe9";

document.addEventListener('DOMContentLoaded', () => {
    fetch(`https://openexchangerates.org/api/latest.json?app_id=${API}`)
        .then(response => {
            if (!response.ok) {
                console.error("Network response was not good, error using API");
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetching successful, API response is good")
            responseData = data;
            fetchCurrencies();
        });
});

const fetchCurrencies = async () => {
    const rates = responseData.rates;
    let currenciesDropdown = document.querySelector("main select");
    for (const currency in rates) {
        if (rates.hasOwnProperty(currency)) {
            currenciesDropdown.innerHTML+=`<option value="${currency}">${currency}</option>`
        }
    }
};

document.getElementById('convertBtn').addEventListener('click', () => {
    const selectedCurrency = document.querySelector("select").value;
    if (selectedCurrency === 'select') {
        alert('Please select a currency first.');
        return;
    }
    
    const exchangeRate = responseData.rates[selectedCurrency];
    const conversionResult = document.getElementById('conversionResult');
    conversionResult.textContent = `1 USD = ${exchangeRate} ${selectedCurrency}`;
});
