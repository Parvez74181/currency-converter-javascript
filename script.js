const fromSelectBox = document.querySelector("#from-country");
const toSelectBox = document.querySelector("#to-country");
const fromBox = document.querySelector(".from-box");
const toBox = document.querySelector(".to-box");
const btn = document.querySelector(".btn-box button");

const amountBox = document.querySelector(".from-box input");
const resultBox = document.querySelector(".to-box input");

let fromValue;
let toValue;

const getCountryName = async () => {
  let res = await axios.get("./countries.json");

  let data = res.data.countries.country;
  data.forEach((data) => {
    fromSelectBox.innerHTML += `<option value="${data.currencyCode}">${data.currencyCode} - ${data.countryName}</option>`;
    toSelectBox.innerHTML += `<option value="${data.currencyCode}">${data.currencyCode} - ${data.countryName}</option>`;
  });
};
getCountryName();

fromSelectBox.addEventListener("change", (e) => {
  fromValue = e.target.value;
  fromBox.querySelector("input").placeholder = fromValue;
});

toSelectBox.addEventListener("change", (e) => {
  toValue = e.target.value;
  toBox.querySelector("input").placeholder = toValue;
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("apikey", "hAPQBwcJ8BdR1hzOydYzvcYnl1CDXnWL");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(
    `https://api.apilayer.com/currency_data/convert?to=${toValue}&from=${fromValue}&amount=${amountBox.value}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((data) => {
      resultBox.value = data.result;
    })
    .catch((error) => console.log("error", error));
});
