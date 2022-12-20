let searchTickers = document.querySelector ('#search')
let tickerSymbol = document.querySelector ('#symbol')

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
    console.log(data);
    //console.log(JSON.stringify(data));
};

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

const chart = document.querySelector("#chart").getContext('2d');

// create a new chart instance
new Chart(chart,{
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',],

        datasets: [
            {
                label: 'USD/MXN',
                data: [19.32, 20.22, 20.05, 20.77, 21.12, 20.44, 19.99, 19.78,19.34,19.74, 19.24],
                borderColor: 'red',
                borderWidth: 2
            },
            {
                label: 'EUR/MXN',
                data: [23.41, 23.18, 23.09, 23.29, 21.80, 21.36, 21.01, 20.72, 20.63, 19.96, 19.51],
                borderColor: 'purple',
                borderWidth: 2
            },
        ]
    },
    options: {
        responsive: true
    }
})

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

