const frankfurterUrl = 'api.frankfurter.app';
const getFrankfuterData = async (host) => {
    try{
        const rawData = await fetch(`https://${host}/currencies`);
        const currencies = await rawData.json();
        const currenciesKeys = Object.keys(currencies);
        const currencieValues = Object.values(currencies);
        console.log(currenciesKeys)
    }catch{
        console.log("Error")
    };
};
getFrankfuterData(frankfurterUrl);