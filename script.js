const btnCalculate = document.querySelector(".btn-calculate");
const stockName = document.getElementById("stock-name");
const stockDate = document.getElementById("stock-date");
const stockQuantity = document.getElementById("stock-quantity");
const lastTradedPrice = document.getElementById('current-price');
const remarkAbsoluteValue = document.querySelector(".span-remark-1");
const remarkPercentageValue = document.querySelector(".span-remark-2");

const companySymbols = {
     "TCS" : "TCS",
     "Kotak Mahindra Bank" : "KOTAKBANK",
     "Tata Consumer Products Ltd" : "TATACONSUM",
     "ITC" : "ITC",
     "Nestle India Limited" : "NESTLEIND"
}

const clickHandler = () => {
    let stock = checkSymbolExists();
    const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}.BSE&outputsize=full&apikey=S6GRGMO2EDYWVE0J`;
    console.log(URL)
    let date = stockDate.value;
    fetch(URL).then(response => response.json()).then(data => {
        console.log(data["Time Series (Daily)"])
        let timeSeries = data["Time Series (Daily)"][date]["4. close"];
        console.log(timeSeries  );
        totalCostPrice = timeSeries * stockQuantity.value;
        console.log(totalCostPrice);
        calculateProfitLoss(totalCostPrice,timeSeries);
    })
} 


function checkSymbolExists(){
    let stock = "";
    if(stockName.value in companySymbols){
        stock = companySymbols[stockName.value];
    }
    else{
        stock = stockName.value;
    }
    return stock;
}


const calculateProfitLoss = (totalPrice,costPrice) => {
    let currentValue = lastTradedPrice.value * stockQuantity.value;
    console.log(currentValue +" current value");
    console.log(totalPrice +"  Total valuation")
    if(currentValue > totalPrice){
        profitHandler(currentValue - totalPrice,costPrice);
    }
    else{
        lossHandler(totalPrice - currentValue,costPrice);
    }
}

function profitHandler(profit,costPrice){
    profit = Math.trunc(profit*100)/100;
    profitPercent = Math.trunc(((profit/costPrice)*100)*100)/100;
    remarkAbsoluteValue.textContent = `Yay ! You made a profit of ${profit} ₹`;
    remarkPercentageValue.textContent = `You booked a profit of ${profitPercent}%. Are you Harshad Mehta of 2021 ? 🤨`
    document.body.style.backgroundColor = "#9EDE73";
}

function lossHandler(loss,costPrice){
    loss = Math.trunc(Math.abs(loss)*100)/100;
    lossPercent = Math.trunc(((loss/costPrice)*100)*100)/100;
    remarkAbsoluteValue.textContent = `Oh oo ! You suffered a loss of ${loss} ₹`;
    remarkPercentageValue.textContent = `You lost almost ${lossPercent}%. 🤕`
    document.body.style.backgroundColor = "#F05945";
}



btnCalculate.addEventListener('click', () => {
    clickHandler();
})
