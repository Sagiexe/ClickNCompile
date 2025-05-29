//import { sendGameData } from "../network/peerManager";
//TODO: this fucking line ruins my code. fix this shit asap. then uncomment everything
var lines = 0;
var clickPower = 1;

const LPC_BASE_PRICE = 10;
var numberOfLPCOwned = 0;

const FRIEND_BASE_LPS = 1;
const FRIEND_BASE_PRICE = 50;
var numberOfFriends = 0;

function updateUI() {
    document.getElementById("counter").innerText = "lines: " + lines;
    
    document.getElementById("addLines").innerText = "+" + clickPower + " lines";
    
    let newLPCPrice = calculateBuildingPrice(LPC_BASE_PRICE, numberOfLPCOwned);
    document.getElementById("buyLpc").innerText = "Buy more lines per click (Cost: " + newLPCPrice + ")";

    let newFriendPrice = calculateBuildingPrice(FRIEND_BASE_PRICE, numberOfFriends);
    document.getElementById("buyFriend").innerText = "Add friend to project (+1 lpc) (Cost: " + newFriendPrice +  ")";

    document.getElementById("lps").innerText = "Lines Per Second: " + getLinesPerSecond();
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
}
function addFriend(){
    let purchasePrice = calculateBuildingPrice(FRIEND_BASE_PRICE, numberOfFriends);
    
    if(purchasePrice <= lines){
        lines -= purchasePrice;
        numberOfFriends++;
    }
}

function calculateBuildingPrice(basePrice, numberOfBuildingsOwned){
    return Math.ceil(basePrice * Math.pow(1.15, numberOfBuildingsOwned));
}
/*
export function handlePeerClick(count){
    peerClickCount += count;
}*/

function getLinesPerSecond() {
    return numberOfFriends * FRIEND_BASE_LPS;
}

setInterval(() => {
    lines += getLinesPerSecond();
    updateUI();
}, interval = 1000);
