//import { sendGameData } from "../network/peerManager";
//TODO: this fucking line ruins my code. fix this shit asap. then uncomment everything
var lines = 0;
var clickPower = 1;

const LPC_BASE_PRICE = 10;
var numberOfLPCOwned = 0;

function updateUI() {
    document.getElementById("counter").innerText = "lines: " + lines;
    
    document.getElementById("addLines").innerText = "+" + clickPower + " lines";
    
    let newPrice = calculateBuildingPrice(LPC_BASE_PRICE, numberOfLPCOwned);
    document.getElementById("buyLpc").innerText = "Buy more lines per click (Cost: " + newPrice + ")";
}

function addOne() {
    lines += clickPower;
    updateUI();


/*    sendGameData({
    lines: lines,
        clickPower: clickPower,
        numberOfLPCOwned: numberOfLPCOwned
    });
    sendGameData({
        type:'click',
        count: clickPower
    });*/
}
document.addEventListener('keyup', function(event) {
    addOne(); 
});

function addClickPower() {

    purchasePrice = calculateBuildingPrice(LPC_BASE_PRICE, numberOfLPCOwned);
    
    if(purchasePrice <= lines){
        clickPower++;
        lines -= purchasePrice;
        numberOfLPCOwned++;
    }
    updateUI();
}

function calculateBuildingPrice(basePrice, numberOfBuildingsOwned){
    return Math.ceil(basePrice * Math.pow(1.15, numberOfBuildingsOwned));
}
/*
export function handlePeerClick(count){
    peerClickCount += count;
}*/

window.addOne = addOne;
window.addClickPower = addClickPower;