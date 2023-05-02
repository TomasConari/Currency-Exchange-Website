document.addEventListener("DOMContentLoaded", async (event) => {

    const frankfurterUrl = "https://api.frankfurter.app";
    const getFrankfuterDataKeys = async (host) => {
        try{
            const rawData = await fetch(`${host}/currencies`);
            const currencies = await rawData.json();
            return Object.keys(currencies);
        }catch{
            console.log("Error getting keys");
        };
    };
    const getFrankfuterDataValues = async (host) =>{
        try{
            const rawData = await fetch(`${host}/currencies`);
            const currencies = await rawData.json();
            return Object.values(currencies);
        }catch{
            console.log("Error getting values");
        };
    };
    const keys = await getFrankfuterDataKeys(frankfurterUrl);
    const values = await getFrankfuterDataValues(frankfurterUrl);

    const firstCurrency = document.getElementById("firstCurrency");
    const secondCurrency = document.getElementById("secondCurrency");
    const fillDropdown = (valuesArray, keysArray, currentDropdown) => {
        for(let i = 0; i < keysArray.length; i += 1){
            const option = document.createElement("option");
            option.text = `${valuesArray[i]} (${keysArray[i]})`;
            option.value = keysArray[i];
            currentDropdown.appendChild(option);
        };
    };
    fillDropdown(values, keys, firstCurrency);
    fillDropdown(values, keys, secondCurrency);

    const text = document.getElementById("text");
    const convertButton = document.getElementById("convertButton");
    convertButton.addEventListener("click", async () => {
        try{
            const firstToCompare = firstCurrency.value;
            const secondToCompare = secondCurrency.value;
            const numberOfComparation = document.getElementById("moneyNumber").value;
            const allConversionInfoRaw = await fetch(`${frankfurterUrl}/latest?amount=${numberOfComparation}&from=${firstToCompare}&to=${secondToCompare}`);
            const allConversionInfo = await allConversionInfoRaw.json();
            const filteredCurrencyAndNumber = allConversionInfo.rates;
            const updateDate = allConversionInfo.date;
            const convertedNumber = filteredCurrencyAndNumber[secondToCompare];
            text.textContent = `To date ${updateDate}, ${numberOfComparation} ${firstToCompare} is ${convertedNumber} ${secondToCompare}`;
        }catch{
            text.textContent = "There was an error, try again later";
        };
    });

    const compareButton = document.getElementById("compareButton");
    compareButton.addEventListener("click", async () =>{
        try{
            const compareFrom = firstCurrency.value;
            const compareTo = secondCurrency.value;
            const rawData = await fetch(`${frankfurterUrl}/latest?from=${compareFrom}`);
            const ratesData = await rawData.json();
            const valueInfoWithAll = ratesData.rates;
            const updateDate = ratesData.date;
            const especifiedRate = valueInfoWithAll[compareTo];
            text.textContent = `To date ${updateDate}, 1 ${compareFrom} is ${especifiedRate} ${compareTo}`;
        }catch{
            text.textContent = "There was an error, try again later";
        };
    });
});