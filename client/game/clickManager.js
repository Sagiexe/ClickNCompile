var lines = 0;
var clickPower = 1;

const LPC_BASE_PRICE = 10;
var numberOfLPCOwned = 0;

function addOne() {
    lines += clickPower;
    document.getElementById("counter").innerHTML = "lines: " + lines;
}
document.addEventListener('keyup', function(event) {
    addOne(); 
});

function addClickPower() {

    purchasePrice = calculateBuildingPrice(LPC_BASE_PRICE, numberOfLPCOwned);
    
    if(purchasePrice <= lines){
        clickPower++;
        document.getElementById('lpc').innerText = "lines per click: " + clickPower;
        lines -= purchasePrice;
        numberOfLPCOwned++;
    }

    document.getElementById("counter").textContent = "lines: " + lines;

    document.getElementById("addLines").textContent = "+" + clickPower + " lines";
    newPrice = calculateBuildingPrice(LPC_BASE_PRICE, numberOfLPCOwned);
    document.getElementById('buyLpc').textContent = "Buy more lines per click (Cost: " + newPrice + ")";
}

function calculateBuildingPrice(basePrice, numberOfBuildingsOwned){
    return Math.ceil(basePrice * Math.pow(1.15, numberOfBuildingsOwned));
}
