const btnCalculate = document.querySelector(".btn-calculate");
const stockName = document.getElementById("stock-name");
const stockDate = document.getElementById("stock-date");
const stockQuantity = document.getElementById("stock-quantity");
const lastTradedPrice = document.getElementById('current-price');



console.log(URL)


const clickHandler = () => {
    const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName.value}.BSE&outputsize=full&apikey=S6GRGMO2EDYWVE0J`;
    console.log(URL)
    let date = stockDate.value;
    fetch(URL).then(response => response.json()).then(data => {
        let timeSeries = data["Time Series (Daily)"][date]["4. close"];
        console.log(timeSeries  );
        totalCostPrice = timeSeries * stockQuantity.value;
        console.log(totalCostPrice);
        calculateProfitLoss(totalCostPrice);
    })
} 


const calculateProfitLoss = (totalPrice) => {
    let currentValue = lastTradedPrice.value * stockQuantity.value;
    console.log(currentValue +" current value");
    console.log(totalPrice +"  Total valuation")
    if(currentValue > totalPrice){
        profitHandler(currentValue - totalPrice);
    }
    else{
        lossHandler(totalPrice - currentValue);
    }
}

function profitHandler(profit){
    alert("Arre profit ho gaya");
}

function lossHandler(){
    alert("Doob gaya paisa");
}



btnCalculate.addEventListener('click', () => {
    clickHandler();
})
