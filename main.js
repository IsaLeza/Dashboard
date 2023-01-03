let apiConatiner = document.querySelector ('#apiContainer')
let searchTickers = document.querySelector ('#search')
let tickerSymbol = document.querySelector ('#symbol')
let timeSeries = [];
let openPrice = [];
let highPrice = [];
let lowPrice = [];
let closePrice = [];
let volume = [];


async function getAPI() {
    const tickers = searchTickers.value;
    const url = 'https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol='+tickers+'&datatype=json&output_size=compact'
    const options = {
       method: 'GET',
        headers: {
           'X-RapidAPI-Key': '1f81ae5df0msh9faa94239f0d099p13aa46jsn44cb9f50583f',
           'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
       }
   };
    
   
    const response = await fetch(url, options);
    const data =  await response.json();
   // console.log(data)
    
    for (var key in data ['Time Series (5min)']){
        timeSeries.push(key);
        openPrice.push(data['Time Series (5min)'][key]['1. open']);  
        highPrice.push(data['Time Series (5min)'][key]['2. high']);  
        lowPrice.push(data['Time Series (5min)'][key]['3. low']);  
        closePrice.push(data['Time Series (5min)'][key]['4. close']); 
       // volume.push(data['Time Series (5min)'][key]['5. volume']);  
             
     console.log(closePrice);
 
        
    
        
    
    } 



// CHART

var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx,{
    type: 'line',
    data: {
        labels: timeSeries,
        datasets: [{
            label: 'OPEN',
            backgroudColor: 'blue',
            borderColor: 'blue',
            data: openPrice
        },
        {
            label: 'HIGH',
            backgroudColor: 'green',
            borderColor: 'green',
            data: highPrice,
        },
        {
            label: 'LOW',
            backgroudColor: 'red',
            borderColor: 'red',
            data: lowPrice,
        },
        {
            label: 'CLOSE',
            backgroudColor: 'yellow',
            borderColor: 'yellow',
            data: closePrice,
        },
        {
            label: 'VOLUME',
            backgroudColor: 'orange',
            borderColor: 'orange',
            data: volume,
        },
    
    
    
    ]
        },
    options: {
        tooltips:{
            mode: 'index'
        }
    }    
})
    
   
//END OF CURRENTLY STOCK TICKERS PRICE WITH FETCH

//Getting ETH live price in Euros using web sockets

let ws = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');
let stockPriceElement = document.getElementById('stock-price');
let lastPrice = null;

ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let price = parseFloat(stockObject.p).toFixed(2);
    stockPriceElement.innerText = price;

stockPriceElement.style.color = !lastPrice || lastPrice === price ? 'white' : price > lastPrice ? 'green' : 'red';

    lastPrice = price;
}
    //=====================================================================

// Watch

var span = document.getElementById('span');

function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  span.textContent = 
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
}

setInterval(time, 1000);

//END OF WATCH ==============================================================
//======================Chart=========================================


//SHOW OR HIDE SIDEBAR ========================================================================
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('aside');

menuBtn.addEventListener('click', () => {
    sidebar.style.display = 'block';
})

closeBtn.addEventListener('click', () =>{
    sidebar.style.display = 'none';
} )

// Change Theme
const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    themeBtn.querySelector('span:first-child').classList.toggle('active');
    
    themeBtn.querySelector('span:last-child').classList.toggle('active');
})
}
