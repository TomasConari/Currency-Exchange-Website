document.addEventListener("DOMContentLoaded", async (event) => {
    const frankfurterUrl = 'api.frankfurter.app';
    const getFrankfuterData = async (host) => {
        try{
            const rawData = await fetch(`https://${host}/currencies`);
            const currencies = await rawData.json();
            return Object.keys(currencies);
        }catch{
            console.log("Error");
        };
    };
    const keys = await getFrankfuterData(frankfurterUrl);
    const firstCurrency = document.getElementById("firstCurrency");
    const secondCurrency = document.getElementById("secondCurrency");
    for(let i = 0; i < keys.length; i += 1){
        const option = document.createElement("option");
        option.text = keys[i];
        option.value = keys[i];
        firstCurrency.appendChild(option);
    };
    for(let i = 0; i < keys.length; i += 1){
        const option = document.createElement("option");
        option.text = keys[i];
        option.value = keys[i];
        secondCurrency.appendChild(option);
    };
    const convertButton = document.getElementById("convertButton");
    convertButton.addEventListener("click", async () => {
        try{
            const firstToCompare = firstCurrency.value;
            const secondToCompare = secondCurrency.value;
            const numberOfComparation = document.getElementById("moneyNumber").value;
            const allConversionInfoRaw = await fetch(`https://${frankfurterUrl}/latest?amount=${numberOfComparation}&from=${firstToCompare}&to=${secondToCompare}`);
            const allConversionInfo = await allConversionInfoRaw.json();
            const filteredCurrencyAndNumber = await allConversionInfo.rates;
            const convertedNumber = await filteredCurrencyAndNumber[secondToCompare];
            const text = document.getElementById("text");
            text.textContent = `${numberOfComparation} ${firstToCompare} is ${convertedNumber} ${secondToCompare}`;
        }catch{
            text.textContent = "There was an error, try again later";
        };
    });
});