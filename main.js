const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const amountInput = document.getElementById('amount');
const swapButton = document.getElementById('swap');
const resultText = document.getElementById('result-text');
const lastUpdatedText = document.getElementById('last-updated');
const darkModeToggle = document.getElementById('dark-mode-toggle');

const currencies = ['USD', 'EUR', 'KRW', 'JPY', 'CNY', 'GBP'];

async function populateCurrencies() {
    try {
        const response = await fetch('https://api.frankfurter.app/currencies');
        const data = await response.json();

        Object.entries(data).forEach(([code, name]) => {
            const option1 = document.createElement('option');
            option1.value = code;
            option1.textContent = `${code} (${name})`;
            fromSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = code;
            option2.textContent = `${code} (${name})`;
            toSelect.appendChild(option2);
        });

        fromSelect.value = 'USD';
        toSelect.value = 'KRW';

        await convert();
    } catch (error) {
        console.error("Failed to populate currencies:", error);
        resultText.textContent = "Failed to load currency data.";
    }
}

async function convert() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = parseFloat(amountInput.value) || 1;

    resultText.textContent = 'Converting...';

    if (from === to) {
        resultText.textContent = `${amount.toLocaleString()} ${from} = ${amount.toLocaleString()} ${to}`;
        return;
    }

    try {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        const rate = data.rates[to];
        resultText.textContent = `${amount.toLocaleString()} ${from} = ${rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${to}`;
        lastUpdatedText.textContent = `Last Updated: ${data.date}`;
    } catch (error) {
        console.error("Conversion failed:", error);
        resultText.textContent = "Error in conversion.";
    }
}

function swapCurrencies() {
    const fromValue = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = fromValue;
    convert();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    updateDarkModeButton();
}

function updateDarkModeButton() {
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Light Mode';
    } else {
        darkModeToggle.textContent = 'Dark Mode';
    }
}

amountInput.addEventListener('input', convert);
fromSelect.addEventListener('change', convert);
toSelect.addEventListener('change', convert);
swapButton.addEventListener('click', swapCurrencies);
darkModeToggle.addEventListener('click', toggleDarkMode);

document.addEventListener('DOMContentLoaded', () => {
    populateCurrencies();
    updateDarkModeButton();
});
