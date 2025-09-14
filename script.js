const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convert-btn");

// Currency → Country theme colors
const currencyColors = {
  INR: ["#FF9933", "#FFFFFF", "#138808"], // India (tricolor)
  USD: ["#3C3B6E", "#B22234"],           // USA (blue + red)
  EUR: ["#003399", "#FFD700"],           // EU (blue + yellow)
  GBP: ["#00247D", "#CF142B"],           // UK (blue + red)
  JPY: ["#FFFFFF", "#BC002D"],           // Japan (white + red)
  CNY: ["#FF0000", "#FFD700"],           // China (red + yellow)
  AUD: ["#00008B", "#FFCC00"],           // Australia
  CAD: ["#FF0000", "#FFFFFF"],           // Canada
  ZAR: ["#007749", "#FFD100"],           // South Africa
};

// Currency names
const currencyNames = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound Sterling",
  INR: "Indian Rupee",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  NZD: "New Zealand Dollar",
  ZAR: "South African Rand"
};

// Free exchange rate API
const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

// Load currencies into dropdowns
async function loadCurrencies() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  const currencies = Object.keys(data.rates);

  currencies.forEach(cur => {
    const option1 = document.createElement("option");
    option1.value = cur;
    option1.textContent = currencyNames[cur]
      ? `${currencyNames[cur]} (${cur})`
      : cur;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = cur;
    option2.textContent = currencyNames[cur]
      ? `${currencyNames[cur]} (${cur})`
      : cur;
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
  updateBackground("USD"); // default background
}

// Update background color based on selected currency
function updateBackground(currency) {
  const colors = currencyColors[currency];
  if (colors) {
    document.body.style.background = `linear-gradient(135deg, ${colors.join(", ")})`;
  } else {
    document.body.style.background = "linear-gradient(135deg, #222, #555)";
  }
}

// Convert function
async function convertCurrency() {
  const res = await fetch(apiUrl);
  const data = await res.json();

  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = amount.value;

  const rate = data.rates[to] / data.rates[from];
  const converted = (amt * rate).toFixed(2);

  const fromName = currencyNames[from] ? `${currencyNames[from]} (${from})` : from;
  const toName = currencyNames[to] ? `${currencyNames[to]} (${to})` : to;

  result.textContent = `${amt} ${fromName} = ${converted} ${toName}`;
}

// Event listeners
convertBtn.addEventListener("click", convertCurrency);
fromCurrency.addEventListener("change", () => updateBackground(fromCurrency.value));

// Initialize
loadCurrencies();
